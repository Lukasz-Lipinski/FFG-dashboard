import { CheckIfUserExistsById } from "~~/server/services/auth.service";
import { GigDto } from "~~/server/dtos/content/gigs/GigDto";
import { ArtistEntity } from "~~/server/entity/content/artist/ArtistEntity";
import { serverSupabaseClient } from "#supabase/server";
import { createError } from "h3";
import { UserDto } from "~~/server/dtos/users/UserDto";
import { GigEntity } from "~~/server/entity/content/gig/GigEntity";

export default defineEventHandler(async (event) => {
  const { band } = getRouterParams(event);
  const supabase = await serverSupabaseClient(event);
  const storedUser = getCookie(event, "user");
  const user = storedUser ? (JSON.parse(storedUser) as UserDto) : null;

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Not Authorized",
    });
  }

  const userExists = await CheckIfUserExistsById(event, user.Id);
  if (!userExists) {
    throw createError({
      statusCode: 401,
      message: "Not Authorized",
    });
  }
  const { data: gigsData, error } = await supabase
    .from("Gigs")
    .select("*")
    .eq("Owner", band);

  if (error) {
    throw createError({
      statusCode: 500,
      message: "Content was not fetched",
    });
  }

  const gigs: GigDto[] = [];
  const gigsDataTyped = gigsData as GigEntity[];

  for (const gigData of gigsDataTyped) {
    const { data: artistsData } = await supabase.from("Artists").select("*");

    let who: string[] = [];

    if (artistsData?.length) {
      who = (artistsData as ArtistEntity[])
        .filter((a) => a.GigId == gigData.Id)
        .map((a) => a.Name);
    }

    const gigDto = new GigDto(
      gigData.Id,
      gigData.City,
      gigData.Club,
      gigData.Address,
      gigData.Country,
      who,
      new Date(gigData.When),
      gigData.Link,
      gigData.Start,
      gigData.TicketsLink
    );

    gigs.push(gigDto);
  }

  return gigs ?? [];
});

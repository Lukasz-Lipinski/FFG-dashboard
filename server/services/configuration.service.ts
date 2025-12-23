import { ConfigurationEntity } from "../entity/configuration/ConfiguarationEntity";
import { H3Event } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import { ConfigurationDto } from "../dtos/configuration/ConfigurationDto";
import { CreateConfigurationDto } from "../dtos/configuration/CreateConfigurationDto";

export async function FindConfigurationForBand(
  event: H3Event,
  band: string
): Promise<ConfigurationDto | null> {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client
    .from("Configuration")
    .select("*")
    .eq("Band", band)
    .single<ConfigurationEntity>();

  if (data) {
    return new ConfigurationDto(data.Band, data.Link, data.id);
  }

  return null;
}

export async function SetURL(
  event: H3Event,
  band: string,
  link: string,
  userId: number
): Promise<void> {
  try {
    console.log("band", band);
    console.log("link", link);
    console.log("userId", userId);
    const client = await serverSupabaseClient(event);

    const configuration = await FindConfigurationForBand(event, band);
    console.log("found config", configuration);

    let response;
    if (configuration === null) {
      const newConfiguration = new CreateConfigurationDto(link, band, userId);

      response = await client
        .from("Configuration")
        .insert([newConfiguration] as never);
    } else {
      response = await client
        .from("Configuration")
        .update({ Link: link } as never);
    }

    const { error } = response;

    if (error) {
      throw createError({
        message: "Saving URL failed",
        status: 500,
      });
    }
  } catch (error) {
    throw createError({
      message: "Saving URL failed",
      status: 500,
    });
  }
}

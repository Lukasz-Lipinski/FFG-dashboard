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
    const client = await serverSupabaseClient(event);

    const configuration = await FindConfigurationForBand(event, band);

    let response;
    if (configuration === null) {
      const newConfiguration = new CreateConfigurationDto(link, band, userId);

      response = await client
        .from("Configuration")
        .insert([newConfiguration] as never);
    } else {
      response = await client
        .from("Configuration")
        .update({ Link: link } as never)
        .eq("Band", band);
    }
  } catch (error) {
    throw createError({
      message: "Saving URL failed",
      status: 500,
    });
  }
}

export async function FetchSiteConfiguration(
  event: H3Event,
  band: string
): Promise<ConfigurationDto | null> {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client
    .from("Configuration")
    .select("*")
    .eq("Band", band)
    .single<ConfigurationEntity>();

  if (!data || error) {
    throw createError({
      message: "Configuration not found for this site",
      statusCode: 404,
    });
  }

  return new ConfigurationDto(data.Band, data.Link, data.id);
}

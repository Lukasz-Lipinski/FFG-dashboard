export default defineEventHandler(async (event) => {
  const { band } = getRouterParams(event);
  const body = await readBody(event);

  // Placeholder: Partially update gigs information for the band
  return {
    band,
    action: "patched gigs",
    data: body,
  };
});

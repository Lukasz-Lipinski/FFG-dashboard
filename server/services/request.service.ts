export async function parseBody<T>(event: any) {
  const body = await readBody(event);
  return JSON.parse(body) as T;
}

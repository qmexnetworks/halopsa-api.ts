export async function paginate<Type>(
  params: URLSearchParams,
  url: string,
  targetField: string,
  headers: HeadersInit,
): Promise<Array<Type>> {
  const objects: Array<Type> = [];

  for (let pageNumber = 1; pageNumber < 5000000; pageNumber++) {
    params.set("page_no", pageNumber.toString());

    const response = await fetch(url + "?" + params.toString(), {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errResp = await response.json();
      const { ClassName, Message } = errResp;
      throw new Error(
        `Failed to fetch assets: ${response.statusText} (${ClassName}: ${Message})`,
      );
    }

    const parsedResponse = await response.json();
    objects.push(...parsedResponse[targetField]);

    if (parsedResponse.record_count === 0) {
      break; // Done
    }
  }

  return objects;
}

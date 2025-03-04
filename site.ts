export type SiteId = number;

export interface Site {
  id: SiteId;

  name: string;

  client_id: number;
  client_name: string;

  inactive: boolean;
}

export async function findSites(
  url: string,
  token: string,
  client_id: number,
  search: string,
): Promise<Array<Site>> {
  const params = new URLSearchParams({
    pageinate: "false",
    client_id: client_id.toString(),
    search,
  });

  const response = await fetch(`${url}/api/site?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Invalid response from HaloPSA: ${response.statusText}`);
  }

  const parsedResponse = await response.json();
  return parsedResponse.sites;
}

export async function fetchSites(
  url: string,
  token: string,
  client_id: number,
): Promise<Array<Site>> {
  const params = new URLSearchParams({
    pageinate: "false",
    client_id: client_id.toString(),
  });

  const response = await fetch(`${url}/api/site?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Invalid response from HaloPSA: ${response.statusText}`);
  }

  const parsedResponse = await response.json();
  return parsedResponse.sites;
}

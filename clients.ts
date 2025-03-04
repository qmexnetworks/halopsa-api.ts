export interface Client {
  id: number;
  accountsid: string;
  name: string;
}

export async function fetchClients(
  url: string,
  token: string,
): Promise<Map<string, Client>> {
  const clients = new Map<string, Client>();
  let pageNumber = 1;

  while (true) {
    const params = new URLSearchParams({
      pageinate: "true",
      page_size: "500",
      page_no: pageNumber.toString(),
    });

    const response = await fetch(
      `${url}/api/client?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Invalid response from HaloPSA: ${response.statusText}`);
    }

    const parsedResponse = await response.json();

    if (parsedResponse.clients.length === 0) {
      break;
    }

    for (const client of parsedResponse.clients) {
      if (client.accountsid) {
        clients.set(client.accountsid, client);
      }
    }

    pageNumber += 1;
  }

  return clients;
}

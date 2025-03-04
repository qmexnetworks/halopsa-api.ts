import type { Field } from "./custom_fields.ts";

export type AssetId = number;

export interface Asset {
  id: AssetId;
  inventory_number: string;
  fields: Field[];
}

export async function fetchAssets(
  url: string,
  token: string,
  clientId: number,
): Promise<Asset[]> {
  const params = new URLSearchParams({
    pageinate: "false",
    page_size: "500",
    includecolumns: "true",
    columns_id: "8",
    client_id: clientId.toString(),
  });

  const response = await fetch(`${url}/api/asset?${params.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Invalid response from HaloPSA: ${response.statusText}`);
  }

  const parsedResponse = await response.json();
  return parsedResponse.assets;
}

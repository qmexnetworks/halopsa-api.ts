import type { Field } from "./custom_fields.ts";

export type AssetId = number;

export interface Asset {
  id: AssetId;
  inventory_number: string;
  fields: Field[];

  client_id: number;
  client_name: string;

  site_id: number;
  site_name: string;

  assettype_id: number;
  assettype_name: string;

  status_id: number;

  inactive: boolean;
}

/**
 * Fetches the assets for a client from HaloPSA, taking care of pagination.
 */
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

/**
 * Creates an asset in HaloPSA.
 */
export async function createAsset(
  url: string,
  token: string,
  asset: Omit<Asset, "id">,
): Promise<Asset> {
  const response = await fetch(`${url}/api/asset`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([asset]),
  });

  if (!response.ok) {
    throw new Error(`Failed to create asset: ${response.statusText}`);
  }

  const createdAsset = await response.json();
  return createdAsset;
}

/**
 * Updates an existing asset in HaloPSA. Non-existing fields are not modified.
 */
export async function updateAsset(
  url: string,
  token: string,
  asset: Asset,
): Promise<Asset> {
  const response = await fetch(`${url}/api/Asset`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([asset]),
  });

  if (!response.ok) {
    throw new Error(`Failed to update asset: ${response.statusText}`);
  }

  const updatedAsset = await response.json();
  return updatedAsset;
}

/**
 * Deletes an asset in HaloPSA.
 */
export async function deleteAsset(
  url: string,
  token: string,
  assetId: number,
): Promise<void> {
  const response = await fetch(`${url}/api/Asset/${assetId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete asset: ${response.statusText}`);
  }
}

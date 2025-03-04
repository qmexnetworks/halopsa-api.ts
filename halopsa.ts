import { type Client, fetchClients } from "./clients.ts";
import {
  type Asset,
  createAsset,
  deleteAsset,
  fetchAssets,
  updateAsset,
} from "./assets.ts";

export class HaloPSA {
  /**
   * The full URL of the HaloPSA instance without a path.
   */
  private url: string;

  /**
   * The API token to authenticate with the HaloPSA API.
   */
  private token: string;

  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
  }

  clients(): Promise<Map<string, Client>> {
    return fetchClients(this.url, this.token);
  }

  assets(clientId: number): Promise<Asset[]> {
    return fetchAssets(this.url, this.token, clientId);
  }

  createAsset(asset: Omit<Asset, "id">): Promise<Asset> {
    return createAsset(this.url, this.token, asset);
  }

  updateAsset(asset: Asset): Promise<Asset> {
    return updateAsset(this.url, this.token, asset);
  }

  deleteAsset(assetId: number): Promise<void> {
    return deleteAsset(this.url, this.token, assetId);
  }
}

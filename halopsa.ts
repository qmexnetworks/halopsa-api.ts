import { type Client, fetchClients } from "./clients.ts";
import {
  type Asset,
  createAsset,
  deleteAsset,
  fetchAssets,
  updateAsset,
} from "./assets.ts";
import { fetchSites, findSites, type Site } from "./site.ts";

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

  assets(clientId?: number, columnsId: number = 8): Promise<Asset[]> {
    return fetchAssets(this.url, this.token, clientId, columnsId);
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

  sites(clientId: number): Promise<Array<Site>> {
    return fetchSites(this.url, this.token, clientId);
  }

  findSites(clientId: number, search: string): Promise<Array<Site>> {
    return findSites(this.url, this.token, clientId, search);
  }
}

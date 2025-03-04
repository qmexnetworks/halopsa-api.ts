import { type Client, fetchClients } from "./clients.ts";
import { type Asset, fetchAssets } from "./assets.ts";

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
}

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
}

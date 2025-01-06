import { ENDPOINTS, nepseApi } from "../consts/api";
import { IMarketOpen } from "../interfaces";

export class Market {
  private readonly _axios = nepseApi;

  public async getMarketOpen(): Promise<IMarketOpen> {
    const resp = await this._axios
      .get<IMarketOpen>(ENDPOINTS.MARKET_OPEN)
      .then((res) => res.data);

    return resp;
  }
}

import { ENDPOINTS, nepseApi } from "../consts/api";
import { tokenStore } from "../consts/store/store";
import { IMarketOpen, ITodaysPrice, PageSize } from "../interfaces/api";

export class NepseData {
  private readonly _axios = nepseApi;

  public async getMarketOpen(): Promise<IMarketOpen> {
    const resp = await this._axios
      .get<IMarketOpen>(ENDPOINTS.api.nots.nepseData.getMarketOpen)
      .then((res) => res.data);

    return resp;
  }

  private async _getTodayPrice(
    size: number,
    page: number,
    securityId?: number,
  ): Promise<ITodaysPrice> {
    const magicNumber = tokenStore.get("magicNumber");
    const idx = magicNumber % 10 < 5 ? 1 : 3;

    const id =
      magicNumber +
      tokenStore.get("initialMagicNumbers")[idx] * tokenStore.get("serverDay") -
      tokenStore.get("initialMagicNumbers")[idx - 1];

    const urlParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(securityId ? { securityId: securityId.toString() } : {}),
    });

    const response = await this._axios.post<ITodaysPrice>(
      `${ENDPOINTS.api.nots.nepseData.getTodayPrice}?${urlParams.toString()}`,
      { id },
    );

    return response.data;
  }

  public async getTodayPrice(
    page = 0,
    pageSize: PageSize = 20,
    securityId?: number,
  ): Promise<ITodaysPrice> {
    const response = await this._getTodayPrice(pageSize, page, securityId);

    return response;
  }
}

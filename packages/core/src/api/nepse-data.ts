import { ENDPOINTS, nepseApi } from "../consts/api";
import { tokenStore } from "../consts/store/store";
import { IMarketOpen, ITodaysPrice } from "../interfaces/api";

export class NepseData {
  private readonly _axios = nepseApi;

  public async getMarketOpen(): Promise<IMarketOpen> {
    const resp = await this._axios
      .get<IMarketOpen>(ENDPOINTS.api.nots.nepseData.getMarketOpen)
      .then((res) => res.data);

    return resp;
  }

  private async _getTodayPrice(
    id: number,
    size: number,
    page: number,
  ): Promise<ITodaysPrice> {
    const urlParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const response = await this._axios.post<ITodaysPrice>(
      `${ENDPOINTS.api.nots.nepseData.getTodayPrice}?${urlParams.toString()}`,
      { id },
    );

    return response.data;
  }

  public async getTodayPrice(): Promise<ITodaysPrice["content"]> {
    const magicNumber = tokenStore.get("magicNumber");
    const idx = magicNumber % 10 < 5 ? 1 : 3;

    const id =
      magicNumber +
      tokenStore.get("initialMagicNumbers")[idx] * tokenStore.get("serverDay") -
      tokenStore.get("initialMagicNumbers")[idx - 1];

    const pageSize = 500;

    const initialPage = await this._getTodayPrice(id, pageSize, 0);

    const totalPages = initialPage.totalPages;
    const pageDataPromises = Array.from({ length: totalPages - 1 }, (_, i) =>
      this._getTodayPrice(id, pageSize, i + 1),
    );
    const pageData = await Promise.all(pageDataPromises);

    return initialPage.content.concat(...pageData.map((d) => d.content));
  }
}

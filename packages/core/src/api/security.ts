import { ENDPOINTS, nepseApi } from "../consts/api";
import { tokenStore } from "../consts/store/store";
import { getMagicNumberFor } from "../helpers/magic-number.helper";
import { ISecurityBrief, ISecurityDetail } from "../interfaces";

export class Security {
  private readonly _axios = nepseApi;
  // cache securities
  private securities: Omit<ISecurityBrief, "activeStatus">[] = [];

  public async getSecurityList(): Promise<
    Omit<ISecurityBrief, "activeStatus">[]
  > {
    if (this.securities.length > 0) {
      return this.securities;
    }
    const response = await this._axios
      .get<ISecurityBrief[]>(ENDPOINTS.api.nots.security.getSecurities)
      .then((res) => res.data);

    const activeSecurities = response
      .filter((security) => security.activeStatus === "A")
      .map((security) => {
        const { activeStatus, ...rest } = security;
        return rest;
      });

    this.securities = activeSecurities;
    return this.securities;
  }

  public async getSecurityDetail(
    symbol: string,
  ): Promise<ISecurityDetail | null> {
    const security = await this.getSecurityList().then((securities) =>
      securities.find(
        (security) => security.symbol.toLowerCase() === symbol.toLowerCase(),
      ),
    );

    if (!security) {
      return null;
    }

    const response = await this._axios
      .post<ISecurityDetail>(
        `${ENDPOINTS.api.nots.security.getSecurity(security.id)}`,
        {
          id: tokenStore.get("magicNumber"),
        },
      )
      .then((res) => res.data);

    return response;
  }
}

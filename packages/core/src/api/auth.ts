import { ENDPOINTS, nepseApi } from "../consts/api";
import { tokenStore } from "../consts/store/store";
import { getMagicNumberFor } from "../helpers/magic-number.helper";
import { TokenHelper } from "../helpers/token.helper";
import { IProve } from "../interfaces/api";
import { NepseData } from "./nepse-data";

export class Auth {
  private readonly _axios = nepseApi;
  private readonly marketWrapper: NepseData;
  private readonly tokenHelper: TokenHelper;

  public constructor(marketWrapper: NepseData, tokenHelper: TokenHelper) {
    this.marketWrapper = marketWrapper;
    this.tokenHelper = tokenHelper;
  }

  public async authenticate() {
    const prove = await this._axios
      .get<IProve>(ENDPOINTS.api.authenticate.getProve)
      .then((res) => res.data);

    const NEPAL_HOUR_OFFSET = 5.75;
    const nepalDate = new Date(
      prove.serverTime + NEPAL_HOUR_OFFSET * 60 * 1000,
    ); // Date constructor doesn't consider timezone offset

    const salts = [
      prove.salt1,
      prove.salt2,
      prove.salt3,
      prove.salt4,
      prove.salt5,
    ];

    tokenStore.set({
      accessToken: this.tokenHelper.encodeAccessToken(prove.accessToken, salts),
      refreshToken: this.tokenHelper.encodeRefreshToken(
        prove.refreshToken,
        salts,
      ),
      initialMagicNumbers: salts,
      magicNumbers: salts,
      serverDay: nepalDate.getDate(),
    });

    const marketOpen = await this.marketWrapper.getMarketOpen();

    tokenStore.set({
      magicNumber: getMagicNumberFor(marketOpen.id, nepalDate.getDate()),
      serverDay: nepalDate.getDate(),
    });
  }

  public async refreshToken() {
    const prove = await this._axios
      .post<IProve>(ENDPOINTS.api.authenticate.refreshToken, {
        refreshToken: tokenStore.get("refreshToken"),
      })
      .then((resp) => resp.data);

    const magicNumbers = [
      prove.salt1,
      prove.salt2,
      prove.salt3,
      prove.salt4,
      prove.salt5,
    ];
    const accessToken = this.tokenHelper.encodeAccessToken(
      prove.accessToken,
      magicNumbers,
    );
    const refreshToken = this.tokenHelper.encodeRefreshToken(
      prove.refreshToken,
      magicNumbers,
    );

    tokenStore.set({
      accessToken,
      refreshToken,
      magicNumbers,
    });
  }
}

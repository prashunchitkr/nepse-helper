import { Auth, NepseData, Security } from "./api";
import { TokenHelper } from "./helpers/token.helper";
import { INepse } from "./interfaces";
import { PageSize } from "./interfaces/api";

export { INepse } from "./interfaces";
export * from "./interfaces/api";

class Nepse implements INepse {
  private readonly _auth: Auth;
  private readonly _nepseData: NepseData;
  private readonly _security: Security;

  constructor(auth: Auth, nepseData: NepseData, security: Security) {
    this._auth = auth;
    this._nepseData = nepseData;
    this._security = security;
  }

  public getMarketStatus = async () =>
    this._auth.refreshToken().then(() => this._nepseData.getMarketOpen());

  public getSecurityList = async () =>
    this._auth.refreshToken().then(() => this._security.getSecurityList());

  public getTodayPrice = async (page = 0, pageSize: PageSize = 500) =>
    this._auth
      .refreshToken()
      .then(() => this._nepseData.getTodayPrice(page, pageSize));

  public getSecurityDetail = async (symbol: string) =>
    this._auth
      .refreshToken()
      .then(() => this._security.getSecurityDetail(symbol));
}

export class NepseBuilder {
  public static async build(): Promise<INepse> {
    const tokenHelper = await TokenHelper.instance();
    const nepseData = new NepseData();
    const auth = new Auth(nepseData, tokenHelper);
    await auth.authenticate();
    const security = new Security();

    return new Nepse(auth, nepseData, security);
  }
}

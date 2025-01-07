import { Auth, Market, Security } from "./api";
import { TokenHelper } from "./helpers/token.helper";

export * from "./interfaces/api";

export class Nepse {
  private readonly _auth: Auth;
  private readonly _market: Market;
  private readonly _security: Security;

  constructor(auth: Auth, market: Market, security: Security) {
    this._auth = auth;
    this._market = market;
    this._security = security;
  }

  public getMarketStatus = async () => this._market.getMarketOpen();

  public getSecurityList = async () =>
    this._auth.refreshToken().then(() => this._security.getSecurityList());

  public getSecurityDetail = async (symbol: string) =>
    this._auth
      .refreshToken()
      .then(() => this._security.getSecurityDetail(symbol));
}

export class NepseBuilder {
  public static async build() {
    const tokenHelper = await TokenHelper.instance();
    const market = new Market();
    const auth = new Auth(market, tokenHelper);
    await auth.authenticate();
    const security = new Security();

    return new Nepse(auth, market, security);
  }
}

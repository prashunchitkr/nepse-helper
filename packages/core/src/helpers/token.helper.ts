import { ENDPOINTS, USER_AGENT } from "../consts/api";
import { CssWasmExports } from "../interfaces";

export class TokenHelper {
  private readonly wasm: CssWasmExports;

  private constructor(wasm: CssWasmExports) {
    this.wasm = wasm;
  }

  public static async create(): Promise<TokenHelper> {
    const wasm = await WebAssembly.instantiateStreaming(
      fetch(ENDPOINTS.CSS_WASM_URL, {
        headers: {
          "User-Agent": USER_AGENT,
          Referer: ENDPOINTS.NEPSE_URL,
        },
      }),
    );
    const exports = wasm.instance.exports as CssWasmExports;
    return new TokenHelper(exports);
  }

  public encodeAccessToken(accessToken: string, salts: number[]): string {
    return (
      accessToken.slice(
        0,
        this.wasm.cdx(salts[0], salts[1], salts[2], salts[3], salts[4]),
      ) +
      accessToken.slice(
        this.wasm.cdx(salts[0], salts[1], salts[2], salts[3], salts[4]) + 1,
        this.wasm.rdx(salts[0], salts[1], salts[2], salts[3], salts[4]),
      ) +
      accessToken.slice(
        this.wasm.rdx(salts[0], salts[1], salts[2], salts[3], salts[4]) + 1,
        this.wasm.bdx(salts[0], salts[1], salts[2], salts[3], salts[4]),
      ) +
      accessToken.slice(
        this.wasm.bdx(salts[0], salts[1], salts[2], salts[3], salts[4]) + 1,
        this.wasm.ndx(salts[0], salts[1], salts[2], salts[3], salts[4]),
      ) +
      accessToken.slice(
        this.wasm.ndx(salts[0], salts[1], salts[2], salts[3], salts[4]) + 1,
        this.wasm.mdx(salts[0], salts[1], salts[2], salts[3], salts[4]),
      ) +
      accessToken.slice(
        this.wasm.mdx(salts[0], salts[1], salts[2], salts[3], salts[4]) + 1,
      )
    );
  }

  public encodeRefreshToken(refreshToken: string, salts: number[]): string {
    return (
      refreshToken.slice(
        0,
        this.wasm.cdx(salts[1], salts[0], salts[2], salts[4], salts[3]),
      ) +
      refreshToken.slice(
        this.wasm.cdx(salts[1], salts[0], salts[2], salts[4], salts[3]) + 1,
        this.wasm.rdx(salts[1], salts[0], salts[2], salts[3], salts[4]),
      ) +
      refreshToken.slice(
        this.wasm.rdx(salts[1], salts[0], salts[2], salts[3], salts[4]) + 1,
        this.wasm.bdx(salts[1], salts[0], salts[3], salts[2], salts[4]),
      ) +
      refreshToken.slice(
        this.wasm.bdx(salts[1], salts[0], salts[3], salts[2], salts[4]) + 1,
        this.wasm.ndx(salts[1], salts[0], salts[3], salts[2], salts[4]),
      ) +
      refreshToken.slice(
        this.wasm.ndx(salts[1], salts[0], salts[3], salts[2], salts[4]) + 1,
        this.wasm.mdx(salts[1], salts[0], salts[3], salts[2], salts[4]),
      ) +
      refreshToken.slice(
        this.wasm.mdx(salts[1], salts[0], salts[3], salts[2], salts[4]) + 1,
      )
    );
  }
}

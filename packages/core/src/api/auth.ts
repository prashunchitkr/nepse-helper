import axios from "axios";
import { Prove } from "../interfaces";
import { ENDPOINTS, USER_AGENT } from "../consts/api";

export class AuthWrapper {
  private readonly _axios = axios.create({
    baseURL: ENDPOINTS.NEPSE_URL,
    headers: {
      "User-Agent": USER_AGENT,
      Referer: ENDPOINTS.NEPSE_URL,
    },
  });

  public async getProve(): Promise<Prove> {
    return this._axios.get<Prove>(ENDPOINTS.PROVE_URL).then((res) => res.data);
  }
}

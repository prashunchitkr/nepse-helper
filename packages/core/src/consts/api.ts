import axios from "axios";
import { tokenStore } from "./store/store";
import { config } from "process";

const BASE_URL = "https://www.nepalstock.com.np";

export const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";

export const ENDPOINTS = {
  NEPSE_URL: BASE_URL,
  CSS_WASM_URL: "assets/prod/css.wasm",
  PROVE_URL: "api/authenticate/prove",
  REFRESH_TOKEN_URL: "api/authenticate/refresh-token",
  MARKET_OPEN: "api/nots/nepse-data/market-open",
  TODAY_PRICE: "api/nots/nepse-data/today-price",
  SECURITIES: "api/nots/security?nonDelisted=true",
  SECURITY: (id: number) => `api/nots/security/${id}`,
};

export const nepseApi = axios.create({
  baseURL: ENDPOINTS.NEPSE_URL,
  headers: {
    "User-Agent": USER_AGENT,
    Referer: ENDPOINTS.NEPSE_URL,
  },
});

nepseApi.interceptors.request.use((request) => {
  request.headers["Authorization"] = `Salter ${tokenStore.get("accessToken")}`;
  console.debug("Request", request.url);
  return request;
});

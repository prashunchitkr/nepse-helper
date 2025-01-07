import axios from "axios";
import { tokenStore } from "./store/store";

const BASE_URL = "https://www.nepalstock.com.np";

export const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";

export const ENDPOINTS = {
  baseUrl: BASE_URL,
  assets: {
    prod: {
      cssWasm: "assets/prod/css.wasm",
    },
  },
  api: {
    authenticate: {
      getProve: "api/authenticate/prove",
      refreshToken: "api/authenticate/refresh-token",
    },
    nots: {
      application: {
        getDividend: (id: number) => `api/nots/application/dividend/${id}`,
        getCompanyNews: (id: number) =>
          `api/nots/application/company-news/${id}`,
        getReports: (id: number) => `api/nots/application/reports/${id}`,
      },
      nepseData: {
        getMarketOpen: "api/nots/nepse-data/market-open",
        getTodayPrice: "api/nots/nepse-data/today-price",
        getFloorSheet: "api/nots/nepse-data/floorsheet",
      },
      security: {
        getSecurities: "api/nots/security?nonDelisted=true",
        getSecurity: (id: number) => `api/nots/security/${id}`,
        getProfile: (id: number) => `api/nots/security/profile/${id}`,
      },
    },
  },
};

export const nepseApi = axios.create({
  baseURL: ENDPOINTS.baseUrl,
  headers: {
    "User-Agent": USER_AGENT,
    Referer: ENDPOINTS.baseUrl,
  },
});

nepseApi.interceptors.request.use((request) => {
  request.headers["Authorization"] = `Salter ${tokenStore.get("accessToken")}`;
  return request;
});

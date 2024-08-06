import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";

const baseUrlPortal = process.env.REACT_APP_MAPPER_URL; // Replace with your API's base URL in .env file
let paxios = axios.create();

const fullToken = localStorage.getItem("token");
const refreshTokenKey = localStorage.getItem("refresh-token");

export const errorCatch = () => {};

paxios.interceptors.response.use(
  async (response: any) => {
    const responseCode = response?.data?.response_code;
    const responseMsg = response?.data?.response_message;

    if (responseCode === 1) {
      message.error("No Results Please Choose another Categories or level");
      return;
    }
    if (responseCode === 2) {
      message.error("Invalid Data, Please Enter Correct Data");
      return;
    }
    if (responseCode === 3 || responseCode === 4) {
      message.error("Invalid Data, Please Enter Correct Data");
      return;
    }
    return response;
  },
  async (error) => {
    console.error("Network error:", error.message);
    message.error("Network error. Please try again later.");

    return Promise.reject(error);
  }
);

export default class Api {
  static async get(route: string, config?: AxiosRequestConfig) {
    return await this.execute(route, null, "get", config);
  }

  static async put(route: string, params?: any, config?: AxiosRequestConfig) {
    return await this.execute(route, params, "put", config);
  }

  static async post(route: string, params?: any, config?: AxiosRequestConfig) {
    return await this.execute(route, params, "post", config);
  }

  static async delete(
    route: string,
    params?: any,
    config?: AxiosRequestConfig
  ) {
    return await this.execute(route, params, "delete", config);
  }

  static async execute(
    route: string,
    params: any,
    verb: "post" | "get" | "delete" | "put",
    axiosConfig?: AxiosRequestConfig
  ) {
    let request: string[] = [`${baseUrlPortal}${route}`];
    let config: AxiosRequestConfig = {
      ...axiosConfig,
      headers: {
        // Authorization: `Bearer ${fullToken}`,
        // Lang: "en",
        // from: "WEB",
        // ...axiosConfig?.headers,
        "Content-Type": "application/json;",
      },
    };
    if (route === "login") {
      config = {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      };
    }

    if (params) request.push(params);
    //@ts-ignore
    let result = await paxios?.[verb](...request, config);
    return result?.data;
  }
}

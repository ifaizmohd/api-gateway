import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "../interfaces/handlers/ApiHandler";
import { ApiError } from "../utils/apiErrorHandler";

export class ApiHandler {
  private static axiosInstance: Axios;

  static configure(config: AxiosRequestConfig): void {
    this.axiosInstance = axios.create(config);
  }

  static async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        url,
        config
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      throw new ApiError(error.message);
    }
  }

  static async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        url,
        data,
        config
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      throw new ApiError(error.message);
    }
  }

  static async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        url,
        data,
        config
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      throw new ApiError(error.message);
    }
  }

  static async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        config
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      throw new ApiError(error.message);
    }
  }
}

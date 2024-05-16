import { Axios, AxiosRequestConfig } from "axios";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface RegisterUserResponse {
  message?: string;
}

export declare class Handler {
  private static axiosInstance: Axios;
  static configure(config: AxiosRequestConfig): void;
  static get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
  static post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
  static put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
  static delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>>;
}

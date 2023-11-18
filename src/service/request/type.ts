import type { AxiosRequestConfig, AxiosResponse } from "axios";

interface interceptorsEnhance<T = AxiosResponse> {
  requestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailure?: (error: any) => any
  responseSuccess?: (res: T) => T
  responseFailure?: (error: any) => any
}

export interface AxiosRequestConfigEnhance<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: interceptorsEnhance<T>
}
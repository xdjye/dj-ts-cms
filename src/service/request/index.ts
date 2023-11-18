import axios from "axios";
import type { AxiosInstance } from "axios";
import type { AxiosRequestConfigEnhance } from "./type";


class TSRequest {
  instance: AxiosInstance
  // 每个request实例 => 对应一个axios实例
  constructor(config: AxiosRequestConfigEnhance) {
    this.instance = axios.create(config);

    // 请求拦截器
    this.instance.interceptors.request.use(
      (success) => {
        return success
      }, 
      (error) => {
        return error
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (success) => success.data, 
      (error) => error
    )

    // 自定义请求拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestFailure
    )

    // 自定义响应拦截器
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseFailure
    )
  }

  // 封装网络请求的方法-进阶-单个自定义请求拦截、响应拦截
  request<T = any>(config: AxiosRequestConfigEnhance<T>) {
    // 单次请求自定义拦截
    if(config.interceptors?.requestSuccess) {
      config = config.interceptors?.requestSuccess(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then((res) => {
        // 单次自定义响应拦截
        if(config.interceptors?.responseSuccess) {
          res = config.interceptors.responseSuccess(res)
        }
        resolve(res)
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }

  get<T = any>(config: AxiosRequestConfigEnhance<T>) {
    return this.request({
      ...config,
      method: "GET"
    })
  }

  post<T = any>(config: AxiosRequestConfigEnhance<T>) {
    return this.request({
      ...config,
      method: "POST"
    })
  }

  delete<T = any>(config: AxiosRequestConfigEnhance<T>) {
    return this.request({
      ...config,
      method: "DELETE"
    })
  }

  patch<T = any>(config: AxiosRequestConfigEnhance<T>) {
    return this.request({
      ...config,
      method: "PATCH"
    })
  }
}

export default TSRequest;
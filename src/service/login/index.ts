import tsRequest from ".."

// 账号登录
const accountLogin = (params: any) => tsRequest.post({ url: "/login", data: params })

export {
  accountLogin
}
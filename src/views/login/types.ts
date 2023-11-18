export interface ICodeInfo {
  count: number
  timer: number | undefined
}

export interface IFormInfo {
  username: string | null,
  password: string | null,
  rememberPassword: boolean,
  verifyCode: string | null
}
import { defineStore } from "pinia";
import { accountLogin } from "@/service/login"
import { localCache } from "@/utils/cache";
import { ElMessage } from "element-plus"
import { encryptionContent } from "@/utils/commonUtils"
import router from "@/router";
import type { IFormInfo } from "@/types"

const userLoginInfoStore = defineStore('userLoginInfo', {
  state: () => ({
    userInfo: localCache.getCache("userInfo") ?? {
      name: null, 
      password: null, 
      rememberPassword: 0
    },
  }),
  actions: {
    async accountLoginAction(params: IFormInfo) {
      const {name, password, rememberPassword} = params
      await accountLogin({name, password}).then((res) => {
        if(res.code === 0) {
          const userInfo_ = res.data ?? {}
          if(rememberPassword) {
            localCache.setCache("userInfo", { ...userInfo_, rememberPassword: 1, password: encryptionContent(password as string) })
          } else {
            localCache.setCache("userInfo", { ...userInfo_, rememberPassword: 0 })
          }
          ElMessage({
            message: '登录成功！',
            type: 'success',
          })
          router.push("/main")
        }
      })
    }
  }
})

export default userLoginInfoStore;
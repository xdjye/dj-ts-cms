import { Base64 } from 'js-base64'

// 加密内容
export const encryptionContent = (content: string) => {
  return Base64.encode(content)
}

// 解密内容
export const decryptingContent = (content: string) => {
  return Base64.decode(content)
}
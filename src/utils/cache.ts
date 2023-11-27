enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  getCache(key: string) { // 获取
    const value = this.storage.getItem(key)
    if(value) return JSON.parse(value) 
  }
  setCache(key: string, value: any) { // 保存
    if(value) this.storage.setItem(key, JSON.stringify(value)) 
  }
  removeCache(key: string) { // 指定key删除
    this.storage.removeItem(key)
  }
  clearAllCache() { // 全部删除
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)
export {
  localCache,
  sessionCache
}
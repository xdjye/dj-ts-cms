<script lang="ts" setup>
import router from '@/router';
import { localCache } from '@/utils/cache';
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

  // 退出登录
  const loginOut = () => {
    const userInfo = localCache.getCache("userInfo")
    localCache.setCache("userInfo", { ...userInfo, token: null })
    router.push("/login")
  }
</script>

<template>
  <div class="home">
    <h1>home</h1>
    <el-button @click="loginOut">退出登录</el-button>
  </div>
</template>

<style lang="less" scoped></style>
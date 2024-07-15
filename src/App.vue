<script setup>
// 在Vue3 中 composition API中
// 1. 获取路由对象 router useRouter()
//  const router =useRouter()
// 2. 获取路由参数 route useRoute()
//  const route =useRoute()
// import { useRouter, useRoute } from 'vue-router'
// import { useUserStore } from '@/stores'
// const router = useRouter()
// const route = useRoute()
// 中英语言转换
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>

<template>
  <div>
    <!-- 国际化处理 -->
    <el-config-provider :locale="zh">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>

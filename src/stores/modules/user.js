import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

//  用户模块 token settoken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref(null)
    const setToken = (newtoken) => {
      token.value = newtoken
    }
    const removeToken = () => {
      token.value = null
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      // console.log(res) //请求获取数据
      user.value = res.data.data
      // console.log(user)
    }
    const setUser = (newuser) => {
      user.value = newuser
    }
    return {
      token,
      setToken,
      removeToken,
      getUser,
      user,
      setUser
    }
  },
  {
    persist: true
  }
)

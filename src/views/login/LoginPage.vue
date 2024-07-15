<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const isRegister = ref(false)
// 获取dom元素
const form = ref(null)
// 整个的用于提交的form表单数据
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 整个表单的校验准则
// trigger 触发校验的方式
// blur 失去焦点触发校验
// change 值改变触发校验
// 1. 非空校验 required ：true ，message 提示信息，trigger 触发校验的方式
// 2. 长度校验 min max
// 3. 正则校验 pattern ：正则规则
// 4. 自定义校验函数 validator
//  validator：(rule,value,callback)
//  (1).rule 当前校验规则
//  (2).value 当前所校验表单校验字段的表单值
// 无论成功或者失败，都需要callback 回调
//  (3).callback() 校验通过回调函数
//  (4).callback(new Error('错误信息')) 校验失败回调函数
// 5. 异步校验 async-validator
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名必须是2-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback() //就算校验成功也要 callback
        }
      },
      trigger: 'blur'
    }
  ]
}
// validate	对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise
// 注册按钮
const register = async () => {
  // 注册成功之前，会先进行整体校验，校验成功》请求，检验失败，自动提示
  await form.value.validate()
  //   console.log('开始请求注册')
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  //   注册成功后跳转到 登录页面
  isRegister.value = false
}
// 注册登录

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  //   console.log('开始登录', res)
  ElMessage.success('登录成功')
  router.push('/')
}
// 监听，切换的时候，重置表单内容
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <!-- el-row表示一行，一行分成24份
    1.el-col表示列 :span="12"表示占12份，
    :offset="3"表示偏移3份,左侧margin数
    el-form表示整个表单
    el-form-item表示表单中的每一项
    el-input表示输入框
    el-button表示按钮
    el-icon表示图标

     详细可以见官方文档https://element-plus.org/zh-CN/component/form.html
    2.(1).el-form => :model="ruleForm" ,绑定是整个form 表单数据对象{xxx，xxx，xxx}
     (2).el-form =》：rules='rules' 绑定的是整个rules规则对象与form表单数据一一对应 {xxx，xxx，xxx}
     (3).表单元素=》 v-model='ruleForm.xxx' 给表单元素添加form绑定子属性
     (4).prop 配置生效的是哪个校验规则(和rules中的字段相对应)
    -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

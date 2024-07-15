// 仓库统一导出
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// app.use(createPinia().use(persist))
pinia.use(persist)

export default pinia
// import { useUserStore } from './modules/user'
// export { useUserStore }
export * from './modules/user'

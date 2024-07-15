// 封装格式化日期函数
import { dayjs } from 'element-plus'
export const formatTime = (time) => dayjs(time).format('YYYY年MM月DD日')

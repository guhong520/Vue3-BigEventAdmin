<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})
// emit触发方法
const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()
</script>
<template>
  <!-- 父组件和子组件双向绑定 -->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <!-- label 给用户看的，value 搜集起来提交给后台的 -->
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>

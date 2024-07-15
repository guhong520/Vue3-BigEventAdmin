<script setup>
import { ref } from 'vue'
import { artEditChannelService, artAddChannelService } from '@/api/article.js'
const formRef = ref()
const dialogVisible = ref(false)
//一个事件发射器方法，用于触发事件。emit 函数表示触发事件的方法，
//'success' 表示要触发的事件名称。当用户点击 "确认" 按钮时，
//会触发这个事件，并调用 onSuccess 函数，获取分类列表。
const emit = defineEmits(['success'])
const formModel = ref({
  cate_name: '', //分类名称
  cate_alias: '' // 分类别名
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称1-10个非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15字母数字',
      trigger: 'blur'
    }
  ]
}

const onSubmit = async () => {
  // 等待表单验证
  //validate 方法表示验证表单数据的方法。当用户在表单中输入数据时，表单会自动验证数据是否符合规则，如果不符合规则，会提示用户输入正确的数据。
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
// ### 封装弹层组件 ChannelEdit

// 添加和编辑，可以共用一个弹层，所以可以将弹层封装成一个组件

// 组件对外暴露一个方法 open,  基于open的参数，初始化表单数据，并判断区分是添加 还是 编辑

// 1. open({ })                   =>  添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显
// 下面的弹层的名字也是如此区分
const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
  // 这里的... 表示的是浅拷贝，以达到回显的目的，
  // 如果是添加操作，row是空对象，浅拷贝后，formModel也是空对象
  // 如果是编辑操作，row是对象，浅拷贝后，formModel也是对象
}

// 向外暴露方法
defineExpose({
  open
})
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      :model="formModel"
      ref="formRef"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="onSubmit()" type="primary"> 确认 </el-button>
      </span>
    </template></el-dialog
  >
</template>

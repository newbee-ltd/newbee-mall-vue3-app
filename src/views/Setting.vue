<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div class="seting-box">
    <s-header :name="'账号管理'"></s-header>
    <div class="input-item">
      <van-field v-model="state.nickName" label="昵称" />
      <van-field v-model="state.introduceSign" label="个性签名" />
      <van-field v-model="state.password" type='password' label="修改密码" />
    </div>
    <van-button round class="save-btn" color="#1baeae" type="primary" @click="save" block>保存</van-button>
    <van-button round class="save-btn" color="#1baeae" type="primary" @click="handleLogout" block>退出登录</van-button>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import md5 from 'js-md5'
import sHeader from '@/components/SimpleHeader.vue'
import { getUserInfo, EditUserInfo, logout } from '@/service/user'
import { setLocal } from '@/common/js/utils'
import { showSuccessToast } from 'vant'
const state = reactive({
  nickName: '',
  introduceSign: '',
  password: ''
})

onMounted(async () => {
  const { data } = await getUserInfo()
  state.nickName = data.nickName
  state.introduceSign = data.introduceSign
})

const save = async () => {
  const params = {
    introduceSign: state.introduceSign,
    nickName: state.nickName
  }
  if (state.password) {
    params.passwordMd5 = md5(state.password)
  } 
  await EditUserInfo(params)
  showSuccessToast('保存成功')
}

const handleLogout = async () => {
  const { resultCode } = await logout()
  if (resultCode == 200) {
    setLocal('token', '')
    window.location.href = '/home'
  }
}
</script>

<style lang="less" scoped>
  .seting-box {
    .save-btn {
      width: 80%;
      margin: 20px auto ;
    }
  }
</style>

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
  <header class="simple-header van-hairline--bottom">
    <i v-if="!isback" class="nbicon nbfanhui" @click="goBack"></i>
    <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
    <div class="simple-header-name">{{ name }}</div>
    <i class="nbicon nbmore"></i>
  </header>
  <div class="block" />
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    back: {
      type: String,
      default: ''
    },
    noback: {
      type: Boolean,
      default: false
    }
  },
  emits: ['callback'],
  setup(props, ctx) {
    const isback = ref(props.noback)
    const router = useRouter()
    const goBack = () => {
      if (!props.back) {
        router.go(-1)
      } else {
        router.push({ path: props.back })
      }
      ctx.emit('callback')
    }
    return {
      goBack,
      isback
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .simple-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    .simple-header-name {
      font-size: 14px;
    }
  }
  .block {
    height: 44px;
  }
</style>

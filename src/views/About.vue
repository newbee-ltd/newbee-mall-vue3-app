<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *-->
<template>
  <div class="about">
    <s-header :name="'关于我们'"></s-header>
    <div class="about-body">
      <img class="intro-img" src="https://s.yezgea02.com/1604046067055/WechatIMG30231.jpeg" alt="">
      <van-divider :style="{ color: '#1baeae', borderColor: '#1baeae', fontSize: '20px', fontWeight: 500 }">简介</van-divider>
      <div>newbee-mall 项目是一套电商系统，包括 newbee-mall 商城系统及 newbee-mall-admin 商城后台管理系统，基于 Spring Boot 2.X 及相关技术栈开发。 前台商城系统包含首页门户、商品分类、新品上线、首页轮播、商品推荐、商品搜索、商品展示、购物车、订单结算、订单流程、个人订单管理、会员中心、帮助中心等模块。 后台管理系统包含数据面板、轮播图管理、商品管理、订单管理、会员管理、分类管理、设置等模块。</div>
      <van-divider :style="{ color: '#1baeae', borderColor: '#1baeae', fontSize: '20px', fontWeight: 500 }">开源地址</van-divider>
      <div>
        <div>掘金小册配套学习文档：<a target="_blank" href="https://juejin.im/book/6844733826191589390">《Vue 商城项目开发实战》</a></div>
        <br/>
        <div>后端 API 地址：<a target="_blank" href="https://github.com/newbee-ltd/newbee-mall-api">https://github.com/newbee-ltd/newbee-mall-api</a></div>
        <br/>
        <div>前端 Vue2.x + Vant2.x 开源地址：<a target="_blank" href="https://github.com/newbee-ltd/newbee-mall-vue-app">https://github.com/newbee-ltd/newbee-mall-vue-app</a></div>
        <div>前端 Vue3.x + Vant3.x 开源地址：<a target="_blank" href="https://github.com/newbee-ltd/newbee-mall-vue3-app">https://github.com/newbee-ltd/newbee-mall-vue3-app</a></div>
        <br/>
        <div>线上预览地址：<a target="_blank" href="http://47.99.134.126:5000/">http://vue-app.newbee.ltd</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
export default {
  components: {
    sHeader
  },
}
</script>

<style lang="less" scoped>
  .about {
    box-sizing: border-box;
    padding: 20px;
    .intro-img {
      width: 100%;
    }
    .about-body {
      font-size: 16px;
      a {
        color: #007fff;
      }
    }
  }
</style>

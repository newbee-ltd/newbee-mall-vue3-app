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
  <div ref="wrapper" class="scroll-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    // 点击列表是否派发click事件
    click: {
      type: Boolean,
      default: true
    },
    // 是否开启横向滚动
    scrollX: {
      type: Boolean,
      default: false
    },
    // 是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 列表的数据
    scrollData: {
      type: Array,
      default: null
    },
    // 是否派发滚动到底部的事件，用于上拉加载
    pullup: {
      type: Boolean,
      default: false
    },
    // 是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false
    },
    // 是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false
    },
    // 当数据更新后，刷新scroll的延时
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    // 在 DOM 渲染完毕后初始化 better-scroll
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  updated() {
    this.bs.refresh()
  },
  methods: {
    initScroll() {
      // better-scroll 初始化
      this.bs = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true
      })
      this.bs.on('scroll', () => {
          console.log('scrolling-')
        })
        this.bs.on('scrollEnd', () => {
          console.log('scrollingEnd')
        })
    } 
  }
}
</script>

<style lang="less" scoped>
  .scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    touch-action: pan-y;
  }
</style>
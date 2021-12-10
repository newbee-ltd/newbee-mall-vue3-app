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
  <div class="order-detail-box">
    <s-header :name="'订单详情'" @callback="close"></s-header>
    <div class="order-status">
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{ detail.orderStatusString }}</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{ detail.orderNo }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{ detail.createTime }}</span>
      </div>
      <van-button v-if="detail.orderStatus == 3" style="margin-bottom: 10px" color="#1baeae" block @click="handleConfirmOrder(detail.orderNo)">确认收货</van-button>
      <van-button v-if="detail.orderStatus == 0" style="margin-bottom: 10px" color="#1baeae" block @click="showPayFn">去支付</van-button>
      <van-button v-if="!(detail.orderStatus < 0 || detail.orderStatus == 4)" block @click="handleCancelOrder(detail.orderNo)">取消订单</van-button>
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥ {{ detail.totalPrice }}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>
    <van-card
      v-for="item in detail.newBeeMallOrderItemVOS"
      :key="item.goodsId"
      style="background: #fff"
      :num="item.goodsCount"
      :price="item.sellingPrice"
      desc="全场包邮"
      :title="item.goodsName"
      :thumb="$filters.prefix(item.goodsCoverImg)"
    />
    <van-popup
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '24%' }"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '20px 0' }">
        <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="handlePayOrder(detail.orderNo, 1)">支付宝支付</van-button>
        <van-button color="#4fc08d" block @click="handlePayOrder(detail.orderNo, 2)">微信支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import sHeader from '@/components/SimpleHeader'
import { getOrderDetail, cancelOrder, confirmOrder, payOrder } from '@/service/order'
import { Dialog, Toast } from 'vant'
import { useRoute } from 'vue-router'
export default {
  name: 'OrderDetail',
  components: {
    sHeader
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      detail: {},
      showPay: false
    })

    onMounted(() => {
      init()
    })

    const init = async () => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      const { id } = route.query
      const { data } = await getOrderDetail(id)
      state.detail = data
      Toast.clear()
    }

    const handleCancelOrder = (id) => {
      Dialog.confirm({
        title: '确认取消订单？',
      }).then(() => {
        cancelOrder(id).then(res => {
          if (res.resultCode == 200) {
            Toast('删除成功')
            init()
          }
        })
      }).catch(() => {
        // on cancel
      });
    }

    const handleConfirmOrder = (id) => {
      Dialog.confirm({
        title: '是否确认订单？',
      }).then(() => {
        confirmOrder(id).then(res => {
          if (res.resultCode == 200) {
            Toast('确认成功')
            init()
          }
        })
      }).catch(() => {
        // on cancel
      });
    }

    const showPayFn = () => {
      state.showPay = true
    }

    const handlePayOrder = async (id, type) => {
      Toast.loading
      await payOrder({ orderNo: id, payType: type })
      state.showPay = false
      init()
    }

    const close = () => {
      Dialog.close()
    }

    return {
      ...toRefs(state),
      handleCancelOrder,
      handleConfirmOrder,
      showPayFn,
      handlePayOrder,
      close
    }

  }
}
</script>

<style lang="less" scoped>
  .order-detail-box {
    background: #f7f7f7;
    .order-status {
      background: #fff;
      padding: 20px;
      font-size: 15px;
      .status-item {
        margin-bottom: 10px;
        label {
          color: #999;
        }
        span {

        }
      }
    }
    .order-price {
      background: #fff;
      margin: 20px 0;
      padding: 20px;
      font-size: 15px;
      .price-item {
        margin-bottom: 10px;
        label {
          color: #999;
        }
        span {

        }
      }
    }
    .van-card {
      margin-top: 0;
    }
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>

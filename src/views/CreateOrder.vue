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
  <div class="create-order">
    <s-header :name="'生成订单'" @callback="deleteLocal"></s-header>
    <div class="address-wrap">
      <div class="name" @click="goTo">
        <span>{{ address.userName }} </span>
        <span>{{ address.userPhone }}</span>
      </div>
      <div class="address">
        {{ address.provinceName }} {{ address.cityName }} {{ address.regionName }} {{ address.detailAddress }}
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <div class="good-item" v-for="(item, index) in cartList" :key="index">
        <div class="good-img"><img :src="$filters.prefix(item.goodsCoverImg)" alt=""></div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goodsName }}</span>
            <span>x{{ item.goodsCount }}</span>
          </div>
          <div class="good-btn">
            <div class="price">¥{{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥{{ total }}</span>
      </div>
      <van-button @click="handleCreateOrder" class="pay-btn" color="#1baeae" type="primary" block>生成订单</van-button>
    </div>
    <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '30%' }"
      @close="close"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="handlePayOrder(1)">支付宝支付</van-button>
        <van-button color="#4fc08d" block @click="handlePayOrder(2)">微信支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, computed } from 'vue'
import sHeader from '@/components/SimpleHeader'
import { getByCartItemIds } from '@/service/cart'
import { getDefaultAddress, getAddressDetail } from '@/service/address'
import { createOrder, payOrder } from '@/service/order'
import { setLocal, getLocal } from '@/common/js/utils'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
export default {
  components: {
    sHeader
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      cartList: [],
      address: {},
      showPay: false,
      orderNo: '',
      cartItemIds: []
    })

    onMounted(() => {
      init()
    })
    
    const init = async () => {
      Toast.loading({ message: '加载中...', forbidClick: true });
      const { addressId, cartItemIds } = route.query
      const _cartItemIds = cartItemIds ? JSON.parse(cartItemIds) : JSON.parse(getLocal('cartItemIds'))
      console.log('cartItemIds', cartItemIds)
      setLocal('cartItemIds', JSON.stringify(_cartItemIds))
      const { data: list } = await getByCartItemIds({ cartItemIds: _cartItemIds.join(',') })
      const { data: address } = addressId ? await getAddressDetail(addressId) : await getDefaultAddress()
      if (!address) {
        router.push({ path: '/address' })
        return
      }
      state.cartList = list
      state.address = address
      Toast.clear()
    }

    const goTo = () => {
      router.push({ path: '/address', query: { cartItemIds: JSON.stringify(state.cartItemIds), from: 'create-order' }})
    }

    const deleteLocal = () => {
      setLocal('cartItemIds', '')
    }

    const handleCreateOrder = async () => {
      const params = {
        addressId: state.address.addressId,
        cartItemIds: state.cartList.map(item => item.cartItemId)
      }
      const { data } = await createOrder(params)
      setLocal('cartItemIds', '')
      state.orderNo = data
      state.showPay = true
    }

    const close = () => {
      router.push({ path: '/order' })
    }

    const handlePayOrder = async (type) => {
      await payOrder({ orderNo: state.orderNo, payType: type })
      Toast.success('支付成功')
      setTimeout(() => {
        router.push({ path: '/order' })
      }, 2000)
    }

    const total = computed(() => {
      let sum = 0
      state.cartList.forEach(item => {
        sum += item.goodsCount * item.sellingPrice
      })
      return sum
    })

    return {
      ...toRefs(state),
      goTo,
      deleteLocal,
      handleCreateOrder,
      close,
      handlePayOrder,
      total
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .create-order {
    background: #f9f9f9;
    .address-wrap {
      margin-bottom: 20px;
      background: #fff;
      position: relative;
      font-size: 14px;
      padding: 15px;
      color: #222333;
      .name, .address {
        margin: 10px 0;
      }
      .arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
      }
      &::before {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background-size: 80px;
        content: '';
      }
    }
    .good {
      margin-bottom: 120px;
    }
    .good-item {
      padding: 10px;
      background: #fff;
      display: flex;
      .good-img {
        img {
          .wh(100px, 100px)
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .pay-wrap {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      padding: 10px 0;
      padding-bottom: 50px;
      border-top: 1px solid #e9e9e9;
      >div {
        display: flex;
        justify-content: space-between;
        padding: 0 5%;
        margin: 10px 0;
        font-size: 14px;
        span:nth-child(2) {
          color: red;
          font-size: 18px;
        }
      }
      .pay-btn {
        position: fixed;
        bottom: 7px;
        right: 0;
        left: 0;
        width: 90%;
        margin: 0 auto;
      }
    }
  }
</style>

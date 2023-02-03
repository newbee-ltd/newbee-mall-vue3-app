import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCart } from '@/service/cart'
export const useCartStore = defineStore('cart', () => {
  const count = ref(0)
  async function updateCart() {
    const { data = [] } = await getCart()
    count.value = data.length
  }

  return { count, updateCart }
})

import { ADD_COUNT, ADD_PRODUCT } from "./mutations_const"

export default {
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  [ADD_PRODUCT](state, payload) {
    state.cartGoods.push(payload)
  }
}
import { ADD_COUNT, ADD_PRODUCT } from "./mutations_const"

export default {
  addCart(content, payload) {
    return new Promise((resolve, reject) => {
      let result = content.state.cartGoods.find(item => item.iid === payload.iid)
      if (result) {
        content.commit(ADD_COUNT, result)
        resolve('商品数量+1')
      } else {
        content.commit(ADD_PRODUCT, payload)
        resolve('添加购物车成功')
      }
    })

  }
}
export default {
  getTotalCounter(state) {
    return state.cartList.filter(item => item.checked).reduce((prev, item) => {
     return prev + item.count
   },0)
  },
  cartList(state) {
    return state.cartList
  }
}
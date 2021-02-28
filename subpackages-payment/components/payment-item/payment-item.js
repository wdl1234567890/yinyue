// subpackages-payment/components/payment-item/payment-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isActive:{
      type:Boolean,
      value:false
    },
    itemId:{
      type:Number,
      value:-1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkchange(e){
      this.triggerEvent('checkchange', e.detail)
    }
  }
})

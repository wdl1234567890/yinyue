// subpackages-payment/components/vip-month-card/vip-month-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemId:{
      type:Number,
      value:-1
    },
    isActive:{
      type:Boolean,
      value:false
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
    tap(e){
      this.setData({
        isActive:true
      })
      this.triggerEvent('checkchange', this.data.itemId)
    }
  }
})

// common/components/radio-button/radio-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    size:{
      type:Number,
      value:20
    },
    itemId:{
      type:Number,
      value:-1
    },
    isChecked:{
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
    checkChange(e){
      this.triggerEvent('checkchange', this.data.itemId)
    }
  }
})

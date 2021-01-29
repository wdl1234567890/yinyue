// pages/components/square-card/square-card.js
Component({
  externalClasses: ['square-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    size: {
      type: Number,
      value: 100
    },
    thumb: {
      type: String,
      value: ""
    },
    info: {
      type: String,
      value: "内容正在加载中，请稍后哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈......"
    },
    enableShadow:{
      type:Boolean,
      value:true
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

  }
})

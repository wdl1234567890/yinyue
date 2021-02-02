// pages/components/square-item/square-item.js
Component({
  externalClasses: ['square-item-class'],
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    size: {
      type: Number,
      value: 100
    },
    src: {
      type: String,
      value: ""
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

// pages/components/text-circular-card-item/text-circular-card-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
      type: String,
      value: '音乐'
    },
    size: {
      type: Number,
      value: 200
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
    tapItem(e) {
      this.triggerEvent('tapitem', this.data.itemId)
    }
  }
})

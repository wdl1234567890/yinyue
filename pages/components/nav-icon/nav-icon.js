// pages/components/nav-icon/nav-icon.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    size: {
      type: Number,
      value: 80
    },
    icon: {
      type: String,
      value: "live_fill"
    },
    label: {
      type: String,
      value: "标签"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    color: app.globalData.themeColor
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

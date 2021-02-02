let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabTitles:{
      type:Array,
      value:[]
    },
    contentHeight:{
      type:Number,
      value:200
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    aa: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollToLower(){
      wx.showLoading({
        title: '加载中',
      })
      let aa = this.data.aa
      let newaa = aa.concat([1,2,3])
      this.setData({
        aa:newaa
      })
      wx.hideLoading()
    }
  }
})

// common/components/play-bar/play-bar.js
let app=getApp()
Component({
  externalClasses: ['play-bar-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    height:{
      type: Number,
      value: 200
    },
    cover:{
      type:String,
      value:'/static/images/index/musicpink3.svg'
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    showSingListModal:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showModal(e) {
      this.setData({
        showSingListModal: true
      })
    },
    hideModal(e){
      this.setData({
        showSingListModal: false
      })
    },
    musicPlayItemChange(e){
      console.log("8888")
      this.triggerEvent('musicplayitemchange', e.detail)
    }
  }
})

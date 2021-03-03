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
    },
    singDatas:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollToLower(){
      wx.showLoading({
        title: '加载中',
      })
      // let aa = this.data.aa
      // let newaa = aa.concat([1,2,3])
      // this.setData({
      //   aa:newaa
      // })
      wx.hideLoading()
    },
    tapSwitch(e){
      this.triggerEvent('tapswitch', e.currentTarget.dataset.index)
    },
    tapPlayMusic(e){
      wx.navigateTo({
        url: '/subpackages-music/pages/music-play/music-play?id='+e.detail
      })
    }
  }
})

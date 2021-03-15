// common/components/play-bar/play-bar.js
let app = getApp()
let Store = require('../../utils/store/store.js')
Component({
  externalClasses: ['play-bar-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: Number,
      value: 200
    },
    musicInfo:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    themeColor: app.globalData.themeColor,
    showSingListModal: false,
    playStatus:app.globalData.stopIntervalNumber!=null
  },

  onReady(){
    // app.globalData.doSomething = this.doSomething
    
    Store.getCurrentPlayMusic().then(res=>{
      let musicInfo = res
      let playStatus = app.globalData.stopIntervalNumber != null
      this.setData({
        musicInfo,
        playStatus
      })
    })

  },

  detached(){
    app.globalData.endSomething=null
    // app.globalData.doSomething=null
    app.globalData.obj = null
  },

  pageLifetimes: {
    show() {
      app.globalData.endSomething = this.endPlay
      app.globalData.obj = this
      Store.getCurrentPlayMusic().then(res=>{
        let musicInfo = res
        let playStatus = app.globalData.stopIntervalNumber != null
        this.setData({
          musicInfo,
          playStatus
        })
      })
      
    }
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
    hideModal(e) {
      this.setData({
        showSingListModal: false
      })
    },
    toPlayPage(e){
      wx.navigateTo({
        url: '/subpackages-music/pages/music-play/music-play?id=-1'
      })
    },
    endPlay(){
      Store.getCurrentPlayMusic().then(res=>{
        let musicInfo = res
        let playStatus = app.globalData.stopIntervalNumber != null
        this.setData({
          musicInfo,
          playStatus
        })
      })
      
    },

    musiclistChange(e) {
      this.triggerEvent('musiclistchange', e.detail)
    },
    musicPlayItemChange(e) {
      Store.getCurrentPlayMusic().then(res=>{
        let musicInfo = res
        this.setData({
          musicInfo
        })
        this.triggerEvent('musicplayitemchange', e.detail)
        if (Object.keys(musicInfo).length == 0) return
        wx.navigateTo({
          url: '/subpackages-music/pages/music-play/music-play?id=' + e.detail
        })
      })
    },
    tapPlay(e) {
      let playStatus = this.data.playStatus
      if(playStatus) {
        // clearInterval(this.data.stopIntervalNum)
        app.globalData.pausePlayMusic()
        // this.setData({playStatus:false})
      } else {
        app.globalData.playMusic() 
      }
      playStatus = !playStatus
      this.setData({
        playStatus
      })

    }
  }
})
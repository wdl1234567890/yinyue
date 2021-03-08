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

  async onReady(){
    // app.globalData.doSomething = this.doSomething
    
    let musicInfo = await Store.getCurrentPlayMusic()
    let playStatus = app.globalData.stopIntervalNumber != null
    this.setData({
      musicInfo,
      playStatus
    })
  },

  detached(){
    app.globalData.endSomething=null
    // app.globalData.doSomething=null
    app.globalData.obj = null
  },

  pageLifetimes: {
    async show() {
      app.globalData.endSomething = this.endPlay
      app.globalData.obj = this
      let musicInfo = await Store.getCurrentPlayMusic()
      let playStatus = app.globalData.stopIntervalNumber != null
      // this.setData({
      //   cover: musicInfo.cover,
      //   singName: musicInfo.singName,
      //   singerName: musicInfo.singerName
      // })
      this.setData({
        musicInfo,
        playStatus
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
    async endPlay(){
      let musicInfo = await Store.getCurrentPlayMusic()
      let playStatus = app.globalData.stopIntervalNumber!=null
      this.setData({
        musicInfo,
        playStatus
      })
      
    },
    // async doSomething(){
    //   console.log("****")
    //   let musicInfo = await Store.getCurrentPlayMusic()
    //   let playStatus = app.globalData.stopIntervalNumber != null
    //   this.setData({
    //     musicInfo,
    //     playStatus
    //   })
    // },
    musiclistChange(e) {
      this.triggerEvent('musiclistchange', e.detail)
    },
    async musicPlayItemChange(e) {
      let musicInfo = await Store.getCurrentPlayMusic()
      this.setData({
        musicInfo
      })
      
      this.triggerEvent('musicplayitemchange', e.detail)
      if (Object.keys(musicInfo).length == 0) return
      wx.navigateTo({
        url: '/subpackages-music/pages/music-play/music-play?id=' + e.detail
      })
    },
    async tapPlay(e) {
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

      // if (stopIntervalNumber == null) {
      //   app.globalData.calPlayTime()
      // } else {
      //   clearInterval(stopIntervalNumber)
      //   Store.setStopIntervalNumber(null)
      // }
    }
  }
})
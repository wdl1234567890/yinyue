let app = getApp()
let Store = require('../../../common/utils/store/store.js')
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
    },
    singListDatas:{
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
    musicplayitemchange(e){
      this.triggerEvent('musicplayitemchange', e.detail)
    },
    
    goToBatch(e){
      app.globalData.searchResult=this.data.singDatas
      wx.navigateTo({
        url: '/subpackages-search/pages/batch-action-page/batch-action-page'
      })
    },
    playAllSong(e){
      //将搜索结果全部加入当前播放歌单列表
      Store.setMusicList(this.data.singDatas)
      //开始播放第一首
      wx.navigateTo({
        url: '/subpackages-music/pages/music-play/music-play?id=' + this.data.singDatas[0].id
      })
    }
  }
})

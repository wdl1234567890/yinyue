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
    // tapSwitch(e){
    //   this.triggerEvent('tapswitch', e.currentTarget.dataset.index)
    // },
    // async tapPlayMusic(e){
    //   let index = e.currentTarget.dataset.index
    //   // Store.setCurrentMusic(this.data.singDatas[index])
    //   let musicList = await Store.getCurrentMusicList()
    //   let isInclude = false
    //   for (let i = 0; i < musicList.length;i++){
    //     if (musicList[i].id == this.data.singDatas[index].id){
    //       isInclude=true
    //       break
    //     }
    //   }
    //   if (!isInclude){
    //     musicList.unshift(this.data.singDatas[index])
    //     Store.setMusicList(musicList)
    //     // Store.setCurrentPlayStatus(true)
    //   }
    //   // app.globalData.playMusicById(this.data.singDatas[index].id)
    //   wx.navigateTo({
    //     url: '/subpackages-music/pages/music-play/music-play?id=' + this.data.singDatas[index].id
    //   })
    //   this.triggerEvent('tapplaymusic')
    // },
    goToBatch(e){
      app.globalData.searchResult=this.data.singDatas
      wx.navigateTo({
        url: '/subpackages-search/pages/batch-action-page/batch-action-page'
      })
    },
    tapToDetail(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/subpackages-song-list/pages/song-list-detail/song-list-detail?id='+id
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

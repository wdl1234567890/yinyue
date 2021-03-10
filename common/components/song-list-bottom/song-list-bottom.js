// common/components/song-list-bottom/song-list-bottom.js
let app = getApp()
let Store = require('../../utils/store/store.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSingListModal: {
      type: Boolean,
      value: false
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
    musicList: [],
    showCollectAction: false
  },
  // observers: {
  //   'showSingListModal': function (newValue) {   
  //     this.setData({
        
  //     })
  //   }
  // },
  async ready(e) {
    this.setData({
      musicList: await Store.getCurrentMusicList(),
      musicInfo: await Store.getCurrentPlayMusic(),
      showCollectAction: await Store.getMusicListIsCollectionAll()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal(e) {
      this.setData({
        showSingListModal: false
      })
      this.triggerEvent('hidemodal')
    },
    async musicListCollectAllChange(e) {
      this.setData({
        musicListDatas:await Store.getCurrentMusicList(),
        showSingListModal:false,
        showCollectAction: true
      })
    },
    clearAllStorage(){
      // clearInterval(await Store.getStopIntervalNumber())
      // Store.setStopIntervalNumber(null)
      app.globalData.stopPlayMusic()
      // Store.clearCurrentMusicList()
      // Store.clearCurrentMusic()
      // Store.setCurrentPlayTime(0)
      this.setData({
        musicList: [],
        musicInfo: {},
        showCollectAction: false,
        showSingListModal: false
      })
      this.triggerEvent('hidemodal')
      this.triggerEvent('musicplayitemchange', null)
      this.triggerEvent('musiclistchange', null)
    },
    removeAllListItem(e) {
      if(this.data.musicList.length == 0)return
      let that = this
      wx.showModal({
        title: '确定要清空播放列表？',
        confirmText: '清空',
        success(res) {
          if (res.confirm) {
            that.clearAllStorage()
          }
        }
      })

    },
    async removeListItem(e) {

      if(this.data.musicList.length==1){
        this.clearAllStorage()
      }else{
        let index = e.currentTarget.dataset.index

        let musicList = this.data.musicList
        if (musicList.length <= 0) return

        if (musicList[index].id == this.data.musicInfo.id) {
          let nextIndex = -1
          let loopStatusIndex = app.globalData.loopStatusIndex
          let currentPlayIndex = await Store.getCurrentPlayMusicIndex()
          if (loopStatusIndex == 2) {
            while ((nextIndex = Math.floor(Math.random() * musicList.length)) == currentPlayIndex) { }
          } else {
            nextIndex = index + 1 >= musicList.length ? 0 : index + 1
          }
          this.setData({
            musicInfo: musicList[nextIndex]
          })
          // Store.setCurrentMusic(musicList[nextIndex])
          app.globalData.playMusicById(musicList[nextIndex].id)
          this.triggerEvent('musicplayitemchange', musicList[nextIndex].id)
        }

        musicList.splice(index, 1);
        this.setData({
          musicList
        })
        Store.setMusicList(musicList)
        this.triggerEvent('musiclistchange',null)
        // if (musicList.length == 0) {
        //   clearInterval(this.data.stopIntervalNum)
        //   this.setData({
        //     showSingListModal: false
        //   })
        //   this.triggerEvent('hidemodal')
        // }
      }
      
    },
    tapPlay(e) {
      let index = e.currentTarget.dataset.index
      let item = this.data.musicList[index]
      // Store.setCurrentMusic(item)
      app.globalData.playMusicById(item.id)
      this.triggerEvent('hidemodal')
      this.triggerEvent('musicplayitemchange', item.id)
      // this.musicPlayItemChange(item.id)
      this.setData({
        showSingListModal: false
      })

    },
    // findCurrentMusicIndex() {
    //   let musicList = this.data.musicList
    //   let currentPlayId = this.data.musicInfo.id
    //   let currentPlayIndex = -1
    //   for (let i = 0; i < musicList.length; i++) {
    //     if (musicList[i].id == currentPlayId) {
    //       currentPlayIndex = i
    //       break
    //     }
    //   }
    //   return currentPlayIndex
    // },
  }
})

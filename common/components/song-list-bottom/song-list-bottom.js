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
  },

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    musicList: [],
    musicInfo: {},
    isCollectAll: false
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
      isCollectAll: await Store.getMusicListIsCollectionAll()
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
    musicListCollectAllChange(e) {
      this.setData({
        isCollectAll: !this.data.isCollectAll
      })
    },
    removeAllListItem(e) {
      if(this.data.musicList.length == 0)return
      let that = this
      wx.showModal({
        title: '确定要清空播放列表？',
        confirmText: '清空',
        success(res) {
          if (res.confirm) {
            clearInterval(that.data.stopIntervalNum)
            that.setData({
              musicList: [],
              isCollectAll: false,
              showSingListModal: false
            })
            Store.clearCurrentMusicList()
          }
        }
      })

    },
    async removeListItem(e) {

      if(this.data.musicList.length==1){
        Store.clearCurrentMusicList()
        Store.clearCurrentMusic()
        clearInterval(this.data.stopIntervalNum)
        this.setData({
          showSingListModal: false,
          musicInfo:{},
          musicList:[]
        })
        this.triggerEvent('musicplayitemchange',null)
      }else{
        let index = e.currentTarget.dataset.index

        let musicList = this.data.musicList
        if (musicList.length <= 0) return

        if (musicList[index].id == this.data.musicInfo.id) {
          let nextIndex = -1
          let loopStatusIndex = await Store.getLoopStatusIndex()
          if (loopStatusIndex == 2) {
            nextIndex = this.randomMusicListIndex()
          } else {
            nextIndex = index + 1 >= musicList.length ? 0 : index + 1
          }
          this.triggerEvent('musicplayitemchange', musicList[nextIndex].id)
          this.setData({
            musicInfo: musicList[nextIndex]
          })
          Store.setCurrentMusic(musicList[nextIndex])
        }

        musicList.splice(index, 1);
        this.setData({
          musicList
        })
        Store.setMusicList(musicList)

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
      this.musicPlayItemChange(item.id)
      this.setData({
        showSingListModal: false
      })

    },
    randomMusicListIndex() {
      let musicList = this.data.musicList
      let currentPlayId = this.data.musicInfo.id
      let currentPlayIndex = -1
      for (let i = 0; i < musicList.length; i++) {
        if (musicList[i].id == currentPlayId) {
          currentPlayIndex = i
          break
        }
      }
      return currentPlayIndex
    },
  }
})

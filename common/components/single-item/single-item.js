// subpackages-search/components/single-item/single-item.js
let app=getApp()
let Store = require('../../../common/utils/store/store.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemId:{
      type:Number,
      value:-1
    },
    singName:{
      type:String,
      value:"歌名"
    },
    singerName:{
      type:String,
      value:"歌手"
    },
    isVip:{
      type:Boolean,
      value:false
    },
    cover:{
      type:String,
      value:""
    },
    commentCount:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showActionModal: false,
    showSongListAction:false,
    musicInfo:{},
    actions: [
      {
        id: 1,
        icon: 'camera',
        text: '播放',
      },
      {
        id: 2,
        icon: 'camera',
        text: '下一首播放',
      },
      {
        id: 3,
        icon: 'camera',
        text: '收藏到歌单',
      },
      {
        id: 4,
        icon: 'camera',
        text: '下载',
      },
      {
        id: 5,
        icon: 'camera',
        text: '评论',
      }
    ]
  },

  ready(){
    let musicInfo = { id: this.data.itemId, cover: this.data.cover, singName: this.data.singName, singerName: this.data.singerName, isVip: this.data.isVip, commentCount:this.data.commentCount }
    this.setData({
      musicInfo
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal(e) {
      this.setData({
        showActionModal: false
      })
    },
    tapSwitch(e){
      this.setData({
        showActionModal: true
      })
      this.triggerEvent('tapswitch',this.data.itemId)
    },
    async tapPlay(e){
      let musicList = await Store.getCurrentMusicList()
      let isInclude = false
      for (let i = 0; i < musicList.length; i++) {
        if (musicList[i].id == this.data.itemId) {
          isInclude = true
          break
        }
      }
      if (!isInclude) {
        
        musicList.unshift(this.data.musicInfo)
        Store.setMusicList(musicList)
        // Store.setCurrentPlayStatus(true)
      }
      // app.globalData.playMusicById(this.data.singDatas[index].id)
      wx.navigateTo({
        url: '/subpackages-music/pages/music-play/music-play?id=' + this.data.itemId
      })
      this.triggerEvent('musicplayitemchange', this.data.musicInfo)
    },
    async tapPlayButton() {
      // this.setData({
      //   musicInfo: this.data.musicInfo
      // })


      let musicList = await Store.getCurrentMusicList()
      let isInclude = false
      for (let i = 0; i < musicList.length; i++) {
        if (musicList[i].id == this.data.itemId) {
          isInclude = true
          break
        }
      }
      if (!isInclude) {
        musicList.unshift(this.data.musicInfo)
        Store.setMusicList(musicList)
      }

      wx.navigateTo({
        url: '/subpackages-music/pages/music-play/music-play?id=' + this.data.itemId
      })
      this.triggerEvent('musicplayitemchange', this.data.musicInfo)
    },
    nextPlay() {
      
      app.globalData.nextPlay(this.data.musicInfo, () => {
        //关闭弹框
        this.setData({
          showActionModal: false
        })
      }, () => {
        this.triggerEvent('musicplayitemchange', this.data.musicInfo)
      }, null, this, true)

    },
    async collectionToList(e) {
      this.setData({
        showActionModal: false,
        showSongListAction: true
      })
    },
    downMusic() {
      //TODO user is vip?
      if (this.data.isVip) {
        wx.showModal({
          title: '该曲需要开通vip才能下载哦',
          confirmText: '立即开通',
          cancelText: '暂不开通',
          confirmColor: this.data.themeColor,
          success(res) {
            if (res.confirm) {
              wx.navigateTo({ url: '/subpackages-payment/pages/payment/payment' })
            }
          }
        })
      }
    },
    tapAction(e) {
      let index = e.currentTarget.dataset.index
      switch (this.data.actions[index].text) {
        case "播放":
          this.tapPlayButton()
          break
        case "下一首播放":
          this.nextPlay()
          break
        case "收藏到歌单":
          this.collectionToList()
          break
        case "下载":
          this.downMusic()
          break
        case "评论":
          wx.navigateTo({
            url: '/subpackages-comment/pages/comment/comment?id=' + this.data.itemId
          })
          break
        default:
          break
      }
    }
  }
})

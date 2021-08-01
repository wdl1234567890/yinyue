// subpackages-search/components/single-item/single-item.js
let app=getApp()
let Store = require('../../../common/utils/store/store.js')
let { httpPutWithToken, httpGet, httpPost, httpGetWithToken  } = require('../../../network/httpClient.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag:{
      type:Number,
      value:2
    },
    itemId:{
      type:String,
      value:-1
    },
    songName:{
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
    },
    url:{
      type:String,
      value:''
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
        icon: 'playon',
        text: '播放',
      },
      {
        id: 2,
        icon: 'play',
        text: '下一首播放',
      },
      {
        id: 3,
        icon: 'collection',
        text: '收藏到歌单',
      },
      {
        id: 4,
        icon: 'unfold',
        text: '下载',
      },
      {
        id: 5,
        icon: 'message',
        text: '评论',
      }
    ]
  },

  ready(){
    let musicInfo = { id: this.data.itemId, cover: this.data.cover, songName: this.data.songName, singerName: this.data.singerName, isVip: this.data.isVip, commentCount:this.data.commentCount,url:this.data.url }
    this.setData({
      musicInfo
    })

    if(this.data.flag==1){
      this.data.actions.push({
        id: 5,
        icon: 'trash',
        text: '删除'
      })
      this.setData({
        actions: this.data.actions
      })
    }
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
    tapPlay(e){
      Store.getCurrentMusicList().then(res=>{
        let musicList = res
        let isInclude = false
        for (let i = 0; i < musicList.length; i++) {
          if (musicList[i].id == this.data.itemId) {
            isInclude = true
            break
          }
        }
        if (!isInclude) {
          musicList.unshift(this.data.musicInfo)
          Store.setMusicList(musicList).then(res=>{

          })
        }
        Store.setCurrentMusic(this.data.musicInfo).then(res => {
          wx.navigateTo({
            url: '/subpackages-music/pages/music-play/music-play?id=' + this.data.itemId
          })
          this.triggerEvent('musicplayitemchange', this.data.musicInfo)
        })
        
      })
    },
    tapPlayButton() {

      Store.getCurrentMusicList().then(res=>{
        let musicList = res
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

        Store.setCurrentMusic(this.data.musicInfo).then(res => {
          wx.navigateTo({
            url: '/subpackages-music/pages/music-play/music-play?id=' + this.data.itemId
          })
          this.triggerEvent('musicplayitemchange', this.data.musicInfo)
        })


      })
      
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
    collectionToList(e) {
      this.setData({
        showActionModal: false,
        showSongListAction: true
      })
    },
    downMusic() {
      let that = this
      httpGetWithToken('user-service//user/info').then(userInfo => {
        // if(userInfo=='')return
        if (that.data.isVip && !userInfo.isVip) {
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
        else {
          console.log(that.data)
          let downloadObj = wx.downloadFile({
            url: that.data.url,
            success(res) {
              if (res.statusCode === 200) {
                let tempFilePath = res.tempFilePath
                let downLoadMusicInfo = {
                  url: tempFilePath,
                  songName: that.data.musicInfo.songName,
                  singerName: that.data.musicInfo.singerName
                }
                Store.addDownloadMusic(downLoadMusicInfo).then(res => {
                  wx.showToast({
                    title: that.data.musicInfo.songName + '-' + that.data.musicInfo.singerName+' 下载完成',
                    icon: 'none'
                  })
                  // httpPuttWithToken('recommend-service//recommend/action/download/song/' + that.data.itemId + '/score')
                })
              }
            },
            fail(res) {
              wx.showToast({
                title: that.data.musicInfo.songName + '-' + that.data.musicInfo.singerName +' 下载失败',
                icon: 'none'
              })
            }
          })
          downloadObj.onProgressUpdate((res) => {
            let progress = res.progress
            let totalBytes = res.totalBytesExpectedToWrite
            if (progress == 0) wx.showToast({
              title: that.data.musicInfo.songName + '-' + that.data.musicInfo.singerName +' 开始下载',
              icon: 'none'
            })
          })
        }
      })

    },
    tapAction(e) {
      let index = e.currentTarget.dataset.index
      switch (this.data.actions[index].text) {
        case "播放":
          httpPuttWithToken('recommend-service//recommend/action/play/song/' + this.data.itemId + '/score/withtoken')
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
        case "删除":
          let that = this
          wx.showModal({
            title: '删除歌曲',
            content: '是否要删除：'+ this.data.musicInfo.songName,
            success(res){
              if(res.confirm){
                that.setData({
                  showActionModal:false
                })
                that.triggerEvent('removemusic', that.data.musicInfo.id)
              }
            }
          })
          break
        default:
          break
      }
    }
  }
})

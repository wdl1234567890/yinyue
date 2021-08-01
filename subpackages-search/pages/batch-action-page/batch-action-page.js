// subpackages-search/pages/batch-action-page/batch-action-page.js
let app = getApp()
let Const = require('../../../common/utils/const.js')
let Store = require('../../../common/utils/store/store.js')
let { httpPutWithToken, httpGetWithToken, httpGet, httpPost } = require('../../../network/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    songDatas:[],
    checkedIds:[],
    showSongListAction:false,
    musicInfos:[],
    themeColor: app.globalData.themeColor,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    if(id){
      Store.getObjectById(Const.SELF_SONG_LIST,id).then(res=>{
        this.setData({
          musicListInfo:res
        })
      })
    }
    this.setData({
      id,
      flag: options.flag ?options.flag:0,
      songDatas: app.globalData.searchResult
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  allChecked(e){
    let checkedIds = []
    if (this.data.checkedIds.length!=this.data.songDatas.length){
      checkedIds = this.data.songDatas.map(e => {
        return e.id
      })
    }
    
    this.setData({
      checkedIds,
      isAllChecked:!this.data.isAllChecked
    })
  },
  getContentHeight(e) {
    this.setData({
      contentHeight: e.detail
    })
  },
  addNextSong(infos,index,isFirst){

    app.globalData.nextPlay(infos[index], null, null,res=>{
      console.log(res)
      if(index!=infos.length-1){
        this.addNextSong(infos, index + 1, isFirst)
      }else{
        //提示
        wx.showToast({
          title: '已全部添加到下一首播放',
          icon: 'none'
        })

        if (isFirst) {
          wx.navigateTo({
            url: '/subpackages-music/pages/music-play/music-play?id=' + res.id
          })
        }
      }
    },this,false)
  },
  tapAddNextSong(e){
    if (!this.checkIsHasChecked()) return
    let currentPlayMusic =  {}
    let index = 0
    let musicInfos = this.data.songDatas.reverse().filter(e => {
      if (this.data.checkedIds.indexOf(e.id) != -1) return true
      return false
    })
    //获取当前播放歌曲
    Store.getCurrentPlayMusic().then(res=>{
      currentPlayMusic = res
      this.addNextSong(musicInfos, index, Object.keys(currentPlayMusic).length == 0)
    })
    // let currentPlayMusic = await Store.getCurrentPlayMusic()
  
    
  },
  checkIsHasChecked(){
    if (this.data.checkedIds.length == 0) {
      wx.showToast({
        title: '还没有选择歌曲！',
        icon: 'none'
      })
      return false;
    }
    return true
  },
  tapAddToSongList(e){
    
    if (!this.checkIsHasChecked())return

    let musicInfos = this.data.songDatas.filter(e=>{
      if(this.data.checkedIds.indexOf(e.id)!=-1)return true
      return false
    })
    this.setData({
      musicInfos,
      showSongListAction:true
    })
  },
  tapDownload(e){
    let that = this
    if (!this.checkIsHasChecked()) return
    // httpGetWithToken('user-service//user/info').then(userInfo => {
    //   return Promise.resolve(userInfo)
    // }).then(userInfo=>{
    //   if (userInfo != ''){
        httpGetWithToken('user-service/user/info').then(userInfo => {
          if (userInfo == '')return
          let isHasVip = that.data.songDatas.find(e => {
            if (that.data.checkedIds.indexOf(e.id) != -1 && e.isVip) return true
            return false
          })
          if (isHasVip && !userInfo.isVip) {
            wx.showModal({
              title: "购买VIP",
              content: '包含VIP歌曲，是否购买VIP?',
              confirmText: "购买VIP",
              confirmColor: that.data.themeColor,
              success(e) {
                if (e.confirm) {
                  wx.navigateTo({ url: '/subpackages-payment/pages/payment/payment' })
                }
              }
            })
          } else {
            that.data.checkedIds.forEach(checkedId => {
              let item = that.data.songDatas.find(songData => songData.id == checkedId)
              let downloadObj = wx.downloadFile({
                url: item.url,
                success(res) {
                  console.log(res)
                  if (res.statusCode === 200) {
                    let tempFilePath = res.tempFilePath
                    let downLoadMusicInfo = {
                      url: tempFilePath,
                      songName: item.songName,
                      singerName: item.singerName
                    }
                    Store.addDownloadMusic(downLoadMusicInfo).then(res => {
                      wx.showToast({
                        title: item.songName + '-' + item.singerName+' 下载完成',
                        icon: 'none'
                      })
                      httpPuttWithToken('recommend-service//recommend/action/download/song/' + that.data.musicInfo.id + '/score')
                    })
                  }
                },
                fail(res) {
                  console.log(res)
                  wx.showToast({
                    title: item.songName + '-' + item.singerName +' 下载失败',
                    icon: 'none'
                  })
                }
              })
              downloadObj.onProgressUpdate((res) => {
                let progress = res.progress
                let totalBytes = res.totalBytesExpectedToWrite
                if (progress == 0) wx.showToast({
                  title: item.songName + '-' + item.singerName +' 开始下载',
                  icon: 'none'
                })
              })

            })

          }
        })
    //   }
     
    // })
    
  },
  handleCheckChange(e){
    
    let checked = e.detail.checked
    let id = e.detail.id
    let checkedIds = this.data.checkedIds
    if(checked){
      checkedIds.push(id)
    }else{
      checkedIds.splice(checkedIds.indexOf(id),1)
    }
    this.setData({
      checkedIds
    })
  },
  tapRemove(e){
    if (!this.checkIsHasChecked()) return
    let that = this
    wx.showModal({
      title: '删除歌曲',
      content: '确定要删除所选歌曲吗?',
      success(res){
        if(res.confirm){
          let songDatas = that.data.songDatas.filter(e => {
            if (that.data.checkedIds.indexOf(e.id) != -1) return false
            return true
          })
          that.setData({
            songDatas
          })
          that.data.musicListInfo.list = songDatas
          Store.updateMyMusicList(that.data.musicListInfo).then(res => {
            wx.showToast({
              title: '删除成功！',
              icon: 'none'
            })
          }).catch(res => {
            wx.showToast({
              title: '删除失败！',
              icon: 'none'
            })
          })
        }
      }
    })
  }
})
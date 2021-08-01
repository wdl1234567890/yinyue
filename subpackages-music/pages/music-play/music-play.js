// subpackages-music/pages/music-play/music-play.js
const app = getApp()
let func = require('../../../common/utils/func/wxml-element.js')
const ctx1 = wx.createCanvasContext('circular-play-cd')
let Store = require('../../../common/utils/store/store.js')
let { httpGetWithToken, httpGet, httpPost, httpPutWithToken } = require('../../../network/httpClient.js')
let funcUtils = require('../../../common/utils/func/func-utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    musicListData: [
    ],
    musicInfo:{
      id:-1,
      songName:'歌名',
      singerName:'歌手'
    },
    lyric:
    `
    Hey, what'cha doin' to me babe?
嘿 你对我做了什么
I'm really feeing your swag...
我被你迷得神魂颠倒
You got me twisted like that.
你让我不受控制
Now, I'm smoking on your vibes
居然开始和你一起吞云吐雾
Got me straight hittin' the floor
让我跌落低谷
But got me flyin' so high.
却让人如此沉沦
You're so sweet, to me
你可真诱人啊
You're my sticky-icky-icky-icky-icky
我被你牢牢粘 粘 粘 粘住
put me fast asleep
你能让我安然入睡
You're so sweet, to me
你可真诱人啊
Got me higher-higher-higher than I've ever been
从来没有如此快 快 快乐
Don't ever leave,
别离我而去
What'cha doin' to me?
你对我做了什么
While you watch me put on a show
当你欣赏我的表演
Sit let's flip the role
我们角色对换
I'll have you losing control.
我也让你情不自已
I'll grind you down and light you up
我会让你臣服于我的光芒
next thing you know, won't know what's up
接下来做什么 这是个秘密
That's how it goes,
那开始吧
Got that? Good, now watch it grow.
懂了吗 很好 那好好看着
You're so sweet, to me
你可真诱人啊
You're my sticky-icky-icky-icky-icky
我被你牢牢粘 粘 粘 粘住
put me fast asleep
你能让我安然入睡
You're so sweet, to me
你可真诱人啊
Got me higher-higher-higher than I've ever been
从来没有如此快 快 快乐
Don't ever leave,
别离我而去
What'cha doin' to me?
你对我做了什么
    `,
    currentPlayTime:-1,
    stopIntervalNum:null,
    themeColor: app.globalData.themeColor,
    showSingListModal: false,
    perSecondProgress:0,
    windowHeight:app.globalData.systemInfo.windowHeight,
    windowWidth: app.globalData.systemInfo.windowWidth,
    showLyric:false,
    likeStatus:false,
    loopStatus: ["/static/images/music-play/loop.png", "/static/images/music-play/singlecycle.png","/static/images/music-play/random.png"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.onPause()
    this.onPlay()
    let that = this
    let musicId = options.id
    console.log(musicId)
    let musicList = []
    let musicInfo = {}
    // let currentPlayTime = app.globalData.currentPlayTime
    let loopStatusIndex = app.globalData.loopStatusIndex
    func.getElementHeight(this, '#canvas').then(playCdSize => {
      //计算每秒钟的进度
      let progressRadius=playCdSize/2-3
      let progressLength = 2 * Math.PI * progressRadius
      
      // this.calPerSecondProgressAndGetLyric()
      // app.globalData.doSomething = this.drawPlayProgress
      app.globalData.obj = this
      app.globalData.endSomething = this.calPerSecondProgressAndGetLyric

      Promise.all([Store.getCurrentMusicList(), Store.getCurrentPlayMusic()]).then(res=>{
        musicList = res[0]
        musicInfo = res[1]
        this.setData({
          // currentPlayTime,
          musicList,
          loopStatusIndex,
          radius: playCdSize / 2,
          progressRadius,
          progressLength
        })
        
        if (musicId != -1) {
          console.log(app.globalData.backgroundAudioManager.duration)
          app.globalData.playMusicById(musicId)
          this.onMusicTimeUpdate()
          let perSecondProgress = progressLength / musicInfo.songTime
          let playStatus = !app.globalData.backgroundAudioManager.paused
          this.setData({
            songTime: musicInfo.songTime,
            musicInfo,
            perSecondProgress,
            playStatus
          })
        }
        else {
          let perSecondProgress = progressLength / musicInfo.songTime
          let playStatus = !app.globalData.backgroundAudioManager.paused
          console.log(app.globalData.backgroundAudioManager.duration)
          this.setData({
            songTime: musicInfo.songTime,
            musicInfo,
            perSecondProgress,
            playStatus
          })
          this.onMusicTimeUpdate()
        }
        this.setLikeStatus()
      })
    })
    app.globalData.backgroundAudioManager.onCanplay(res=>{
      let songTime = musicInfo.songTime
      let perSecondProgress = that.data.progressLength / songTime
      that.setData({
        perSecondProgress,
        songTime
      })
    })
  },

  onShow(){
    let playStatus = !app.globalData.backgroundAudioManager.paused
    this.setData({ 
      playStatus
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    app.globalData.doSomething = null
    app.globalData.obj = null
    app.globalData.endSomething = null
    this.cancelOnTimeUpdate()
    this.cancelOnPlay()
    this.cancelOnPause()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onPause(){
    app.globalData.backgroundAudioManager.onPause(()=>{
      this.setData({
        playStatus:false
      })
    })
  },

  onPlay() {
    app.globalData.backgroundAudioManager.onPlay(() => {
      this.setData({
        playStatus: true
      })
    })
  },


  //计算并绘制当前播放进度条
  drawPlayProgress(){
    if(this.data.currentPlayTime==-1){
      this.setData({
        currentPlayTime:0
      })
      return
    }
    let playStatus = !app.globalData.backgroundAudioManager.paused
    let currentPlayTime = this.data.currentPlayTime
    this.setData({
      playStatus,
    })
    if (currentPlayTime == 0) return
    //当前进度条弧长
    let currentProgressLength = currentPlayTime * this.data.perSecondProgress
    //计算进度条当前弧长的两倍与周长的比值(0~2)
    let deg = currentProgressLength*2/ this.data.progressLength
    //由于是以三点钟方向为0度，故这里在绘制时的真实弧度需要减去90
    let drawDeg = deg - 0.5
    if (drawDeg < 0) drawDeg = 2 + drawDeg
    if (drawDeg > 1.4999999 && drawDeg <=1.5)drawDeg=1.4999999

    //计算弧度
    let radius = this.data.radius
    let hudu = (currentProgressLength - this.data.progressLength*(1/4)) / radius
   //计算小圆点的x和y坐标
    let yuanX = radius + (radius-4)*Math.cos(hudu)
    let yuanY = radius + (radius-4) * Math.sin(hudu)

    //开始绘制
    this.drawPlayCd(drawDeg, yuanX, yuanY)

  },


  drawPlayCd(endPoint,yuanX,yuanY) {
    let radius = this.data.radius
    let playCdSize = radius * 2
    this.clearAndDrawBackground()

    //绘制进度条
    ctx1.beginPath()
    ctx1.setGlobalAlpha(1)
    ctx1.setLineWidth(3)
    ctx1.setStrokeStyle("#df537a")
    ctx1.arc(radius, radius, radius - 4, 1.5 * Math.PI, endPoint  * Math.PI)
    ctx1.stroke()
    ctx1.setLineWidth(0)
    ctx1.draw(true)

    //绘制末端圆点
    ctx1.beginPath()
    ctx1.setFillStyle("#df537a")
    ctx1.arc(yuanX, yuanY, 4, 0, 2 * Math.PI)
    ctx1.fill()

    ctx1.draw(true)
  
  },
  clearAndDrawBackground(){
    let radius = this.data.radius
    let playCdSize = radius * 2
    //清空画布
    ctx1.clearRect(0, 0, playCdSize, playCdSize)
    //绘制背景圆
    ctx1.beginPath()
    ctx1.setGlobalAlpha(0.3)
    ctx1.arc(radius, radius, radius - 4, 0, 2 * Math.PI)
    ctx1.setLineWidth(3)
    ctx1.setStrokeStyle(app.globalData.themeColor)
    ctx1.stroke()
    ctx1.draw(true)
  },

  changeLyricStatus(e){
    this.setData({
      showLyric: !this.data.showLyric
    })
  },
  playChange(e){
    
    let playStatus = this.data.playStatus
    if (playStatus){
      app.globalData.pausePlayMusic()
    }else{
      app.globalData.playMusic()
    }
    
    playStatus = !playStatus
    this.setData({
      playStatus
    })

  },
  loopChange(e){
    let loopStatusIndex = this.data.loopStatusIndex+1
    if(loopStatusIndex > 2)loopStatusIndex=0
    this.setData({
      loopStatusIndex
    })
    app.globalData.loopStatusIndex=loopStatusIndex
  },
  likeChange(e){
    let that = this
    let likeStatus = this.data.likeStatus
    this.setData({
      likeStatus: !likeStatus
    })
    if (!likeStatus){
          Store.addMusicToSelfSongList(3, this.data.musicInfo).then(res => {
            Store.getToken(token => {
              if (token != '') {
                httpPutWithToken('recommend-service//recommend/action/collect/song/' + that.data.musicInfo.id + '/score')
              }
            })
          
           })
      
    }else{
          Store.removeMusicFromSelfSongList(3, this.data.musicInfo.id).then(res => {
            Store.getToken(token => {
              if (token != '') {
                httpPutWithToken('recommend-service//recommend/cancelAction/collect/song/' + that.data.musicInfo.id + '/score')
              }
            })
            
          })
      
    }

  },
  commentDetail(e){
    wx.navigateTo({
      url: '/subpackages-comment/pages/comment/comment?id='+this.data.musicInfo.id
    })
  },
  hideModal(e) {
    this.setData({
      showSingListModal: false
    })
  },
  musicListChange(e){
    Store.getCurrentMusicList().then(res=>{
      let musicList = res
      if (musicList.length == 0) {
        wx.navigateBack()
        return
      }
      this.setData({
        musicList
      })
    })
    
  },
  showModal(e) {
    this.setData({
      showSingListModal: true
    })
  },
  nextSong(e){    

    app.globalData.nextSong()
    // Store.getCurrentMusicList().then(res=>{
    //   if(res.length==1){
    //     this.clearAndDrawBackground()
    //     // app.globalData.currentPlayTime = -1
    //     this.setData({
    //       currentPlayTime: 0,
    //       songTime: app.globalData.backgroundAudioManager.duration
    //     })
    //     this.calPerSecondProgressAndGetLyric()
    //   }
    // })
    this.clearAndDrawBackground()
    this.setData({
      currentPlayTime: 0
      // songTime: app.globalData.backgroundAudioManager.duration
    })
    this.calPerSecondProgressAndGetLyric()
  },
  preSong(e){
    // app.globalData.currentPlayTime = -1
    app.globalData.preSong()
    // Store.getCurrentMusicList().then(res=>{
    //   if(res.length==1){
    //     this.clearAndDrawBackground()
    //     // app.globalData.currentPlayTime = -1
    //     this.setData({
    //       currentPlayTime: 0,
    //       songTime: app.globalData.backgroundAudioManager.duration
    //     })
    //     this.calPerSecondProgressAndGetLyric()
    //   }
    // })
    this.clearAndDrawBackground()
    // app.globalData.currentPlayTime = -1
    this.setData({
      currentPlayTime: 0
      // songTime: app.globalData.backgroundAudioManager.duration
    })
    this.calPerSecondProgressAndGetLyric()
  },
  
  musicPlayItemChangeInner(e){
    if(e!=null && e.detail!=null){
      Store.getCurrentPlayMusic().then(res=>{
        let musicInfo = res
        this.setData({
          musicInfo
        })
        this.setLikeStatus()
        console.log("((((")
        console.log(musicInfo)
        app.globalData.playMusicById(musicInfo.id)
      })
      Store.getToken(token=>{
        if (token=='')return
        httpPutWithToken('recommend-service//recommend/action/play/song/' + this.data.musicInfo.id + '/score')
      })
    }
    
  },

  setLikeStatus(){
    Store.isLike(this.data.musicInfo.id).then(res=>{
      this.setData({
        likeStatus: res
      })
    })
  },

  downMusic(e){
    //TODO user is vip?
    let that = this
    httpGetWithToken('user-service//user/info').then(userInfo=>{
      if(userInfo == '')return
      if (that.data.musicInfo.isVip && !userInfo.isVip) {
        wx.showModal({
          title: '该曲需要开通vip才能下载哦',
          confirmText: '立即开通',
          cancelText: '暂不开通',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({ url: '/subpackages-payment/pages/payment/payment' })
            }

          }
        })
      }
       else{
        let downloadObj = wx.downloadFile({
          url: that.data.musicInfo.url,
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
                httpPutWithToken('recommend-service//recommend/action/download/song/'+that.data.musicInfo.id+'/score')
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
  tapShare(e){
    httpPutWithToken('recommend-service//recommend/action/share/song/' + this.data.musicInfo.id + '/score')
  },
  
 calPerSecondProgressAndGetLyric(){
    let musicInfo = []
   Store.getCurrentPlayMusic().then(res=>{
     musicInfo = res
     let perSecondProgress = this.data.progressLength / musicInfo.songTime
     let playStatus = !app.globalData.backgroundAudioManager.paused
     this.clearAndDrawBackground()
     this.setData({
       musicInfo,
       perSecondProgress,
       playStatus
     })

     this.setLikeStatus()
   })
   
  },
  onMusicTimeUpdate(){
    
    let callback = ()=>{
      // if (musicInfo.songTime != app.globalData.backgroundAudioManager.duration) {
      //   this.data.musicInfo.songTime = musicInfo.songTime
      //   this.setData({ musicInfo: this.data.musicInfo })
      // }
      this.setData({
        currentPlayTime: parseInt(app.globalData.backgroundAudioManager.currentTime)
      })
      this.drawPlayProgress()
    }
    let throttle = funcUtils.throttle(callback, this, 1000)
    callback()
    app.globalData.backgroundAudioManager.onTimeUpdate(() => {
      throttle()
    })
  },
  cancelOnTimeUpdate(){
    app.globalData.backgroundAudioManager.onTimeUpdate(()=>{})
  },
  cancelOnPlay(){
    app.globalData.backgroundAudioManager.onPlay(() => { })
  },
  cancelOnPause() {
    app.globalData.backgroundAudioManager.onPause(() => { })
  }
})
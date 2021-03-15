// subpackages-music/pages/music-play/music-play.js
const app = getApp()
let func = require('../../../common/utils/func/wxml-element.js')
const ctx1 = wx.createCanvasContext('circular-play-cd')
let Store = require('../../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    musicListData: [
      {
        id: 1,
        singName: '我在赶去找你的路上',
        singerName: '小时姑娘',
        singTime: 240,
        lyric: '我在赶去找你的路上 - 小时姑娘\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 1000,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        isVip:true
      },
      {
        id: 2,
        singName: '歌曲2',
        singerName: '歌手2',
        isVip: true,
        singTime: 260,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        lyric: '歌曲2 - 歌手2\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 900,
        isVip: true
      },
      {
        id: 3,
        singName: '歌曲3',
        singerName: '歌手3',
        isVip: false,
        singTime: 100,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        lyric: '歌曲3 - 歌手3\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 10,
        isVip: false
      },
      {
        id: 4,
        singName: '歌曲4',
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        singerName: '歌手4',
        isVip: false,
        singTime: 190,
        lyric: '歌曲4 - 歌手4\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 1000,
        isVip: false
      },
      {
        id: 5,
        singName: '歌曲5',
        singerName: '歌手5',
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        isVip: true,
        singTime: 244,
        lyric: '歌曲5 - 歌手5\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 104,
        isVip: true
      },
      {
        id: 6,
        singName: '歌曲6',
        singerName: '歌手6',
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        isVip: false,
        singTime: 205,
        lyric: '歌曲6 - 歌手6\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 20,
        isVip: false,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
      },
      {
        id: 7,
        singName: '歌曲7',
        singerName: '歌手7',
        isVip: false,
        singTime: 220,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        lyric: '歌曲7 - 歌手7\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 195,
        isVip: false
      },
      {
        id: 8,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        singName: '歌曲8',
        singerName: '歌手8',
        isVip: false,
        singTime: 209,
        lyric: '歌曲8 - 歌手8\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 580,
        isVip: false
      },
      {
        id: 9,
        singName: '歌曲9',
        singerName: '歌手9',
        isVip: false,
        singTime: 120,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        lyric: '歌曲9 - 歌手9\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 1744,
        isVip: false
      }
    ],
    musicInfo:{
      id:-1,
      singName:'歌名',
      singerName:'歌手',
    },
    
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
    let musicId = options.id
    let musicList = []
    let musicInfo = {}
    let currentPlayTime = app.globalData.currentPlayTime
    let loopStatusIndex = app.globalData.loopStatusIndex
    func.getElementHeight(this, '#canvas').then(playCdSize => {
      //计算每秒钟的进度
      let progressRadius=playCdSize/2-3
      let progressLength = 2 * Math.PI * progressRadius
      
      this.calPerSecondProgress()
      app.globalData.doSomething = this.drawPlayProgress
      app.globalData.obj = this
      app.globalData.endSomething = this.calPerSecondProgress

      Promise.all([Store.getCurrentMusicList(), Store.getCurrentPlayMusic()]).then(res=>{
        musicList = res[0]
        musicInfo = res[1]
        this.setData({
          currentPlayTime,
          musicList,
          loopStatusIndex,
          radius: playCdSize / 2,
          progressRadius,
          progressLength
        })
        if (musicId != -1) {
          app.globalData.playMusicById(musicId)
        }
        else {

          let perSecondProgress = progressLength / musicInfo.singTime
          let playStatus = app.globalData.stopIntervalNumber != null
          this.setData({
            musicInfo,
            perSecondProgress,
            playStatus
          })
          this.drawPlayProgress()
        }
        this.setLikeStatus()
      })
    })
    
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    app.globalData.doSomething = null
    app.globalData.obj = null
    app.globalData.endSomething = null
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //计算并绘制当前播放进度条
  drawPlayProgress(){
    if(this.data.currentPlayTime==-1){
      this.setData({
        currentPlayTime:0
      })
      return
    }
    let playStatus = app.globalData.stopIntervalNumber != null
    let currentPlayTime = app.globalData.currentPlayTime
    this.setData({
      playStatus,
      currentPlayTime
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
    let likeStatus = this.data.likeStatus
    this.setData({
      likeStatus: !likeStatus
    })

    if (!likeStatus){
      Store.addMusicToSelfSongList(3, this.data.musicInfo)
    }else{
      Store.removeMusicFromSelfSongList(3, this.data.musicInfo.id)
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
    Store.getCurrentMusicList().then(res=>{
      if(res.length==1){
        this.clearAndDrawBackground()
        app.globalData.currentPlayTime = -1
        this.setData({
          currentPlayTime: 0
        })
      }
    })
  },
  preSong(e){
    app.globalData.currentPlayTime = -1
    app.globalData.preSong()
    Store.getCurrentMusicList().then(res=>{
      if(res.length==1){
        this.clearAndDrawBackground()
        app.globalData.currentPlayTime = -1
        this.setData({
          currentPlayTime: 0
        })
      }
    })
  },
  
  musicPlayItemChangeInner(e){
    if(e!=null && e.detail!=null){
      Store.getCurrentPlayMusic().then(res=>{
        let musicInfo = res
        this.setData({
          musicInfo
        })
        this.setLikeStatus()
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
    if (this.data.musicInfo.isVip) {
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
  },
 calPerSecondProgress(){
    let musicInfo = []
   Store.getCurrentPlayMusic().then(res=>{
     musicInfo = res
     let perSecondProgress = this.data.progressLength / musicInfo.singTime
     let playStatus = app.globalData.stopIntervalNumber != null
     this.clearAndDrawBackground()
     this.setData({
       musicInfo,
       perSecondProgress,
       playStatus
     })

     this.setLikeStatus()
   })
   
  },
  canvasTouchend(e){
    console.log(e)
  }
})
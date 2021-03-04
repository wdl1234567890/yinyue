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
        isVip:true
      },
      {
        id: 2,
        singName: '歌曲2',
        singerName: '歌手2',
        isVip: true,
        singTime: 260,
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
        lyric: '歌曲3 - 歌手3\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 10,
        isVip: false
      },
      {
        id: 4,
        singName: '歌曲4',
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
        isVip: false,
        singTime: 205,
        lyric: '歌曲6 - 歌手6\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 20,
        isVip: false
      },
      {
        id: 7,
        singName: '歌曲7',
        singerName: '歌手7',
        isVip: false,
        singTime: 220,
        lyric: '歌曲7 - 歌手7\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 195,
        isVip: false
      },
      {
        id: 8,
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
        lyric: '歌曲9 - 歌手9\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
        commentCount: 1744,
        isVip: false
      }
    ],

    // musicListInfo:{
    //   isCollectAll:true,
    //   musicList: [
    //     {
    //       id: 1,
    //       singName: '我在赶去找你的路上',
    //       singerName: '小时姑娘',
    //       isVip: true
    //     },
    //     {
    //       id: 2,
    //       singName: '歌曲2',
    //       singerName: '歌手2',
    //       isVip: true
    //     },
    //     {
    //       id: 3,
    //       singName: '歌曲3',
    //       singerName: '歌手3',
    //       isVip: false
    //     },
    //     {
    //       id: 4,
    //       singName: '歌曲4',
    //       singerName: '歌手4',
    //       isVip: false
    //     },
    //     {
    //       id: 5,
    //       singName: '歌曲5',
    //       singerName: '歌手5',
    //       isVip: true
    //     },
    //     {
    //       id: 6,
    //       singName: '歌曲6',
    //       singerName: '歌手6',
    //       isVip: false
    //     },
    //     {
    //       id: 7,
    //       singName: '歌曲7',
    //       singerName: '歌手7',
    //       isVip: false
    //     },
    //     {
    //       id: 8,
    //       singName: '歌曲8',
    //       singerName: '歌手8',
    //       isVip: false
    //     },
    //     {
    //       id: 9,
    //       singName: '歌曲9',
    //       singerName: '歌手9',
    //       isVip: false
    //     }
    //   ],
    // },
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
  async onLoad(options) {
    let musicId = options.id
    let currentTime = await Store.getCurrentPlayTime()
    let musicList = await Store.getCurrentMusicList()
    let loopStatusIndex = await Store.getLoopStatusIndex()
    // let playStatus = await Store.getStopIntervalNumber()!=null
    func.getElementHeight(this, '#canvas').then(playCdSize => {
      //计算每秒钟的进度
      let progressRadius=playCdSize/2-3
      let progressLength = 2 * Math.PI * progressRadius
      this.setData({
        currentTime,
        musicList,
        loopStatusIndex,
        // playStatus,
        radius : playCdSize / 2,
        progressRadius,
        progressLength
      })

      this.musicPlayItemChange(musicId,true)

    })
    //app.globalData.calPlayTime()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //播放音乐
  async playMusic(){
    if(await Store.getStopIntervalNumber()==null){
      app.globalData.calPlayTime()
      let that = this
      //控制进度条变化
      let stopIntervalNum = setInterval(async () => {
        if (that.data.musicInfo.singTime == await Store.getCurrentPlayTime()) {
          if (that.data.loopStatusIndex == 1) {
            that.musicPlayItemChange(that.data.musicInfo.id)
          } else {
            that.nextSong()
          }
          return
        }
        that.drawPlayProgress()
      }, 1000)

      this.setData({
        stopIntervalNum
      })
    }
    let playStatus = await Store.getStopIntervalNumber() != null
    this.setData({playStatus})
  },

  //计算并绘制当前播放进度条
  async drawPlayProgress(){
    let currentTime = await Store.getCurrentPlayTime()
    this.setData({
      currentTime
    })
    //当前进度条弧长
    let currentProgressLength = currentTime * this.data.perSecondProgress
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
  async playChange(e){
    let playStatus = this.data.playStatus
    if (playStatus){
      clearInterval(this.data.stopIntervalNum)
      let stopNumber = await Store.getStopIntervalNumber()
      if (stopNumber != null) clearInterval(stopNumber)
      Store.setStopIntervalNumber(null)
      this.setData({playStatus:false})
    }else{
      this.playMusic()
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
    Store.setLoopStatusIndex(loopStatusIndex)
  },
  likeChange(e){
    let likeStatus = this.data.likeStatus
    this.setData({
      likeStatus: !likeStatus
    })
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
  async musicListChange(e){
    let musicList = await Store.getCurrentMusicList()
    this.setData({
      musicList
    })
  },
  showModal(e) {
    this.setData({
      showSingListModal: true
    })
  },
  // musicListCollectAllChange(e){
  //   let musicListInfo = this.data.musicListInfo
  //   musicListInfo.isCollectAll = !musicListInfo.isCollectAll
  //   this.setData({
  //     musicListInfo
  //   })
  // },
  // removeListItem(e){
  //   let index = e.currentTarget.dataset.index
    
  //   let musicList = this.data.musicListInfo.musicList
  //   if (musicList.length<=0)return

  //   if (musicList[index].id == this.data.musicInfo.id){
  //     let nextIndex = -1
  //     if(this.data.loopStatusIndex==2){
  //       nextIndex = this.findCurrentMusicIndex()
  //     }else{
  //       nextIndex = index + 1 >= musicList.length?0:index+1
  //     }
  //     this.musicPlayItemChange(musicList[nextIndex].id)
  //   }
    
  //   let musicListInfo = this.data.musicListInfo
  //   musicList.splice(index,1);
  //   musicListInfo.musicList.musicList = musicList
  //   this.setData({
  //     musicListInfo
  //   })
  //   if (musicList.length == 0){
  //     clearInterval(this.data.stopIntervalNum)
  //     this.setData({
  //       showSingListModal: false
  //     })
  //   }
  // },
  // removeAllListItem(e){
  //   let that = this
  //   wx.showModal({
  //     title: '确定要清空播放列表？',
  //     confirmText:'清空',
  //     success(res){
  //       if (res.confirm){
  //         let musicListInfo = that.data.musicListInfo
  //         musicListInfo.musicList = []
  //         musicListInfo.isCollectAll=false
  //         clearInterval(that.data.stopIntervalNum)
  //         that.setData({
  //           musicListInfo,
  //           showSingListModal: false
  //         })
  //       }
  //     }
  //   })
    
  // },
  findCurrentMusicIndex(){
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
  preSong(e){
    let preIndex = -1
    let musicList = this.data.musicList
    let currentPlayId = this.data.musicInfo.id
    let currentPlayIndex = this.findCurrentMusicIndex()

    if(currentPlayIndex==-1)return

    if (this.data.loopStatusIndex == 2) {
      if (musicList.length != 1) {
        while ((preIndex = Math.floor(Math.random() * musicList.length)) == currentPlayIndex) { }
      } else {
        preIndex = currentPlayIndex
      }

    } else {
      preIndex = currentPlayIndex - 1 <= -1 ? musicList.length - 1 : currentPlayIndex - 1
    }
    this.musicPlayItemChange(musicList[preIndex].id)
  },
  nextSong(e){
    let nextIndex = -1
    let musicList = this.data.musicList
    let currentPlayId = this.data.musicInfo.id
    let currentPlayIndex = this.findCurrentMusicIndex()

    if (currentPlayIndex == -1) return

    
    if (this.data.loopStatusIndex==2){
      if(musicList.length!=1){
        while ((nextIndex = Math.floor(Math.random() * musicList.length)) == currentPlayIndex) { }
      }else{
        nextIndex=currentPlayIndex
      }
      
    }else{
      nextIndex = currentPlayIndex + 1 >= musicList.length ? 0 : currentPlayIndex + 1
    }

    this.musicPlayItemChange(musicList[nextIndex].id)
    
  },
  musicPlayItemChangeInner(e){
    let id = e.detail
    this.musicPlayItemChange(id)
  },
  async musicPlayItemChange(id,isFirst=false){
    let newItem = {}
    let ctime = await Store.getCurrentPlayTime()
    if(id==this.data.musicInfo.id){
      if (this.data.musicInfo.singTime >= ctime - 1 && this.data.musicInfo.singTime <= ctime + 1){
        newItem = this.data.musicInfo
      }else return
    }else{
      //TODO request 
      for (let i = 0; i < this.data.musicListData.length; i++) {
        if (this.data.musicListData[i].id == id) {
          newItem = this.data.musicListData[i]
          break
        }
      }
      
    }

  
    //TODO user is vip?
    if (newItem.isVip) {
      wx.showModal({
        title: '该曲需要开通vip才能听完整首哦',
        confirmText: '立即开通',
        cancelText: '暂不开通',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/subpackages-payment/pages/payment/payment' })
          }
        }
      })
    }
    
    this.setData({
      musicInfo: newItem,
      currentTime: 0,
      playStatus:true,
      perSecondProgress: this.data.progressLength / newItem.singTime
    })

    let currentMusic = await Store.getCurrentPlayMusic()
    
    if (!isFirst || (isFirst && id != currentMusic.id)){
      this.setData({
        currentTime: 0
      })
      Store.setCurrentPlayTime(0)
      let stopNumber = await Store.getStopIntervalNumber()
      clearInterval(this.data.stopIntervalNum)
      if (stopNumber != null) clearInterval(stopNumber)
      Store.setStopIntervalNumber(null)
    }
    
    Store.setCurrentMusic(newItem)
    this.clearAndDrawBackground()
    this.playMusic()
  },
  tapPlay(e){
    let index = e.currentTarget.dataset.index
    let item = this.data.musicList[index]
    this.musicPlayItemChange(item.id)
    this.setData({
      showSingListModal:false
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
  canvasTouchend(e){
    console.log(e)
  }
})
// subpackages-music/pages/music-play/music-play.js
const app = getApp()
let func = require('../../../common/utils/func/wxml-element.js')
const ctx1 = wx.createCanvasContext('circular-play-cd')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime:0,
    perSecondProgress:0,
    allTime:240,
    windowHeight:app.globalData.systemInfo.windowHeight,
    windowWidth: app.globalData.systemInfo.windowWidth
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    func.getElementHeight(this, '#canvas').then(playCdSize => {
      //计算每秒钟的进度
      let progressRadius=playCdSize/2-3
      let progressLength = 2 * Math.PI * progressRadius
      let perSecondProgress=progressLength/this.data.allTime
      this.setData({
        perSecondProgress,
        radius : playCdSize / 2,
        progressRadius,
        progressLength
      })

      //绘制播放cd的封面和背景圆


      //开始播放音乐
      this.playMusic()
    })
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
  playMusic(){
    let that = this
    //控制进度条变化
    let stopIntervalNum=setInterval(()=>{
      if(that.data.allTime == that.data.currentTime){
        clearInterval(that.data.stopIntervalNum)
        return
      }
      that.drawPlayProgress()
    },1000)

    this.setData({
      stopIntervalNum
    })
  },

  //计算并绘制当前播放进度条
  drawPlayProgress(){
    let currentTime=this.data.currentTime+1
    this.setData({
      currentTime
    })
    //当前进度条弧长
    let currentProgressLength=currentTime * this.data.perSecondProgress
    //计算进度条当前弧长的两倍与周长的比值(0~2)
    let deg = currentProgressLength*2/ this.data.progressLength
    //由于是以三点钟方向为0度，故这里在绘制时的真实弧度需要减去90
    let drawDeg = deg - 0.5
    if (drawDeg < 0) drawDeg = 2 + drawDeg
    if (drawDeg > 1.4999999 && drawDeg <=1.5)drawDeg=1.4999999
    //开始绘制
    this.drawPlayCd(drawDeg)
    
  },


  drawPlayCd(endPoint) {
    let radius = this.data.radius
    let playCdSize =  radius*2
    //清空画布
    ctx1.clearRect(0, 0, playCdSize, playCdSize)
    //绘制背景圆
    ctx1.beginPath()
    ctx1.setGlobalAlpha(0.3)
    ctx1.arc(radius, radius, radius - 3, 0, 2 * Math.PI)
    ctx1.setLineWidth(3)
    ctx1.setStrokeStyle(app.globalData.themeColor)
    ctx1.stroke()
    ctx1.draw(true)

    //绘制进度条
    ctx1.beginPath()
    ctx1.setGlobalAlpha(1)
    ctx1.setLineWidth(3)
    ctx1.setStrokeStyle("#df537a")
    ctx1.arc(radius, radius, radius - 3, 1.5 * Math.PI, endPoint  * Math.PI)
    ctx1.stroke()
    ctx1.draw(true)
  
  }
})
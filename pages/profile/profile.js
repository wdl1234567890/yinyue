// pages/profile/profile.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    userAvatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
    userId: "茯苓170603",
    thumbAvatorOpacity: 0,
    showTopBarChangeParam: 100,
    topBarColorOpacity: app.globalData.themeBg,
    themeBgAndModuleColorDiffer: app.globalData.themeModuleColorOpacity - app.globalData.themeBgOpacity,
    themeBgAndModuleColorBasicParam: app.globalData.themeBgAndModuleColorBasicParam
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  scrolling(event){
    let scrollTop = event.detail.scrollTop
    if (scrollTop <= this.data.showTopBarChangeParam && scrollTop>8){
      let frequencyParam = 1 / this.data.showTopBarChangeParam;
      this.setData({
        thumbAvatorOpacity: scrollTop * frequencyParam,
        topBarColorOpacity: app.globalData.themeBgOpacity + this.data.themeBgAndModuleColorDiffer * frequencyParam
      })
    } else if (scrollTop<=8){
      this.setData({
        thumbAvatorOpacity: 0,
        topBarColorOpacity: app.globalData.themeBg
      })
    }else{
      this.setData({
        thumbAvatorOpacity: 1,
        topBarColorOpacity: app.globalData.themeModuleColorOpacity
      })
    }
  },
  scrolltoupper(){
    this.setData({
      thumbAvatorOpacity: 0,
      topBarColorOpacity: app.globalData.themeBg
    })
  }
})
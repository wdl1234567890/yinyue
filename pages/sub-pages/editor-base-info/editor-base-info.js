// pages/sub-pages/editor-base-info/editor-base-info.js
const app = getApp()
let Store = require('../../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      avator: '',
      userName: '',
      choosedStyles: []
    },
    current: 0,
    themeColor: app.globalData.themeColor,
    styleLabels: ["流行", "古风", "摇滚", "乡村", "AGC", "英文", "草原", "AGC", "英文", "草原"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.data.userInfo.avator ='https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    this.data.userInfo.userName = '茯苓'
    this.data.userInfo.choosedStyles = []
    this.setData({
      userInfo:this.data.userInfo
    })
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
  tapSave(e){
    if(this.data.userInfo.userName==''){
      wx.showToast({
        title: '用户名不能为空',
        icon:'none'
      })
      return
    }
    if (this.data.userInfo.choosedStyles.length < 3) {
      wx.showToast({
        title: '最少选择3个风格标签',
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '保存成功！',
      icon:'none'
    })
  },
  tapEditUserName(e){
    this.data.userInfo.userName=e.detail.value.trim()
    this.setData({
      userInfo: this.data.userInfo
    })
  },
  tapLabel(e) {
    let that = this
    if (e.detail.isActive) {
      if(this.data.userInfo.choosedStyles.length >= 6){
        wx.showToast({
          title: '风格标签最多只能选择6个',
          icon:'none'
        })
        return
      }
      this.data.userInfo.choosedStyles.push(e.detail.value)
      this.setData({
        userInfo:this.data.userInfo
      })
      // Store.addStorage("styleLabel", e.detail.value).then(res => {
      //   that.setData({
      //     choosedStyles: res
      //   })
      // })
    } else {
      this.data.userInfo.choosedStyles.splice(this.data.userInfo.indexOf(e.detail.value),1)
      this.setData({
        userInfo: this.data.userInfo
      })
      // Store.removeStorage("styleLabel", e.detail.value).then(res => {
      //   that.setData({
      //     choosedStyles: res
      //   })
      // })
    }
  },
  tapChangeAvator(e) {
    let that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        that.data.userInfo.avator = res.tempFilePaths
        that.setData({
          userInfo: that.data.userInfo
        })
        wx.showToast({
          title: '头像更新成功！',
          icon: 'none'
        })
      },
      fail(e) {
        
      }
    })
  },
})
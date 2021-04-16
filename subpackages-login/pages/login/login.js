// subpackages-login/pages/login/login.js
const app = getApp()
let Store = require('../../../common/utils/store/store.js')
let { httpGet, httpPost, httpPutWithToken } = require('../../../network/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false,
    checkedIndex: -1,
    current: 0,
    themeColor: app.globalData.themeColor,
    styleLabels: ["流行", "古风", "摇滚", "乡村", "AGC", "英文", "草原"],
    choosedStyles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    Store.getStyleLabels().then(res => {
      that.setData({
        choosedStyles: res
      })
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
  getUserInfo(res) {
    let that = this
    let flag = res.currentTarget.dataset.flag
    if (flag == 0) {
      (new Promise((resolve,reject)=>{
        wx.getUserProfile({
          desc: '用户信息将用作展示',
          success: (res) => {
            let userName = res.userInfo.nickName
            let avator = res.userInfo.avatarUrl
            resolve({userName,avator})
          }
        })
      })).then(userInfos=>{
        wx.login({
          success(res) {
            if (res.code) {
              userInfos.code = res.code
              return Promise.resolve(userInfos)
            }
          }
        })
      }).then(userInfos=>{
        httpGet('/login?code=' + userInfos.code + '&userName=' + userInfos.userName + '&avator=' + userInfos.avator).then(data=>{
          return Promise.resolve(data)
        })
      }).then(data=>{
        let token = data.token
        let user = data.userInfo
        let styles = data.styles
        let isFirstLogin = data.result
        let userInfo = {
          avator: user.avator,
          userName: user.userName,
          choosedStyles: styles
        }
        
        Store.setUserInfo(userInfo)
        Store.setToken(token)

        if (isFirstLogin){
          that.setData({
            current: 1
          })
        }else{
          wx.showToast({
            title: '登录成功',
            icon:'none'
          })
          wx.navigateBack()
        }
        
      }).catch(res=>{
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      })
      
    } else {
      wx.showToast({
        title: '请升级到微信最新版本',
        icon: 'none'
      })
    }
  },
  sexChange(e) {

    let index = e.currentTarget.dataset.index
    this.setData({
      checkedIndex: index
    })
  },
  dateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  tapLabel(e) {
    if (e.detail.isActive) {
      Store.addStyleLabels(e.detail.value)
      this.setData({
        choosedStyles: this.data.choosedStyles.push(e.detail.value)
      })
    } else {
      Store.removeStyleLabels(e.detail.value)
      this.setData({
        choosedStyles: this.data.choosedStyles.splice(this.data.choosedStyles.indexOf(e.detail.value), 1)
      })
    }
  },
  complete(e){
    httpPutWithToken('/user/styles',this.data.choosedStyles).then(res=>{
      wx.showToast({
        title: '登录成功',
        icon:'none'
      })
      wx.navigateBack()
    }).catch(res=>{
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    })
  }
})
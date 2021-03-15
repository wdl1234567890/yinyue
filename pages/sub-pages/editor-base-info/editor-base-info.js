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
    // let that = this
    // this.data.userInfo.avator ='https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    // this.data.userInfo.userName = '茯苓'
    // this.data.userInfo.choosedStyles = []
    // this.setData({
    //   userInfo:this.data.userInfo
    // })
    this.initUserInfo()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  //初始化用户信息
  initUserInfo() {
    Store.getUserInfo().then(res => {
      this.data.userInfo.avator = res.avator
      this.data.userInfo.userName = res.userName
      this.data.userInfo.choosedStyles = res.choosedStyles

      this.setData({
        userInfo: this.data.userInfo
      })
    })
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

    Store.setUserInfo(this.data.userInfo).then(res=>{
      wx.showToast({
        title: '保存成功！',
        icon: 'none'
      })
    }).catch(res=>{
      wx.showToast({
        title: '保存失败！',
        icon: 'none'
      })
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
    } else {
      this.data.userInfo.choosedStyles.splice(this.data.userInfo.choosedStyles.indexOf(e.detail.value),1)
      this.setData({
        userInfo: this.data.userInfo
      })
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
      }
    })
  },
})
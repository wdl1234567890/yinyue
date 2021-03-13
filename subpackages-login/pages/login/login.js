// subpackages-login/pages/login/login.js
const app = getApp()
let Store = require('../../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedIndex:-1,
    current:0,
    themeColor: app.globalData.themeColor,
    styleLabels:["流行","古风","摇滚","乡村","AGC","英文","草原"],
    choosedStyles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    let that=this
    Store.getStorage("styleLabel").then(res=>{
      that.setData({
        choosedStyles:res
      })
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
  getUserInfo(res){
    let userInfo=res.detail.userInfo
    //用户已授权
    if (userInfo!=undefined){
      //缓存昵称和头像
      //调用wx.login和后台对接，返回token存储到缓存里完成一次有效期登录
      //进入下一个步骤
      this.setData({
        current: 1
      })
    }
    //用户拒绝授权
    else{

    }
  },
  sexChange(e){
    
    let index = e.currentTarget.dataset.index
    this.setData({
      checkedIndex:index
    })
  },
  dateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  tapLabel(e){
    let that=this
    if (e.detail.isActive){
      Store.addStorage("styleLabel", e.detail.value).then(res => {
        that.setData({
          choosedStyles: res
        })
      })
    }else{
      Store.removeStorage("styleLabel", e.detail.value).then(res=>{
        that.setData({
          choosedStyles: res
        })
      })
    }
  }
})
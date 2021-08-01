// subpackages-payment/pages/payment/payment.js
let Store = require('../../../common/utils/store/store.js')
let { urlPre,httpGetWithToken, httpGet, httpPost } = require('../../../network/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipMonthId:0,
    paymentId:0,
    vipMonthCards:[
      {
        id:1,
        title: '1个月',
        sumPrice: 8,
        perMonthPrice: 8
      },
      {
        id:2,
        title: '6个月',
        sumPrice: 45,
        perMonthPrice: 7.5
      },
      {
        id:3,
        title: '12个月',
        sumPrice: 88,
        perMonthPrice: 7.3
      }
    ],
    paymentMethod:[
      {
        title:"微信支付",
        icon:"/static/images/payment/logo-wxpay.png"
      },
      {
        title: "支付宝",
        icon: "/static/images/payment/logo-alipay.png"
      }
    ]
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
  vipMonthChange(e){
    this.setData({
      vipMonthId: e.detail
    })
  },
  paymentChange(e){
    
    this.setData({
      paymentId: e.detail
    })
  },
  tapPay(e){
    if(this.data.paymentId == 1){
      httpGetWithToken('user-service//user/info').then(userInfo=>{
        Store.getToken().then(token=>{
          console.log(this.data.vipMonthCards[this.data.vipMonthId])
          let url = 'http://159.75.231.211:8030/payment/user/' + token + '/allAmount/' + this.data.vipMonthCards[this.data.vipMonthId].sumPrice + '/vipKeepMonthCount/' + this.data.vipMonthCards[this.data.vipMonthId].title.replace('个月', '') + '/withToken'
          wx.showModal({
            title: '复制以下网址到浏览器打开完成支付',
            content: url,
            confirmText:'复制',
            success(e) {
              wx.setClipboardData({
                data: url
              })
            }
          })
        })
      })
      
    }else{
      
    }
  }
})
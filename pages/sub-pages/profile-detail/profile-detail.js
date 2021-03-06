// pages/sub-pages/profile-detail/profile-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionModal:false,
    userInfo:{
      avator:'',
      userName:'',
      choosedStyles:[]
    },
    actions: [
      {
        id: 1,
        icon: 'editor',
        text: '修改信息',
      },
      {
        id: 2,
        icon: 'share',
        text: '分享',
      },
      {
        id: 3,
        icon: 'offline',
        text: '注销',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    this.data.userInfo.avator = 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    this.data.userInfo.userName = '茯苓'
    this.data.userInfo.choosedStyles = ["流行", "古风", "摇滚"]

    this.setData({
      userInfo:this.data.userInfo
    })

    //获取顶部导航栏改变样式的高度参数
    let query = wx.createSelectorQuery()
    query.selectAll(".element-distance").boundingClientRect(res => {
      let base = res[0].top
      let height = res[1].height + res[1].top
      that.setData({
        showTopBarChangeParam: height - base
      })

    }).exec()
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

  scrolltoupper(){
    //如果滚动到顶部后顶部导航栏样式没有恢复，则手动恢复
    if(this.data.topBarchange){
      this.setData({
        topBarchange:false
      })
    }
  },

  scrolling(event) {
    let scrollTop = event.detail.scrollTop

    //滚动过程判断是否到达顶部导航栏样式变化的高度
    if (scrollTop < this.data.showTopBarChangeParam && this.data.topBarchange){
      this.setData({
        topBarchange:false
      })
    }
    if (scrollTop >= this.data.showTopBarChangeParam && !this.data.topBarchange) {
      this.setData({
        topBarchange: true
      })
    }
  },
  hideModal(e){
    this.setData({
      showActionModal:false
    })
  },
  tapSwitch(e){
    this.setData({
      showActionModal: true
    })
  },
  tapAction(e){
    let index = e.currentTarget.dataset.index
    if(index == 0){
      wx.navigateTo({
        url: '/pages/sub-pages/editor-base-info/editor-base-info'
      })
      this.setData({
        showActionModal:false
      })
    }else if(index == 1){

    }else if(index == 2){
      wx.navigateTo({
        url: '/pages/sub-pages/editor-base-info/editor-base-info'
      })
    }
  },
  tapEditor(e){
    wx.navigateTo({
      url: '/pages/sub-pages/editor-base-info/editor-base-info'
    })
  }
})
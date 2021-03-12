// pages/sub-pages/edit-music-list/edit-music-list.js
let app = getApp()
let Store = require('../../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList:{},
    showInput:false,
    themeColor: app.globalData.themeColor,
    newListName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let id = options.id
    // let selfSongList = await Store.getSelfSongList()
    // let musicList = selfSongList.find(e=>{
    //   if(e.id==id)return
    //   return false
    // })
    let musicList = { id: 1, title: '歌单1', cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg' }
    this.setData({
      musicList,
      newListName: musicList.title
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
  tapChangeCover(e){
    let that=this
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.data.musicList.cover=tempFilePaths
        that.setData({
          musicList:that.data.musicList
        })
        wx.showToast({
          title: '封面更新成功！',
          icon:'none'
        })
      },
      fail(e){
        wx.showToast({
          title: '封面更新失败！',
          icon: 'none'
        })
      }
    })
  },
  tapEditTitle(e){
    this.setData({
      showInput:true,
      newListName:this.data.musicList.title
    })
  },
  tapButton(e) {
    const index = e.detail.index;
    if (index == 0) {
      this.setData({
        showInput: false
      })
    } else {
      this.songListConfirm(e)
    }
  },
  songListConfirm(e){
    if(this.data.newListName==''){
      wx.showToast({
        title: '歌单名称不能为空!',
        icon:'none'
      })
      return
    }
    this.data.musicList.title = this.data.newListName
    this.setData({
      musicList: this.data.musicList,
      newListName:'',
      showInput:false
    })
    wx.showToast({
      title: '修改成功！',
      icon: 'none'
    })
  },
  songListInput(e){
    this.setData({
      newListName:e.detail.value.trim()
    })
  }
})
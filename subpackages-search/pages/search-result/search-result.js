// subpackages-search/pages/search-result/search-result.js
let app = getApp()
let func = require('../../../common/utils/func/wxml-element.js')
let Store = require('../../../common/utils/store/store.js')
let { httpGet, httpPost } = require('../../../network/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionModal:false,
    hasMusicList:false,
    searchValue:'',
    themeColor: app.globalData.themeColor,
    musicInfo:{},
    tabTitles:[
      {
        id:1,
        title:"单曲",
      },
      {
        id: 2,
        title: "歌手",
      },
      {
        id: 3,
        title: "歌单",
      }
    ],
    songDatas:[],
    songListDatas: [],
    singerDatas:[]
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let searchValue = options.search ?options.search.trim():''
    let that = this
    wx.showLoading({
      title: '搜索中...'
    })
    httpGet("search-service//search/" + encodeURI(searchValue)).then(({songs,songLists,singers}) => {
      that.setData({
        songDatas:songs,
        songListDatas:songLists,
        singerDatas:singers
      })
      wx.hideLoading()
    })
    Store.getCurrentPlayMusic().then(res=>{
      this.setData({
        searchValue,
        musicInfo: res
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
  onShow() {
    Store.getCurrentPlayMusic().then(res=>{
      musicInfo:res
    })


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
  getContentHeight(e){
    this.setData({
      contentHeight: e.detail
    })
  },

  musicPlayItemChangeInner(e){
    
    if(e!=null &&e.detail!=null){
      Store.getCurrentPlayMusic().then(res=>{
        this.setData({
          musicInfo: res
        })
      })
    }
    
  },
  search(e){
    let value=e.detail
  }
})
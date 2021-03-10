// subpackages-search/pages/search/search.js
let app = getApp()
let Store = require('../../../common/utils/store/store.js')
let func = require('../../../common/utils/func/wxml-element.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    hotSearch:[
      {
        id:1,
        searchValue: "祖娅纳惜"
      },
      {
        id: 2,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 3,
        searchValue: "泽野弘之"
      },
      {
        id: 4,
        searchValue: "Good Love Your Love"
      },
      {
        id: 5,
        searchValue: "産声"
      },
      {
        id: 6,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 7,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 8,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 9,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 10,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      },
      {
        id: 11,
        searchValue: "暗恋是一个人的事情"
      }
    ],
    historyLabels: ["天竺鼠车车", "天问", "天竺鼠车车","天竺鼠车车"],
    recommendLabels:["天问","孤梦","天涯客","泽野弘之","张哲瀚"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.setData({
      historyLabels : await Store.getHistorySearch()
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
  taplabel(e){
    this.setData({
      searchValue:''
    })
  },
  removeLabel(e){
    this.setData({
      historyLabels:e.detail
    })
  },
  search(e){
    let value = e.detail
    let historySearch = this.data.historyLabels
    //搜索记录中是否已经存在value，是则将该value提到最前，否则直接将value插入到最前边
    let isInclude = historySearch.find(e=>{
      if (e==value)return true
      return false
    })
    if (isInclude){
      historySearch.splice(historySearch.indexOf(value),1)
      
    }

    historySearch.unshift(value)

    this.setData({
      historyLabels: historySearch,
      searchValue:''
    })

    Store.setHistorySearch(historySearch)

    wx.navigateTo({
      url: '/subpackages-search/pages/search-result/search-result?search=' + value
    })
  },
  tapHotItem(e){
    let searchValue = e.currentTarget.dataset.value
    this.setData({
      searchValue:''
    })
    wx.navigateTo({
      url: '/subpackages-search/pages/search-result/search-result?search=' + searchValue
    })
  }
})
// subpackages-search/pages/search/search.js
let app = getApp()
let Store = require('../../../common/utils/store/store.js')
let func = require('../../../common/utils/func/wxml-element.js')
let {debounce} = require('../../../common/utils/func/func-utils.js')
let { httpGet, httpPost, httpGetWithToken } = require('../../../network/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    hotSearch: [],
    historyLabels: ["历史搜索"], 
    recommendLabels:["推荐搜索"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getHotSearchKeys()
    this.getRecommendKeys()
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
    Store.getHistorySearch().then(res => {
      this.setData({
        historyLabels: res
      })
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
  // taplabel(e){
  //   // this.setData({
  //   //   searchValue:''
  //   // })
  // },
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
  taplabel(e){
    this.search({ detail: e.currentTarget.dataset.value})
  },
  getHotSearchKeys(){
    let that = this
    httpGet("search-service//search/hotKey").then(hotSearch => {
      that.setData({
        hotSearch
      })
    })
  },
  getRecommendKeys(){
    let that = this
    httpGetWithToken("search-service//search/recommendKey",false).then(recommendLabels => {
      that.setData({
        recommendLabels
      })
    })
  }
})
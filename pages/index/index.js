// pages/index/index.js
let app = getApp()
let func = require('../../common/utils/func/wxml-element.js')
let { httpGet, httpPost, httpGetWithToken} = require('../../network/httpClient.js')
let Store = require('../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    personalRecommendMusicLists:[],
    normalRecommendMusicLists:{},
    musicsBySinger:[],
    banner:[],
    singers:[],
    styles:[],
    scenes:[],
    hotSongList:{},
    newSongList:{},
    randomSongList:{},
    recommendSongs: [],
    recommendSongLists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBanner()
    this.getHotAndNewAndRandom()
    this.getAllStyle()
    this.getAllScene()
    this.getAllSinger()
    this.getRecommendSongs()
    this.initPersonalRecommendMusicLists()
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  //初始化个性化推荐歌单
  initPersonalRecommendMusicLists(){
    let that = this
    httpGetWithToken("recommend-service//recommend/personal/list", false).then(recommendSongLists => {
      that.setData({
        recommendSongLists
      })
      Store.getToken(res=>{
        if(token != ''){
          recommendSongLists.unshift({ id: -2, title: '个人推荐' })
          that.setData({
            recommendSongLists
          })
        }
      })
    })
    
  },

  //进入更多页面
  tapMore(e){
    if(e.detail=='歌曲推荐'){

    }else{
      wx.navigateTo({
        url: '/pages/sub-pages/index-more/index-more?title=' + e.detail
      })
    }
  },

  //点击进入歌手，风格，场景页面
  tapCircularItem(e){
    let id = e.detail
    let title = e.currentTarget.dataset.title
    switch(title){
      case "音乐人":
        wx.navigateTo({
          url: '/subpackages-song-list/pages/song-list-detail/song-list-detail?flag=5' + '&id=' + id
        })
      break
      case "风格":
        wx.navigateTo({
          url: '/pages/sub-pages/index-more/index-more?title=' + title + '&id=' + id + '&sub=' + e.currentTarget.dataset.sub
        })
      break
      case "场景":
        wx.navigateTo({
          url: '/pages/sub-pages/index-more/index-more?title=' + title + '&id=' + id + '&sub=' + e.currentTarget.dataset.sub
        })
      break
      default:
      break
    }
  },
  //点击banner
  tapSwiperItem(e){
    let id = e.detail
    wx.navigateTo({
      url: '/subpackages-song-list/pages/song-list-detail/song-list-detail?id=' + id
    })
  },
  tapNormalRecommend(e){
    let id = e.detail
    wx.navigateTo({
      url: '/subpackages-song-list/pages/song-list-detail/song-list-detail?id='+id
    })
  },
  tapToSearchPage(e){
    wx.navigateTo({
      url: '/subpackages-search/pages/search/search'
    })
  },

  getHotAndNewAndRandom(){
    let that = this
    httpGet("recommend-service//recommend/hotAndNewAndRandom").then(({ hotSongList, newSongList, randomSongList })=>{
      that.setData({
        hotSongList,
        newSongList,
        randomSongList
      })
    })
  },
  getAllStyle(){
    let that = this
    httpGet("style-service//style/page/1").then(styles => {
      that.setData({
        styles
      })
    })
  },
  getAllScene() {
    let that = this
    httpGet("scene-service//scene").then(scenes => {
      that.setData({
        scenes
      })
    })
  },
  getAllSinger() {
    let that = this
    httpGet("singer-service//singer/page/1").then(singers => {
      that.setData({
        singers
      })
    })
  },
  getBanner(){
    let that = this
    httpGet("recommend-service//recommend/banner").then(banner => {
      that.setData({
        banner
      })
    })
  },

  getRecommendSongs(){
    let that = this
    httpGetWithToken("recommend-service//recommend/songs",false).then(recommendSongs => {
      
      that.setData({
        recommendSongs: recommendSongs.slice(0, 9)
      })
    })
  }
  
})
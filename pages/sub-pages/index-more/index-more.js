// pages/sub-pages/index-more/index-more.js
let { httpGet, httpPost } = require('../../../network/httpClient.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    title:'标题',
    subTitle:'',
    id:-1,
    datasList: [],
    page:1,
    urls:{
      "推荐歌单":"recommend-service//recommend/personal/list",
      "音乐人":"singer-service//singer/page/",
      "风格":"style-service//style/page/",
      "场景":"scene-service//scene",
    },
    hasIdUrls:{
      "风格": "song-list-service//songList/style/",
      "场景": "song-list-service//songList/scene/",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title,
      id:options.id?options.id:-1,
      subTitle: options.sub?options.sub:''
    })
    this.getInfo()
  },

  getInfo(){
    let title = this.data.title
    let id = this.data.id
    if(id == -1){
      if ((title == '风格' || title == '音乐人') || (title == '推荐歌单' || title == '场景') && this.data.datasList.length <= 0) {
        let url = this.data.urls[title]
        if (title == '风格' || title == '音乐人') {
          url = url + this.data.page
        }
        httpGet(url).then(data => {
          this.data.datasList.push(...data)
          this.setData({
            datasList: this.data.datasList
          })
          if (title == '风格' || title == '音乐人'){
            this.setData({
              page: this.data.page + 1
            })
          }
        })
      }
    } else if (this.data.datasList == null || this.data.datasList.length <= 0){
      let url = this.data.hasIdUrls[title]
      url = url + id +'/songLists'
      httpGet(url).then(data => {
        this.data.datasList.push(...data)
        this.setData({
          datasList: this.data.datasList
        })
      })
    }
  },

  scrolltolower(e){
    wx.showLoading({
      title: '加载中...'
    })
    this.getInfo()
    wx.hideLoading()
  },

  tapCircularItem(e) {
    let id = e.detail
    let title = e.currentTarget.dataset.title
    switch (title) {
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
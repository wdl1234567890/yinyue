// subpackages-song-list/pages/song-list-detail/song-list-detail.js
let app = getApp()
let func = require('../../../common/utils/func/wxml-element.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    searchState:false,
    musicListInfo:{},
    singListDatas: [
      {
        id: 1,
        srcUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        title: "歌单1",
        list: [
          {
            id: 4,
            singName: "歌曲4",
            singerName: "歌手4",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 504,
            isVip: false
          },
          {
            id: 6,
            singName: "歌曲6",
            singerName: "歌手6",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 152,
            isVip: false
          },
          {
            id: 3,
            singName: "歌曲3",
            singerName: "歌手3",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 1,
            isVip: false
          }
        ]
      },
      {
        id: 2,
        srcUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        title: "歌单2",
        list: [
          {
            id: 6,
            singName: "歌曲6",
            singerName: "歌手6",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 152,
            isVip: false
          },
          {
            id: 3,
            singName: "歌曲3",
            singerName: "歌手3",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 1,
            isVip: false
          }
        ]
      },
      {
        id: 3,
        srcUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        title: "歌单3",
        list: [
          {
            id: 6,
            singName: "歌曲6",
            singerName: "歌手6",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 152,
            isVip: false
          },
          {
            id: 3,
            singName: "歌曲3",
            singerName: "歌手3",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 1,
            isVip: false
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取参数里的歌单id
    let musicListId= options.id

    //request
    let musicListInfo = this.data.singListDatas.find(e=>{
      if (e.id == musicListId)return true
      else return false
    })

    this.setData({
      musicListInfo
    })

    let that = this

    //获取顶部导航栏改变样式的高度参数
    let query = wx.createSelectorQuery()
    query.selectAll(".element-distance").boundingClientRect(res => {
      let height = res[0].height
      that.setData({
        showTopBarChangeParam: height
      })

    }).exec()

    //获取操作板的高度
    func.getElementHeight(this, '.action-card').then(actionCardHeight => {
      this.setData({
        actionCardHeight
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
  scrolltoupper() {
    //如果滚动到顶部后顶部导航栏样式没有恢复，则手动恢复
    if (this.data.topBarchange) {
      this.setData({
        topBarchange: false
      })
    }
  },

  scrolling(event) {
    let scrollTop = event.detail.scrollTop

    //滚动过程判断是否到达顶部导航栏样式变化的高度
    if (scrollTop < this.data.showTopBarChangeParam && this.data.topBarchange) {
      this.setData({
        topBarchange: false
      })
    }
    if (scrollTop >= this.data.showTopBarChangeParam && !this.data.topBarchange) {
      this.setData({
        topBarchange: true
      })
    }
  },
  //点击搜索按钮，出现搜索页面
  clickSearch(e){
    this.setData({
      searchState:true
    })
  },
  //点击返回按钮
  clickBack(e){
    //如果当前处于搜索状态，则切换为歌单主页面
    if(this.data.searchState){
      this.setData({
        searchState:false
      })
    }
  },
  //进入批量操作页面
  goToBatch(e) {
    app.globalData.searchResult = this.data.musicListInfo.list
    wx.navigateTo({
      url: '/subpackages-search/pages/batch-action-page/batch-action-page'
    })
  },
})
// pages/index/index.js
let app = getApp()
let func = require('../../common/utils/func/wxml-element.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    banner: [],
    personalRecommendMusicLists:[],
    normalRecommendMusicLists:{},
    musicsBySinger:[],
    singers:[],
    styles:[],
    scenes:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initBanner()
    this.initPersonalRecommendMusicLists()
    this.initNormalRecommendMusicLists()
    this.initMusicsBySinger()
    this.initSingers()
    this.initStyles()
    this.initScenes()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //初始化首页轮播图
  initBanner() {
    this.setData({
      banner: [{
        id: 1,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      }, {
        id: 2,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
      }, {
        id: 3,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      }, {
        id: 4,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      }, {
        id: 5,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      }, {
        id: 6,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      }, {
        id: 7,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      }]
    })
  },

  //初始化个性化推荐歌单
  initPersonalRecommendMusicLists(){
    this.setData({
      personalRecommendMusicLists:[
        {
          id:1,
          title:'歌单标题',
          cover:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        },
        {
          id: 2,
          title: '歌单标题',
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        },
        {
          id: 3,
          title: '歌单标题',
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        },
        {
          id: 4,
          title: '歌单标题',
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        },
        {
          id: 5,
          title: '歌单标题',
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }
      ]
    })
  },

  //初始化非个性化推荐歌单
  initNormalRecommendMusicLists(){
    this.setData({
      normalRecommendMusicLists:{
        hotList:{
          id:1,
          title:'热门\n歌曲',
          listInfos:['梦中的旅行家-RaJor','错位时空-小玄子','非我-凤凰大人']
        },
        newList:{
          id: 2,
          title: '新歌推荐',
          listInfos: ['梦中的旅行家-RaJor', '错位时空-小玄子', '非我-凤凰大人']
        },
        randomList:{
          id: 3,
          title: '随机歌单'
        }
      }
    })
  },

  //初始化根据常听的歌手推荐相关的歌曲
  initMusicsBySinger(){
    this.setData({
      musicsBySinger:[
        {
          id:1,
          cover:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName:'我死我生',
          singerName:'不才'
        },
        {
          id: 2,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName: '我死我生',
          singerName: '不才'
        },
        {
          id: 3,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName: '我死我生',
          singerName: '不才'
        },
        {
          id: 4,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName: '我死我生',
          singerName: '不才'
        },
        {
          id: 5,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName: '我死我生',
          singerName: '不才'
        },
        {
          id: 6,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName: '我死我生',
          singerName: '不才'
        },
        {
          id: 7,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName: '我死我生',
          singerName: '不才'
        },
        {
          id: 8,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName: '我死我生',
          singerName: '不才'
        },
        {
          id: 9,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName: '我死我生',
          singerName: '不才'
        }
      ]
    })
  },

  //初始化歌手栏
  initSingers(){
    this.setData({
      singers:[
        {
          id:1,
          avator:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          singerName:'不才'
        },
        {
          id: 2,
          avator: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          singerName: '刘宇宁'
        },
        {
          id: 3,
          avator: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          singerName: '张哲瀚'
        },
        {
          id: 4,
          avator: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          singerName: '小时姑娘'
        },
        {
          id: 5,
          avator: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          singerName: '叶里'
        }
      ]
    })
  },

  //初始化风格栏
  initStyles(){
    this.setData({
      styles:[
        {
          id: 1,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          style: '古风'
        },
        {
          id: 2,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          style: '流行'
        },
        {
          id: 3,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          style: '草原'
        },
        {
          id: 4,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          style: '摇滚'
        },
        {
          id: 5,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          style: '日语'
        },
        {
          id: 6,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          style: '粤语'
        }
      ]
    })
  },

  //初始化场景栏
  initScenes(){
    this.setData({
      scenes: [
        {
          id: 1,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          scene: '运动'
        },
        {
          id: 2,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          scene: '咖啡厅'
        },
        {
          id: 3,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          scene: '图书馆'
        },
        {
          id: 4,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          scene: '大自然'
        },
        {
          id: 5,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
          scene: '午休'
        }
      ]
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
          url: '/pages/sub-pages/index-more/index-more?title=' + title + '&id='+id
        })
      break
      case "场景":
        wx.navigateTo({
          url: '/pages/sub-pages/index-more/index-more?title=' + title + '&id=' + id
        })
      break
      default:
      break
    }
  },
  //点击banner
  tapSwiperItem(e){
    let id = e.detail
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
  }
})
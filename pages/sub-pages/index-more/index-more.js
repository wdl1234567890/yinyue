// pages/sub-pages/index-more/index-more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'标题',
    id:-1,
    datasList:[],
    titleFlag:{
      "推荐歌单":"personalRecommendMusicLists",
      "音乐人":"singers",
      "风格":"styles",
      "场景":"scenes",
    },
    personalRecommendMusicLists: [
      {
        id: 1,
        title: '歌单标题',
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
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
    ],
    singers: [
      {
        id: 1,
        avator: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
        singerName: '不才'
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
      },
      {
        id: 6,
        avator: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
        singerName: '张哲瀚'
      },
      {
        id: 7,
        avator: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
        singerName: '小时姑娘'
      },
      {
        id: 8,
        avator: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
        singerName: '叶里'
      }
    ],
    styles: [
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
    ],
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title,
      id:options.id?options.id:-1
    })
    this.getInfo()
  },

  getInfo(){
    let flag = this.data.titleFlag[this.data.title]
    let id = this.data.id
    let datasList = this.data[flag]
    this.data.datasList.push(...datasList)
    this.setData({
      datasList: this.data.datasList
    })
  },

  scrolltolower(e){
    wx.showLoading({
      title: '加载中...'
    })
    this.getInfo()
    wx.hideLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
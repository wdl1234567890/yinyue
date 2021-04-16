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
    // showSongListAction:false,
    themeColor: app.globalData.themeColor,
    musicInfo:{},
    // actions:[
    //   {
    //     id:1,
    //     icon:'camera',
    //     text:'播放',
    //   },
    //   {
    //     id: 2,
    //     icon: 'camera',
    //     text: '下一首播放',
    //   },
    //   {
    //     id: 3,
    //     icon: 'camera',
    //     text: '收藏到歌单',
    //   },
    //   {
    //     id: 4,
    //     icon: 'camera',
    //     text: '下载',
    //   },
    //   {
    //     id: 5,
    //     icon: 'camera',
    //     text: '评论',
    //   }
    // ],
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
    songDatas:[
      {
        id:1,
        singName:"歌曲1",
        singerName:"歌手1",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount:100,
        isVip:true,
      },
      {
        id: 2,
        singName: "歌曲2",
        singerName: "歌手2",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 122,
        isVip: true,
      },
      {
        id: 3,
        singName: "歌曲3",
        singerName: "歌手3",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 1,
        isVip: false,
      },
      {
        id: 4,
        singName: "歌曲4",
        singerName: "歌手4",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 504,
        isVip: false,
      },
      {
        id: 5,
        singName: "歌曲5",
        singerName: "歌手5",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 235,
        isVip: false,
      },
      {
        id: 6,
        singName: "歌曲6",
        singerName: "歌手6",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 152,
        isVip: false,
      },
      {
        id: 7,
        singName: "歌曲7",
        singerName: "歌手7",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 1000,
        isVip: false,
      },
      {
        id: 8,
        singName: "歌曲8",
        singerName: "歌手8",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 1277,
        isVip: false,
      },
      {
        id: 9,
        singName: "歌曲9",
        singerName: "歌手9",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 106,
        isVip: false,
      },
      {
        id: 10,
        singName: "歌曲10",
        singerName: "歌手10",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 640,
        isVip: false,
      },
    ],
    songListDatas: [
      { 
        id: 1, 
        cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg", 
        title: "歌单1", 
        count:3
      },
      {
        id: 2,
        cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        title: "歌单2",
        count:2
      },
      {
        id: 3,
        cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        title: "歌单3",
        count:2
      }
    ],
    singerDatas:[]
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let searchValue = options.search ?options.search.trim():''
    let that = this
    httpGet("/search/" + encodeURI(searchValue)).then(({songs,songLists,singers}) => {
      that.setData({
        songDatas:songs,
        songListDatas:songLists,
        singerDatas:singers
      })
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
// subpackages-comment/pages/comment/comment.js
let { httpGet, httpPost, httpPostWithToken } = require('../../../network/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songOrListInfo:{
      id:-1,
      info:"info",
      cover:"https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
      singName:"歌曲名",
      singerName:"歌手"
    },
    showCommentModal:false,
    commentData:[
      {
        id:1,
        replyCount: 0,
        replyFromInfo:{},
        commentDate: 1614501113887,
        comment:"这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！",
        userName:"茯苓",
        upCount:10,
        avator:"https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        isUp:true

      },
      {
        id: 2,
        replyCount: 0,
        replyFromInfo: {},
        commentDate: 1614501113887,
        comment: "这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！",
        userName: "茯苓",
        upCount: 12,
        avator: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        isUp: false

      },
      {
        id: 3,
        replyCount: 1,
        replyFromInfo: {},
        commentDate: 1614501113887,
        comment: "这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！",
        userName: "茯苓",
        upCount: 1,
        avator: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        isUp: true

      },
      {
        id: 4,
        replyCount: 0,
        replyFromInfo: {},
        commentDate: 1614501113887,
        comment: "这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！",
        userName: "茯苓",
        upCount: 0,
        avator: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        isUp: false

      }
    ],
    replyData: [
      {
        id: 1,
        replyCount: 0,
        replyFromInfo: {},
        commentDate: 1614501113887,
        comment: "这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！",
        userName: "茯苓1号",
        upCount: 10,
        avator: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        isUp: true

      },
      {
        id: 2,
        replyCount: 0,
        replyFromInfo: {
          userName:"茯苓1号",
          comment:"哈哈哈哈"
        },
        commentDate: 1614501113887,
        comment: "这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！这首歌也太好听了吧！！！",
        userName: "茯苓2号",
        upCount: 12,
        avator: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        isUp: false

      }
    ],
    replyComment: null,
    inputFocus:false,
    willReplyItem:null,
    inputValue:"",
    flag:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //flag:1,从播放页面进入;2,从个人评论主页进入
    let flag = options.flag
    let that = this
    let songOrListInfo = {}
    songOrListInfo.id = options.id
    this.setData({
      flag,
      songOrListInfo,
      replyComment: this.data.songOrListInfo,
      willReplyItem: this.data.songOrListInfo
    })

    httpGet('/comment/songOrList/' + songOrListInfo.id).then(commentData=>{
      that.setData({commentData})
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
  showReply(e){
    let currentItem = this.data.commentData[e.detail]
    currentItem.info="info"
    let id = currentItem.id
    let that = this

    this.setData({
      replyComment: currentItem,
      showCommentModal:true,
      willReplyItem: currentItem,
      inputFocus: false,
      inputValue:""
    })
    httpGet('/comment/commenr/' + id).then(replyData=>{
      that.setData({
        replyData
      })
    })
  },
  hideModal(e) {
    this.data.replyComment.info=undefined
    this.setData({
      showCommentModal: false,
      replyComment: this.data.songOrListInfo,
      willReplyItem: this.data.songOrListInfo,
      inputFocus:false,
      inputValue:""
    })
  },
  tapItem(e){
    let willReplyItem
    let index = e.currentTarget.dataset.id
    let isTop = e.detail.isTop

    if (this.data.replyComment != this.data.songOrListInfo && isTop){
      this.setData({
        inputFocus: false,
        willReplyItem: this.data.replyComment
      })
      return
    }

    if (this.data.willReplyItem == this.data.songOrListInfo && this.data.replyComment == this.data.songOrListInfo &&!this.data.inputFocus){
      willReplyItem = this.data.commentData[index]
    } else if (this.data.willReplyItem == this.data.songOrListInfo && this.data.replyComment == this.data.songOrListInfo && this.data.inputFocus) {
      willReplyItem = this.data.songOrListInfo
    }
     else if (this.data.willReplyItem != this.data.songOrListInfo && this.data.replyComment == this.data.songOrListInfo){
      willReplyItem = this.data.songOrListInfo
    } else if (this.data.willReplyItem == this.data.replyComment && !this.data.inputFocus) {
      willReplyItem = this.data.replyData[index]
    } else if (this.data.willReplyItem == this.data.replyComment && this.data.inputFocus) {
      willReplyItem = this.data.replyComment
    } 
    else if (this.data.willReplyItem != this.data.replyComment && this.data.replyComment != this.data.songOrListInfo) {
      willReplyItem = this.data.replyComment
    }
    
    this.setData({
      inputFocus: !this.data.inputFocus,
      willReplyItem: willReplyItem
    })
  },
  focusEvent(e){
    this.setData({
      inputFocus:true
    })
  },
  blurEvent(e){
    this.setData({
      inputFocus:false
    })
  },
  goToMusicPlayPage(e){
    wx.navigateTo({
      url: '/subpackages-music/pages/music-play/music-play?id=' + this.data.songOrListInfo.id
    })
  },
  sendComment(e){
    let content = e.detail
    let songOrListId = this.data.songOrListInfo.id
    let fromId = this.data.willReplyItem.id
    let data = {}
    data.songOrListId = songOrListId
    data.fromComment.id = fromId
    httpPostWithToken('/comment', data).then(res=>{
      wx.showToast({
        title: '评论已发送',
        icon:'none'
      })
    }).catch(res=>{
      wx.showToast({
        title: '评论发送失败',
        icon: 'none'
      })
    })
  }
})
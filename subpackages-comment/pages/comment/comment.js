// subpackages-comment/pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singInfo:{
      id:-1,
      info:"info"
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
    inputValue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let singInfo = this.data.singInfo
    singInfo.id = options.id
    this.setData({
      singInfo,
      replyComment: this.data.singInfo,
      willReplyItem: this.data.singInfo
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
    //TODO request 
    this.setData({
      replyComment: currentItem,
      showCommentModal:true,
      willReplyItem: currentItem,
      inputFocus: false,
      inputValue:""
    })
  },
  hideModal(e) {
    this.data.replyComment.info=undefined
    this.setData({
      showCommentModal: false,
      replyComment: this.data.singInfo,
      willReplyItem: this.data.singInfo,
      inputFocus:false,
      inputValue:""
    })
  },
  tapItem(e){
    let willReplyItem
    let index = e.detail.id
    let isTop = e.detail.isTop

    if (this.data.replyComment != this.data.singInfo && isTop){
      this.setData({
        inputFocus: false,
        willReplyItem: this.data.replyComment
      })
      return
    }

    if (this.data.willReplyItem == this.data.singInfo && this.data.replyComment == this.data.singInfo &&!this.data.inputFocus){
      willReplyItem = this.data.commentData[index]
    } else if (this.data.willReplyItem == this.data.singInfo && this.data.replyComment == this.data.singInfo && this.data.inputFocus) {
      willReplyItem = this.data.singInfo
    }
     else if (this.data.willReplyItem != this.data.singInfo && this.data.replyComment == this.data.singInfo){
      willReplyItem = this.data.singInfo
    } else if (this.data.willReplyItem == this.data.replyComment && !this.data.inputFocus) {
      willReplyItem = this.data.replyData[index]
    } else if (this.data.willReplyItem == this.data.replyComment && this.data.inputFocus) {
      willReplyItem = this.data.replyComment
    } 
    else if (this.data.willReplyItem != this.data.replyComment && this.data.replyComment != this.data.singInfo) {
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
  }
})
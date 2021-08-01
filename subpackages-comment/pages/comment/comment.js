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
      cover:null,
      songName:null,
      singerName:null
    },
    commentCount:0,
    showCommentModal:false,
    commentData:[],
    replyData: [],
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
    songOrListInfo.cover=options.cover
    songOrListInfo.singerName=options.singerName
    songOrListInfo.songName=options.songName
    songOrListInfo.info='info'
    console.log(songOrListInfo)
    this.setData({
      flag,
      songOrListInfo,
      replyComment: songOrListInfo,
      willReplyItem: songOrListInfo
    })

    httpGet('comment-service//comment/songOrList/' + songOrListInfo.id).then(commentData=>{
      let commentCount = 0
      commentData.forEach(comment => commentCount = commentCount + 1 + comment.replyCount)
      that.setData(
        {
          commentData,
          commentCount
        }
      )
    })
  },

  showReply(e){
    let currentItem = this.data.commentData[e.currentTarget.dataset.id]
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
    httpGet('comment-service//comment/comment/' + id).then(replyData=>{
      that.setData({
        replyData
      })
    })
  },
  hideModal(e) {
    let that = this
    this.data.replyComment.info=undefined
    this.setData({
      showCommentModal: false,
      replyComment: this.data.songOrListInfo,
      willReplyItem: this.data.songOrListInfo,
      inputFocus:false,
      inputValue:""
    })
    httpGet('comment-service//comment/songOrList/' + this.data.songOrListInfo.id).then(commentData => {
      let commentCount = 0
      commentData.forEach(comment => commentCount = commentCount + 1 + comment.replyCount)
      that.setData(
        {
          commentData,
          commentCount
        }
      )
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
    if (this.data.songOrListInfo.singerName){
      wx.navigateTo({
        url: '/subpackages-music/pages/music-play/music-play?id=' + this.data.songOrListInfo.id
      })
    }else{
      wx.navigateTo({
        url: '/subpackages-song-list/pages/song-list-detail/song-list-detail?flag=5' + '&id=' + this.data.songOrListInfo.id
      })
    }
    
  },
  sendComment(e){
    let content = e.detail
    let songOrListId = this.data.songOrListInfo.id
    let fromId = this.data.willReplyItem.id != -1 ? this.data.willReplyItem.id : songOrListId
    let data = {}
    let that = this
    data.songOrListId = songOrListId
    data.fromComment = {
      id: fromId
    }
    data.metaObj={
      firstFromId: this.data.replyComment.id
    }
    data.content = content
    httpPostWithToken('comment-service//comment', data).then(res=>{
      wx.showToast({
        title: '评论成功',
        icon:'none'
      })
      httpGet('comment-service//comment/songOrList/' + that.data.songOrListInfo.id).then(commentData => {
        let commentCount = 0
        commentData.forEach(comment => commentCount = commentCount + 1 + comment.replyCount)
        that.setData(
          {
            commentData,
            commentCount
          }
        )
      })
      httpGet('comment-service//comment/comment/' + that.data.replyComment.id).then(replyData => {
        that.data.replyComment.replyCount=replyData.length
        that.setData({
          replyData,
          replyComment: that.data.replyComment
        })
      })
      that.setData({
        inputValue:''
      })
    }).catch(res=>{
      wx.showToast({
        title: '评论失败',
        icon: 'none'
      })
    })
  }
})
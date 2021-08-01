// subpackages-comment/pages/profile-comment/profile-comment.js
let { httpGet, httpPost, httpPutWithToken, httpGetWithToken } = require('../../../network/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentDatas:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getComments()
  },

  getComments(){
    httpGetWithToken('comment-service//comment/user').then(commentDatas=>{
      commentDatas = commentDatas.filter(comment => comment.content !='该评论已删除')
      this.setData({commentDatas})
    })
  },
  removeComment(e){
    let index = e.currentTarget.dataset.id
    this.data.commentDatas.splice(index,1)
    this.setData({
      commentDatas: this.data.commentDatas
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
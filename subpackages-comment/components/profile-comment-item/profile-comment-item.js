// subpackages-comment/components/profile-comment-item/profile-comment-item.js
const app = getApp()
let Store = require('../../../common/utils/store/store.js')
let { httpPut, httpDeleteWithToken} = require('../../../network/httpClient.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowBorder: {
      type: Boolean,
      value: true
    },

    itemId: {
      type: String,
      value: -1
    },

    musicInfo:{
      type:Object,
      value:null
    },
  
    songListInfo:{
      type:Object,
      value:null
    },
    
    replyFromInfo: {
      type: Object,
      value: {}
    },
    commentDate: {
      type: String,
      value: 0
    },
    comment: {
      type: String,
      value: "评论内容"
    },
    upCount: {
      type: Number,
      value: 0
    }
  },

  ready() {
    let that = this
    Store.isUpThumbList(this.data.itemId).then(isUp=>{
      that.setData({isUp})
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    shortComment: "",
    isMore: false,
    isUp:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeUp(e) {
      let isUp = this.data.isUp
      if (isUp) {
        httpPut("comment-service//comment/cancelThumb/" + this.data.itemId).then(res=>{
          this.setData({
            upCount: this.data.upCount - 1,
            isUp: !isUp
          })
          Store.cancelUpThumbList(this.data.itemId)
        })
      } else {
        httpPut("comment-service//comment/thumb/" + this.data.itemId).then(res=>{
          this.setData({
            upCount: this.data.upCount + 1,
            isUp: !isUp
          })
          Store.addUpThumbList(this.data.itemId)
        })
      }
    },
    tapItem(e) {
      let datas = {
        // isTop: this.data.isTop,
        id: this.data.itemId
      }
      this.triggerEvent('tapitem', datas)
    },
    changeIsMore(e) {
      // if (this.data.isFocus) {
      //   this.tapItem(e)
      //   return
      // }
      this.setData({
        isMore: !this.data.isMore
      })
    },
    removeComment(){
      let that = this
      wx.showModal({
        title: '删除评论',
        content: '是否删除评论' + that.data.comment,
        success(res){
          if(res.confirm){
            httpDeleteWithToken('comment-service//comment/' + that.data.itemId).then(res => {
              Store.cancelUpThumbList(that.data.itemId)
              wx.showToast({
                title: '评论删除成功',
                icon: 'none'
              })
              that.triggerEvent('removecomment', that.data.itemId)
            })
          }
        }
      })
      
    },
    goToSongCommentPage(e){
      let id = -1
      let cover = ''
      let title = ''
      let singerName = ''
      if (this.data.musicInfo){
        id = this.data.musicInfo.id
        cover = this.data.musicInfo.cover
        title = this.data.musicInfo.songName
        singerName = this.data.musicInfo.singerName
      } else if (this.data.songListInfo){
        id = this.data.songListInfo.id
        cover = this.data.songListInfo.cover
        title = this.data.songListInfo.title
      }
      wx.navigateTo({
        url: '/subpackages-comment/pages/comment/comment?flag=2&id='+id+'&songName='+title+'&singerName='+singerName+'&cover='+cover
      })
    }
  }
})

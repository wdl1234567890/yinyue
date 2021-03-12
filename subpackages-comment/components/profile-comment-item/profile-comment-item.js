// subpackages-comment/components/profile-comment-item/profile-comment-item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isUp: {
      type: Boolean,
      value: false
    },
    isShowBorder: {
      type: Boolean,
      value: true
    },

    itemId: {
      type: Number,
      value: -1
    },

    musicInfo:{
      type:Object,
      value:{}
    },
    
    replyFromInfo: {
      type: Object,
      value: {}
    },
    commentDate: {
      type: Number,
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

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    shortComment: "",
    isMore: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeUp(e) {
      let isUp = this.data.isUp
      if (isUp) {
        this.setData({
          upCount: this.data.upCount - 1
        })
      } else {
        this.setData({
          upCount: this.data.upCount + 1
        })
      }
      this.setData({
        isUp: !isUp
      })
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
    goToSongCommentPage(e){
      wx.navigateTo({
        url: '/subpackages-comment/pages/comment/comment?flag=2&id='+this.data.musicInfo.id
      })
    }
  }
})

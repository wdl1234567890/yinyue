// subpackages-comment/components/comment-item/comment-item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemId:{
      type:Number,
      value:-1
    },
    replyCount:{
      type:Number,
      value:0
    },
    replyFromInfo:{
      type:Object,
      value:{
        userName:"",
        comment:""
      }
    },
    commentDate:{
      type:Number,
      value:0
    },
    comment:{
      type:String,
      value:"评论内容"
    },
    userName:{
      type:String,
      value:"昵称"
    },
    upCount:{
      type:Number,
      value:0
    },
    avator:{
      type:String,
      value:""
    },
    isUp:{
      type:Boolean,
      value:false
    },
    isShowBorder:{
      type:Boolean,
      value:true
    },
    isTop:{
      type:Boolean,
      value:false
    },
    isFocus:{
      type:Boolean,
      value:false
    }
  },

  

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    shortComment:"",
    isMore:false
  },

  observers: {
    'comment': function (newComment) {
      if(newComment.length > 150)
      this.setData({
        shortComment: newComment.substring(0,150).concat('...')
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showReply(e){
      this.triggerEvent('showreply', this.data.itemId)
    },
    tapItem(e){
      let datas = {
        isTop:this.data.isTop,
        id: this.data.itemId
      }
      this.triggerEvent('tapitem', datas)
    },
    changeIsMore(e){
      if (this.data.isFocus){
        this.tapItem(e)
        return
      }
      this.setData({
        isMore:!this.data.isMore
      })
    },
    changeUp(e){
      let isUp = this.data.isUp
      if(isUp){
        this.setData({
          upCount: this.data.upCount-1
        })
      }else{
        this.setData({
          upCount: this.data.upCount+1
        })
      }
      this.setData({
        isUp:!isUp
      })
    }
  }
})

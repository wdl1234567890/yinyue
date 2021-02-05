// subpackages-comment/components/comment-item/comment-item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    reply:{
      type:Number,
      value:0
    },
    replyFromInfo:{
      type:Object,
      value:{}
    },
    isShowBorder:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showReply(e){
      this.triggerEvent('showreply', 1)
    }
  }
})

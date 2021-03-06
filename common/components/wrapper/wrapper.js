// common/components/wrapper/wrapper.js
let app = getApp()
let func = require('../../utils/func/wxml-element.js')
let Store = require('../../utils/store/store.js')
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持,
    
  },
  externalClasses: ['nav-bar-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    //normal:底部有播放条，play:底部没有元素，comment:底部有评论输入条，login:底部没有元素，payment:底部支付条
    mode:{
      type:String,
      value:'normal'
    },
    sumPrice:{
      type:Number,
      value:0
    },
    focus:{
      type:Boolean,
      value:false
    },
    willReplyItem:{
      type:Object,
      value:{}
    },
    inputValue:{
      type:String,
      value:""
    },
    hasMusicList:{
      type:Boolean,
      value:false
    },
    musicInfo:{
      type:Object,
      value:{}
    }
    // cover:{
    //   type:String,
    //   value:''
    // },
    // singName: {
    //   type: String,
    //   value: '歌名'
    // },
    // singerName: {
    //   type: String,
    //   value: '歌手'
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    topNavMargin: app.globalData.topNavMargin,
    commentInputBarBottom:0,
    commentInput:''
  },

  attached() {
    let that = this

    //获取内容容器的高度
    func.getScrollHeight(this).then(contentHeight => {
      that.setData({
        contentHeight
      })
      that.triggerEvent('getcontentheight', contentHeight)
    })
  },

  pageLifetimes: {
    async show () {
     let musicList = await Store.getCurrentMusicList()
     this.setData({
       hasMusicList: musicList.length!=0
     })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focus(e){
     let keyboardHeight=e.detail.height
     this.setData({
       commentInputBarBottom: keyboardHeight
     })
    this.triggerEvent('focus')
    },
    blur(e){
      this.setData({
        commentInputBarBottom: 0
      })
      this.triggerEvent('blur')
    },
    inputChange(e){
  
      this.setData({
        commentInput: e.detail.value.trim()
      })
    },
    sendComment(e){
      //request back list
      let content = this.data.commentInput
      if(content==''){
        wx.showToast({
          title: '是不是忘记输入内容啦~',
          icon:'none'
        })
        return;
      }
    },
   async musicPlayItemChange(e){
      let musicList = await Store.getCurrentMusicList()
      if (musicList.length==0){  
        this.setData({
          hasMusicList:false
        })
        return
      }
      // let datas = e ==null||e.detail==null?null:e.detail
      this.triggerEvent('musicplayitemchange', e.detail)
    },
    musicListChange(e){
      this.triggerEvent('musiclistchange',null)
    }
  }
})
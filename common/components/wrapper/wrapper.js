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
    //normal:底部有播放条，play:底部没有元素，comment:底部有评论输入条，login:底部没有元素，payment:底部支付条,batchMusicItem:单曲批量操作页面底部操作条,batchMusicList歌单批量操作页面底部条,batchMusicItemWithRemove:单曲批量操作页面底部操作条带删除按钮,edit编辑保存按钮,
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

  ready() {
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
    show () {
      Store.getCurrentMusicList().then(res=>{
        let musicList = res
        this.setData({
          hasMusicList: musicList.length != 0
        })
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
      let content = this.data.commentInput.trim()
      if(content==''){
        wx.showToast({
          title: '是不是忘记输入内容啦~',
          icon:'none'
        })
      }else{
        this.triggerEvent('sendcomment',content)
      }
    },
   musicPlayItemChange(e){
     Store.getCurrentMusicList().then(res=>{
       let musicList = res
       if (musicList.length == 0) {
         this.setData({
           hasMusicList: false
         })
         return
       }
       this.triggerEvent('musicplayitemchange', e.detail)
     })
      
    },
    musicListChange(e){
      this.triggerEvent('musiclistchange',null)
    },
    tapAddNextSong(e){
      this.triggerEvent('tapaddnextsong', null)
    },
    tapAddToSongList(e){
      this.triggerEvent('tapaddtosonglist', null)
    },
    tapDownload(e){
      this.triggerEvent('tapdownload', null)
    },
    tapRemove(e){
      this.triggerEvent('tapremove', null)
    },
    tapSave(e){
      this.triggerEvent('tapsave', null)
    },
    tapPay(e){
      
      this.triggerEvent('tappay', null)
    }
  }
})
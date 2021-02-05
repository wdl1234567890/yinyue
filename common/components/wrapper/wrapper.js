// common/components/wrapper/wrapper.js
let app = getApp()
let func = require('../../utils/func/wxml-element.js')
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  externalClasses: ['nav-bar-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    //normal:底部有播放条，play:底部没有元素，comment:底部有评论输入条
    mode:{
      type:String,
      value:'normal'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    topNavMargin: app.globalData.topNavMargin,
    commentInputBarBottom:0
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

  /**
   * 组件的方法列表
   */
  methods: {
    focus(e){
     let keyboardHeight=e.detail.height
     this.setData({
       commentInputBarBottom: keyboardHeight
     })
    },
    blur(e){
      this.setData({
        commentInputBarBottom: 0
      })
    }
  }
})
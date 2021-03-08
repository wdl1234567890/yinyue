// subpackages-search/components/collect-song-list-item/collect-song-list-item.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    thumbSize: {
      type: Number,
      value: 140
    },
    itemId:{
      type:Number,
      value:-1
    },
    srcUrl: {
      type: String,
      value: ''
    },
    topTitle: {
      type: String,
      value: '上标题'
    },
    bottomTitle: {
      type: String,
      value: '下标题'
    },
    hasBottomTitle:{
      type:Boolean,
      value:false
    },
    hasAction:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapAction(e){

    },
    handleCheckChange(e){
      this.triggerEvent('handlecheckchange', { checked: e.detail,id:this.data.itemId})
    },
    tapItem(e){
      this.triggerEvent('tapitem',this.data.id)
    }
  }
})

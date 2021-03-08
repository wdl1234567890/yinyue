// subpackages-search/components/batch-action-sing-item/batch-action-sing-item.js
let app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    singName:{
      type:String,
      value:"歌名"
    },
    singerName:{
      type:String,
      value:"歌手名"
    },
    isVip:{
      type:Boolean,
      value:false
    },
    itemId:{
      type:Number,
      value:-1
    },
    checked:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    thumbSize: 140,
    themeColor: app.globalData.themeColor
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCheckChange(e){
      this.triggerEvent('handlecheckchange', { checked: e.detail, id: this.data.itemId })
    }
  }
})

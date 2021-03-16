// pages/components/square-card/square-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    size: {
      type: Number,
      value: 100
    },
    thumb: {
      type: String,
      value: ""
    },
    itemId:{
      type:Number,
      value:-1
    },
    info: {
      type: String,
      value: "内容正在加载中，请稍后......"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapItem(e){
      wx.navigateTo({
        url: '/subpackages-song-list/pages/song-list-detail/song-list-detail?id='+this.data.itemId
      })
      this.triggerEvent('tapitem',this.data.itemId)
    }
  }
})

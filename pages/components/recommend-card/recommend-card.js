// pages/components/recommend-card/recommend-card.js
Component({
  externalClasses: ['recommend-card-class', 'title-class', 'content-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    itemId:{
      type:Number,
      value:-1
    },
    title:{
      type: String,
      value: "热门歌单"
    },
    songsInfo:{
      type: Array,
      value: [
        "梦中的旅行家-RaJor",
        "错位时空-小玄子",
        "非我-凤凰大人"
      ]
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
      this.triggerEvent('tapitem', this.data.itemId)
    }
  }
})

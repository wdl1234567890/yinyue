// pages/components/recommend-card/recommend-card.js
Component({
  externalClasses: ['recommend-card-class', 'title-class', 'content-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    itemId:{
      type:String,
      value:-1
    },
    title:{
      type: String,
      value: ""
    },
    songsInfo:{
      type: Array,
      value: [
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

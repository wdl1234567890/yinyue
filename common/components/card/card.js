// common/components/card/card.js
Component({
  externalClasses: ['card-title-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    cardTitle: {
      type: String,
      value: '歌单'
    },
    enabelMore:{
      type:Boolean,
      value:true
    },
    enabelTitle:{
      type:Boolean,
      value:true
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
    tapMore(e){
      this.triggerEvent('tapmore', this.data.cardTitle)
    }
  }
})

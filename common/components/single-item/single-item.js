// subpackages-search/components/single-item/single-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemId:{
      type:Number,
      value:-1
    },
    singName:{
      type:String,
      value:"歌名"
    },
    singerName:{
      type:String,
      value:"歌手"
    },
    isVip:{
      type:Boolean,
      value:false
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
    tapSwitch(e){
      this.triggerEvent('tapswitch')
    },
    tapPlay(e){
      this.triggerEvent('tapplay', this.data.itemId)
    }
  }
})

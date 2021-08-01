// common/components/song-list-item/song-list-item.js
Component({
  externalClasses: ['song-list-name-class','song-list-bottom-text-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    itemId:{
      type:String,
      value:-1
    },
    icon:{
      type:String,
      value:'switch'
    },
    isActionIcon: {
      type: Boolean,
      value: false
    },
    thumbSize:{
      type:Number,
      value:140
    },
    srcUrl:{
      type:String,
      value:''
    },
    topTitle:{
      type:String,
      value:'上标题'
    },
    bottomTitle:{
      type:String,
      value:'下标题'
    },
    flag:{
      type:Number,
      value:4
    },
    isActive:{
      type:Boolean,
      value:true
    }
    //茯苓最近听的歌单
    //https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg
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
    tapIcon(e){
      this.triggerEvent('tapicon', { id: this.data.itemId, title: this.data.topTitle})
    },
    tapItem(e){
      if(this.data.isActive)
      wx.navigateTo({
        url: '/subpackages-song-list/pages/song-list-detail/song-list-detail?flag='+this.data.flag+'&id=' + this.data.itemId
      })
      this.triggerEvent('tapitem',this.data.itemId)
    }
  }
})

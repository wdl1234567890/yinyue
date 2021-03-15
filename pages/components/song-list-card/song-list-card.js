// pages/components/song-list-card/song-list-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showAddButton:{
      type:Boolean,
      value:false
    },
    title:{
      type:String,
      value:"标题"
    },
    musicLists:{
      type:Array,
      value:[]
    },
    flag:{
      type:Number,
      value:4
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
    tapAdd(e){
      this.triggerEvent('tapadd', this.data.title)
    },
    tapSwitch(e){
      this.triggerEvent('tapswitch', this.data.title)
    },
    tapItemSwitch(e){
      let id = e.detail.id
      let title = e.detail.title
      let index = e.currentTarget.dataset.index
      this.triggerEvent('tapitemswitch', { id, title, type: this.data.title, index})
    }
  }
})

// common/components/back-button/back-button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color:{
      type:String,
      value:'#888'
    },
    disabledAutoBack:{
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
    back(e){
      if (!this.data.disabledAutoBack)wx.navigateBack()
      
    }
  }
})

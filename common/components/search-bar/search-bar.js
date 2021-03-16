// common/component/search-bar/search-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchValue: {
      type:String,
      value:''
    },
    disabled:{
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
    search(e){
      let value=e.detail.value.trim()
      if (value==null||value==''){
        wx.showToast({
          title: '搜索内容不能能为空！',
          icon:'none'
        })
        return
      }
      this.triggerEvent('search', value)
    }
  }
})

// pages/sub-pages/components/profile-detail-card/profile-detail-card.js
Component({
  externalClasses: ['profile-detail-card-class'],
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:""
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
    tapEditor(e){
      wx.navigateTo({
        url: '/pages/sub-pages/editor-base-info/editor-base-info'
      })
    }
  }
})

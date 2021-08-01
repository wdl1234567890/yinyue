// subpackages-search/components/search-label-scroll-bar/search-label-scroll-bar.js
let Store = require('../../../common/utils/store/store.js')
Component({
  externalClasses: ['search-label-scroll-bar-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      value: ""
    },
    labels:{
      type: Array,
      value: []
    },
    enableRemove:{
      type:Boolean,
      value:false
    },
    isMoving:{
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
    remove(e){
      this.setData({
        isMoving:true
      })
    },
    finish(e){
      this.setData({
        isMoving: false
      })
    },
    removeAll(e){
      let that = this
      wx.showModal({
        title: '是否删除全部？',
        confirmText:'删除',
        success(res){
          if (res.confirm) {
            that.setData({
              isMoving:false
            })
            that.triggerEvent('removelabel', [])
            Store.setHistorySearch([])
            wx.showToast({
              title: '已删除全部内容！',
              icon:'none'
            })
          }
        }
      })
    },
    cancel(e){
      let value=e.detail
      let labels = this.data.labels
      labels.splice(labels.indexOf(value),1)
      this.triggerEvent('removelabel', labels)
      Store.setHistorySearch(labels)
    },
    taplabel(e){
      let value = e.detail.value
      this.triggerEvent('taplabel', value)
      wx.navigateTo({
        url: '/subpackages-search/pages/search-result/search-result?search='+ value
      })
    }
  }
})

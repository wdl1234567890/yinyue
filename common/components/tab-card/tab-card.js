// common/components/tab-card/tab-card.js
let func = require('../../../common/utils/func/wxml-element.js')
Component({
  externalClasses: ['card-tab-bar-class'],

  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabTitles:{
      type:Array,
      value:[]
    },
    contentHeight:{
      type:Number,
      value:200
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTabId:0
  },

  attached(){
    let that = this
    //获取tab-bar的高度
    func.getElementHeight(this,'.fixed-element').then(res => {
      that.setData({
        tabbarHeight:res
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTabItem(event){
      let index = event.detail
      this.setData({
        currentTabId:index
      })
      this.triggerEvent('clicktabitem', index)
    }
  }
})

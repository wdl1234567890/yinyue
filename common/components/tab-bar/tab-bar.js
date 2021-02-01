// common/components/tab-bar/tab-bar.js
Component({
  externalClasses: ['tab-bar-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    tabTitles: {
      type: Array,
      value: []
    },
    currentTabId: {
      type: Number,
      value: 0
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
    clickTabItem(event) {
      let index = event.currentTarget.dataset.index
      this.setData({
        currentTabId: index
      })

      this.triggerEvent('clicktabitem', index)
    }
  }
})

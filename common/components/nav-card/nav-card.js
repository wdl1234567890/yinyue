// common/components/nav-card/nav-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navItems:{
      type:Array,
      value:[]
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
    tapNavItem(e){
      let index = e.currentTarget.dataset.index
      this.triggerEvent('tapnavitem', index)
    }
  }
})

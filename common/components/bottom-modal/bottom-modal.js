// common/components/bottom-modal/bottom-modal.js
Component({
  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true
  },
  externalClasses: ["bottom-modal-container-class"],
  /**
   * 组件的属性列表
   */
  properties: {
    isShow:{
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
    // hideModal(e) {
    //   this.setData({
    //     isShow: false
    //   })
    // }
    bgTap(e){
      this.triggerEvent('bgtap')
    },
    tap(e){
    }
  }
})

// pages/components/card-swiper/card-swiper.js
Component({

  externalClasses: ['swiper-item-class'],

  options: {
    styleIsolation: 'apply-shared'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    indicatorActiveColor: {
      type: String,
      value: '#ffb5b0'
    },
    indicatorColor: {
      type: String,
      value: '#fadbd9'
    },
    swiperList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cardCur: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    tapItem(e){
      this.triggerEvent('tapitem', e.currentTarget.dataset.id)
    }
  }
})
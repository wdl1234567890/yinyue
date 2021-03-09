// common/components/my-radio/my-radio.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checked:{
      type:Boolean,
      value:false
    },
    size:{
      type:Number,
      value:20
    },
    innerHandle:{
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
    change(e){
      let checked = this.data.checked
      if(this.data.innerHandle){
        this.setData({
          checked: !checked
        })
      }

      this.triggerEvent('change', !checked)
    
    }
  }
})

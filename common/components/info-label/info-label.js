// common/components/info-label/info-label.js
let app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:String,
      value:"标签"
    },
    enabelCancel:{
      type:Boolean,
      value:false
    },
    enabelActive:{
      type:Boolean,
      value:false
    },
    size:{
      type:Number,
      value: 20
    },
    padding:{
      type:String,
      value:"10rpx 20rpx"
    },
    textColor:{
      type:String,
      value:"#333"
    },
    activeTextColor:{
      type: String,
      value:"#fff"
    },
    labelColor:{
      type:String,
      value:"#eee"
    },
    activeLabelColor: {
      type: String,
      value:app.globalData.themeColor
    },
    isActive:{
      type:Boolean,
      vaule:false
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
    cancel(e){
      this.triggerEvent('cancel', this.data.value)
    },
    tapLabel(e){
      if (this.data.enabelActive){
        this.setData({
          isActive: !this.data.isActive
        })
      }
      this.triggerEvent('taplabel', {value:this.data.value,isActive:this.data.isActive})
    }
  }
})

// app.js
let systemInfo = wx.getSystemInfoSync()
let menuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect()
let Store = require('./common/utils/store/store.js')
//全局播放计时器
function calPlayTime(){
  let stopIntervalNumber = setInterval(res=>{
    Store.addCurrentPlayTimeStepOne()
  },1000)
  Store.setStopIntervalNumber(stopIntervalNumber)
}

App({
  
  globalData: {
    themeBg: "rgba(253, 253, 253, 0.418)",
    themeModuleColor: "rgba(253, 253, 253, 1)",
    themeColor: "rgba(255,181,185,1)",
    systemInfo,
    menuButtonBoundingClientRect,
    topNavMargin: (menuButtonBoundingClientRect.top - systemInfo.statusBarHeight) * 2 + menuButtonBoundingClientRect.height + systemInfo.statusBarHeight,
    calPlayTime
  }
})

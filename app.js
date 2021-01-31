// app.js
let systemInfo = wx.getSystemInfoSync()
let menuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect()
App({
  
  globalData: {
    themeBg: "rgba(253, 253, 253, 0.418)",
    themeModuleColor: "rgba(253, 253, 253, 1)",
    themeColor: "rgba(255,181,185,1)",
    systemInfo,
    menuButtonBoundingClientRect,
    topNavMargin: (menuButtonBoundingClientRect.top - systemInfo.statusBarHeight) * 2 + menuButtonBoundingClientRect.height + systemInfo.statusBarHeight
  }
})

// app.js
let systemInfo = wx.getSystemInfoSync()
let menuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect()
// let Store = require('./common/utils/store/store.js')
// let getCurrentPlayMusic = await function(){
//   return Store.getStorage("currentPlayMusic")
// }
// let getCurrentMusicList = await function () {
//   return Store.getStorage("currentMusicList")
// }
// let getCurrentPlayMusicIndex = function(currentMusicList, currentPlayMusic){
//   let length = currentMusicList.length
//   for (let i = 0; i < length; i++){
//     if (currentMusicList[i].id == currentPlayMusic.id)return i
//   }
//   return -1;
// }
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

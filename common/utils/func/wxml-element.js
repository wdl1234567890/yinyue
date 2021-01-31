let app = getApp()
function getScrollHeight(){
  return new Promise((resolve, reject)=>{
    let query = wx.createSelectorQuery()
    query.selectAll(".fixed-element").boundingClientRect(res => {
      let topHeight = res[0].height
      let bottomHeight = res[1].height
      console.log(topHeight)
      console.log(bottomHeight)
      let allHeight = app.globalData.systemInfo.windowHeight
      let scrollHeight = allHeight - topHeight - bottomHeight
      resolve(scrollHeight)
    }).exec()
  })
}
module.exports={
  getScrollHeight
}
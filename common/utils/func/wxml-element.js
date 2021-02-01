let app = getApp()
function getScrollHeight(module){
  return new Promise((resolve, reject)=>{
    let query
    if(module == '' || module == undefined)query = wx.createSelectorQuery()
    else query = module.createSelectorQuery()
    query.selectAll(".fixed-element").boundingClientRect(res => {
      let currentHeight = 0
      for(let i=0;i<res.length;i++){
        currentHeight += res[i].height
      }
      let allHeight = app.globalData.systemInfo.windowHeight
      let scrollHeight = allHeight - currentHeight
      resolve(scrollHeight)
    }).exec()
  })
}
function getElementHeight(module,ele){
  return new Promise((resolve, reject) => {
    let query
    if (module == '' || module == undefined) query = wx.createSelectorQuery()
    else query = module.createSelectorQuery()
    query.select(ele).boundingClientRect(res => {
      resolve(res.height)
    }).exec()
  })
}
module.exports={
  getScrollHeight,
  getElementHeight
}
function setStorage(key, value){
  return new Promise((resolve,reject)=>{
    wx.setStorage({
      key: key,
      data: value,
      success(res){
        resolve(res)
      },
      fail(res){
        reject(res)
      }
    })
  })
}

function addStorage(key,value){
  let styleLabel=[]
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success(res) {
        styleLabel = res.data
      },
      complete(res){
        styleLabel.push(value)
        wx.setStorage({
          key: key,
          data: styleLabel,
          success(res){   
            resolve(styleLabel)
          },
          fail(res){
            reject(res)
          }
        })
      }
    })
  })
  
}

function getStorage(key){
  return new Promise((resolve, reject)=>{
    wx.getStorage({
      key: key,
      success(res) {
        resolve(res.data)
      },
      fail(res){
        reject(res)
      }
    })
  })
}

function removeStorage(key,value){
  return new Promise((resolve,reject)=>{
    wx.getStorage({
      key: key,
      success(res) {
        let choosedStyles = res.data
        choosedStyles.splice(choosedStyles.indexOf(value),1)
        wx.setStorage({
          key: key,
          data: choosedStyles,
          success(res) {   
            resolve(choosedStyles)
          },
          fail(res) {
            reject(res)
          }
        })
      },
      fail(res){
        reject(res)
      }
    })
    
  })
}

module.exports = {
  setStorage,
  addStorage,
  getStorage,
  removeStorage
}
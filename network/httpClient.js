let Store = require('../common/utils/store/store.js')
const urlPre = 'http://81.69.232.23:8020/'
function httpGet(url){
  url = urlPre + url
  return new Promise((resolve,reject)=>{
    wx.request({
      url,
      method:'GET',
      success(res) {
        let data = res.data
        if (res.statusCode == 200 && data.success){
          resolve(data.data)
        }else{
          wx.showToast({
            title: data.message,
            icon: 'none'
          })
          reject(data.message)
        }
      },
      fail(res) {
        wx.showToast({
          title: '请求数据失败',
          icon: 'none'
        })
        reject('请求数据失败')
      }
    })
  })
  
}

function httpPost(url, data) {
  url = urlPre + url
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'POST',
      data,
      success(res) {
        let data = res.data
        if (res.statusCode == 200 && data.success) {
          resolve(data.data)
        } else {
          wx.showToast({
            title: data.message,
            icon: 'none'
          })
          reject(data.message)
        }
      },
      fail(res) {
        wx.showToast({
          title: '请求数据失败',
          icon: 'none'
        })
        reject('请求数据失败')
      }
    })
  })

}
function httpPut(url, data) {
  url = urlPre + url
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'PUT',
      data,
      success(res) {
        let data = res.data
        if (res.statusCode == 200 && data.success) {
          resolve(data.data)
        } else {
          wx.showToast({
            title: data.message,
            icon: 'none'
          })
          reject(data.message)
        }
      },
      fail(res) {
        wx.showToast({
          title: '请求数据失败',
          icon: 'none'
        })
        reject('请求数据失败')
      }
    })
  })

}

function httpGetWithToken(url,required=true) {
  if (required)url = urlPre + url + '/withtoken'
  else url = urlPre + url
  return new Promise((resolve, reject) => {
    Store.getToken().then(res => {
      if (res != null && res != undefined && res != '') {
        resolve(res)
        return
      } else if (required){
        wx.showModal({
          title: '请先登录',
          confirmText: '登录',
          success(res1) {
            if (res1.confirm) {
              wx.navigateTo({
                url: '/subpackages-login/pages/login/login',
              })
            }
          }
        })
      }
      resolve('')
    })
    
  }).then(token => {
    if (required && (token == null || token == undefined || token == '') ){
      return Promise.resolve('')
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: 'GET',
        header: {
          token
        },
        success(res) {
          let data = res.data
          if (res.statusCode == 200 && data.success) {
            if (data.code == 20000) resolve(data.data)
            else if (data.code == 40002 || data.code == 40003) {
              Store.clearUserInfo()
              Store.clearToken()
              wx.showModal({
                title: '登录已过期，请重新登录',
                confirmText: '登录',
                success(res1) {
                  wx.navigateTo({
                    url: '/subpackages-login/pages/login/login'
                  })
                }
              })
            }
          } else {
            wx.showToast({
              title: data.message,
              icon: 'none'
            })
            reject(data.message)
          }
        },
        fail(res) {
          wx.showToast({
            title: '请求数据失败',
            icon: 'none'
          })
          reject('请求数据失败')
        }
      })
    })
  })

}

function httpPostWithToken(url, data, required = true) {
  url = urlPre + url + '/withtoken'
  return (new Promise((resolve, reject) => {
    Store.getToken().then(res=>{
      if(res != null && res != undefined && res != ''){
        resolve(res)
        return
      }else{
        wx.showModal({
          title: '请先登录',
          confirmText: '登录',
          success(res1){
            if (res1.confirm){
              wx.navigateTo({
                url: '/subpackages-login/pages/login/login',
              })
            }
          }
        })
        resolve('')
      }
      
    })
  })).then(token=>{
    if (token == null || token == undefined || token == '') {
      return Promise.resolve('')
    }
    return new Promise((resolve,reject)=>{
      wx.request({
        url,
        method: 'POST',
        data,
        header: {
          token
        },
        success(res) {
          let data = res.data
          if (res.statusCode == 200 && data.success) {
            if (data.code == 20000) resolve(data.data)
            else if (data.code == 40002 || data.code == 40003) {
              Store.clearUserInfo()
              Store.clearToken()
              wx.showModal({
                title: '登录已过期，请重新登录',
                confirmText: '登录',
                success(res1) {
                  wx.navigateTo({
                    url: '/subpackages-login/pages/login/login'
                  })
                }
              })
            }
          } else {
            wx.showToast({
              title: data.message,
              icon: 'none'
            })
            reject(data.message)
          }
        },
        fail(res) {
          wx.showToast({
            title: '请求数据失败',
            icon: 'none'
          })
          reject('请求数据失败')
        }
      })
    })
  })

}

function httpPutWithToken(url, data, required = true) {
  url = urlPre + url + '/withtoken'
  return (new Promise((resolve, reject) => {
    Store.getToken().then(res => {
      if (res != null && res != undefined && res != '') {
        resolve(res)
        return
      } else {
        wx.showModal({
          title: '请先登录',
          confirmText: '登录',
          success(res1) {
            if (res1.confirm) {
              wx.navigateTo({
                url: '/subpackages-login/pages/login/login',
              })
            }
          }
        })
        resolve('')
      }

    })
  })).then(token => {
    if (token == null || token == undefined || token == '') {
      return Promise.resolve('')
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: 'PUT',
        data,
        header: {
          token
        },
        success(res) {
          let data = res.data
          if (res.statusCode == 200 && data.success) {
            if (data.code == 20000)resolve(data.data)
            else if (data.code == 40002 || data.code == 40003){
              Store.clearUserInfo()
              Store.clearToken()
              wx.showModal({
                title: '登录已过期，请重新登录',
                confirmText: '登录',
                success(res1){
                  wx.navigateTo({
                    url: '/subpackages-login/pages/login/login'
                  })
                }
              })
            }
          } else {
            wx.showToast({
              title: data.message,
              icon: 'none'
            })
            reject(data.message)
          }
        },
        fail(res) {
          wx.showToast({
            title: '请求数据失败',
            icon: 'none'
          })
          reject('请求数据失败')
        }
      })
    })
  })

}

function httpDeleteWithToken(url,data){
  url = urlPre + url + '/withtoken'
  return (new Promise((resolve, reject) => {
    Store.getToken().then(res => {
      if (res != null && res != undefined && res != '') {
        resolve(res)
        return
      } else {
        wx.showModal({
          title: '请先登录',
          confirmText: '登录',
          success(res1) {
            if (res1.confirm) {
              wx.navigateTo({
                url: '/subpackages-login/pages/login/login',
              })
            }
          }
        })
        resolve('')
      }

    })
  })).then(token => {
    if (token == null || token == undefined || token == '') {
      return Promise.resolve('')
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method: 'DELETE',
        data,
        header: {
          token
        },
        success(res) {
          let data = res.data
          if (res.statusCode == 200 && data.success) {
            if (data.code == 20000) resolve(data.data)
            else if (data.code == 40002 || data.code == 40003) {
              Store.clearUserInfo()
              Store.clearToken()
              wx.showModal({
                title: '登录已过期，请重新登录',
                confirmText: '登录',
                success(res1) {
                  wx.navigateTo({
                    url: '/subpackages-login/pages/login/login'
                  })
                }
              })
            }
          } else {
            wx.showToast({
              title: data.message,
              icon: 'none'
            })
            reject(data.message)
          }
        },
        fail(res) {
          wx.showToast({
            title: '请求数据失败',
            icon: 'none'
          })
          reject('请求数据失败')
        }
      })
    })
  })
}

module.exports = {
  httpGet,
  httpPost,
  httpPut,
  httpGetWithToken,
  httpPostWithToken,
  httpPutWithToken,
  httpDeleteWithToken,
  urlPre
}
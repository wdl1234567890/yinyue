// subpackages-login/pages/login/login.js
const app = getApp()
let Store = require('../../../common/utils/store/store.js')
let { httpGet, httpPost, httpPutWithToken } = require('../../../network/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false,
    checkedIndex: -1,
    current: 0,
    themeColor: app.globalData.themeColor,
    styleLabels: [],
    choosedStyles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    // Store.getStyleLabels().then(res => {
    //   that.setData({
    //     choosedStyles: res
    //   })
    // })

    httpGet('style-service//style').then(styleLabels => {
      this.setData({ styleLabels })
    })
  },

  getUserInfo(res) {
    let that = this
    let flag = res.currentTarget.dataset.flag
    if (flag == 0) {
      new Promise((resolve,reject)=>{
        wx.getUserProfile({
          desc: '用户信息将用作展示',
          success: (res) => {
            let userName = res.userInfo.nickName
            let avator = res.userInfo.avatarUrl
            resolve({userName,avator})
          }
        })
      }).then(userInfos=>{
        return new Promise((resolve,reject)=>{
          wx.login({
            success(res) {
              if (res.code) {
                userInfos.code = res.code
                resolve(userInfos)
              }else{
                reject(res)
              }
            },
            fail(res){
              reject(res)
            }
          })
        })
      }).then(userInfos=>{
        return new Promise((resolve, reject)=>{
          httpGet('login-service//login?code=' + userInfos.code + '&userName=' + userInfos.userName + '&avator=' + userInfos.avator).then(data => {
            resolve(data)
          })
        })
       
      }).then(data=>{
        let token = data.token
        // let user = data.user
        // let styles = data.user.styles
        let isFirstLogin = data.result

        // let userInfo = {
        //   avator: user.avator,
        //   userName: user.userName,
        //   choosedStyles: styles
        // }
        // Store.setUserInfo(userInfo)
        Store.setToken(token)

        if (isFirstLogin){
          that.setData({
            current: 1
          })
        }else{
          wx.showToast({
            title: '登录成功',
            icon:'none'
          })
          wx.navigateBack()
        }
        
      }).catch(res=>{
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      })
      
    } else {
      wx.showToast({
        title: '请升级到微信最新版本',
        icon: 'none'
      })
    }
  },
  sexChange(e) {

    let index = e.currentTarget.dataset.index
    this.setData({
      checkedIndex: index
    })
  },
  dateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  tapLabel(e) {

    if (e.detail.isActive) {
      if (this.data.choosedStyles.length >= 6) {
        wx.showToast({
          title: '风格标签最多只能选择6个',
          icon: 'none'
        })
        return
      }
      // Store.addStyleLabels(e.detail.value)
      this.data.choosedStyles.push({id:e.currentTarget.dataset.id,name:e.detail.value})
      this.setData({
        choosedStyles: this.data.choosedStyles
      })
    } else {
      // Store.removeStyleLabels(e.detail.value)
      this.data.choosedStyles = this.data.choosedStyles.filter(style => style.id != e.currentTarget.dataset.id)
      this.setData({
        choosedStyles: this.data.choosedStyles
      })
    }
  },
  complete(e){
    if (this.data.choosedStyles.length < 3){
      wx.showToast({
        title: '至少选择三个及以上风格',
        icon:'none'
      })
      return
    }
    httpPutWithToken('user-service//user/styles',this.data.choosedStyles.map(style=>style.id)).then(res=>{
      wx.showToast({
        title: '登录成功',
        icon:'none'
      })
      wx.navigateBack()
    }).catch(res=>{
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    })
  }
})
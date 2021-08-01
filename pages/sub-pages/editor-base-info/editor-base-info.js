// pages/sub-pages/editor-base-info/editor-base-info.js
const app = getApp()
let Store = require('../../../common/utils/store/store.js')
let { httpGetWithToken, httpGet, httpPost, httpPostWithToken, httpPutWithToken  } = require('../../../network/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      userName: "用户名",
      avator: "",
      isVip: false,
      styles: []
    },
    isAvatorUpdate:false,
    current: 0,
    themeColor: app.globalData.themeColor,
    styleLabels: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo()
    this.initAllStyles()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  //初始化所有风格标签
  initAllStyles(){
    httpGet('style-service//style').then(styleLabels=>{
      this.setData({styleLabels})
    })
  },

  //初始化用户信息
  initUserInfo() {
    httpGetWithToken('user-service//user/info').then(userInfo=>{
      this.setData({userInfo})
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tapSave(e){
    if(this.data.userInfo.userName==''){
      wx.showToast({
        title: '用户名不能为空',
        icon:'none'
      })
      return
    }
    if (this.data.userInfo.styles.length < 3) {
      wx.showToast({
        title: '最少选择3个风格标签',
        icon: 'none'
      })
      return
    }

    // Store.setUserInfo(this.data.userInfo).then(res=>{
    //   httpPostWithToken('user-service//user', this.data.userInfo).then(res=>{
    //     wx.showToast({
    //       title: '保存成功！',
    //       icon: 'none'
    //     })
    //   }).catch(res=>{
    //     wx.showToast({
    //       title: '保存失败！',
    //       icon: 'none'
    //     })
    //   })
    // }).catch(res=>{
    //   wx.showToast({
    //     title: '保存失败！',
    //     icon: 'none'
    //   })
    // })

    let that=this
    if (this.data.isAvatorUpdate){
      httpGet('user-service//user/OSSParam').then(ossParam => {
        let avatorName = 'avator' + new Date().getTime()
        wx.uploadFile({
          url: ossParam.host,
          filePath: that.data.userInfo.avator,
          name: 'file',
          formData: {
            key: ossParam.accessId + '/' + avatorName,
            policy: ossParam.policy,
            OSSAccessKeyId: ossParam.accessId,
            signature: ossParam.postSignature,
            success_action_status: ossParam.successActionStatus,
            expire: ossParam.expire
          },
          success(res) {
            if (res.statusCode === 200) {
              that.data.userInfo.avator = 'https://music-fl-wdl-bucket.oss-cn-shenzhen.aliyuncs.com/' + ossParam.accessId + '/' + avatorName
              // that.setData({ userInfo: that.data.userInfo })
              httpPutWithToken('user-service//user', that.data.userInfo).then(res => {
                wx.showToast({
                  title: '修改成功！',
                  icon: 'none'
                })
                that.setData({
                  isAvatorUpdate: false
                })
              }).catch(res => {
                wx.showToast({
                  title: '修改失败！',
                  icon: 'none'
                })
              })
            } else {
              wx.showToast({
                title: '上传头像失败！',
                icon: 'none'
              })
            }
          },
          fail(err) {
            wx.showToast({
              title: '上传头像失败！',
              icon: 'none'
            })
          }
        })
      })
    }else{
      httpPutWithToken('user-service//user', that.data.userInfo).then(res => {
        wx.showToast({
          title: '修改成功！',
          icon: 'none'
        })
      }).catch(res => {
        wx.showToast({
          title: '修改失败！',
          icon: 'none'
        })
      })
    }
    
    
  },
  tapEditUserName(e){
    this.data.userInfo.userName=e.detail.value.trim()
    this.setData({
      userInfo: this.data.userInfo
    })
  },
  tapLabel(e) {
    let that = this
    let styleId = e.currentTarget.dataset.styleid
    if (e.detail.isActive) {
      if(this.data.userInfo.styles.length >= 6){
        wx.showToast({
          title: '风格标签最多只能选择6个',
          icon:'none'
        })
        return
      }
      this.data.userInfo.styles.push({id:styleId,name:e.detail.value})
      this.setData({
        userInfo:this.data.userInfo
      })
    } else {
      this.data.userInfo.styles.splice(this.data.userInfo.styles.map(style => style.id).indexOf(styleId),1)
      this.setData({
        userInfo: this.data.userInfo
      })
    }
  },
  tapChangeAvator(e) {
    let that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        that.data.userInfo.avator = res.tempFilePaths[0]
        that.setData({
          isAvatorUpdate:true,
          userInfo: that.data.userInfo
        })
      }
    })
  },
})
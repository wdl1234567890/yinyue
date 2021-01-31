// pages/profile/profile.js
let app = getApp()
let func = require('../../common/utils/func/wxml-element.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    userAvatar: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
    userId: "茯苓170603",
    // thumbAvatorOpacity: 0,
    // topBarColorOpacity: app.globalData.themeBg,
    themeBgAndModuleColorDiffer: app.globalData.themeModuleColorOpacity - app.globalData.themeBgOpacity,
    themeBgAndModuleColorBasicParam: app.globalData.themeBgAndModuleColorBasicParam,
    src: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
    currentSongListId:0,
    isClickSongListINav: false,
    scrollDiff: 0,
    navBarIsTop:false,
    topBarchange:true,
    currentScrollPosition:0,
    songListNav:[
      {
        id:"recent-play",
        title:"最近播放"
      },
      {
        id: "my-song-list",
        title: "我的歌单"
      },
      {
        id: "collect-song-list",
        title: "收藏歌单"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //设置顶部导航条的上边距
    this.setData({
      topNavMargin: app.globalData.topNavMargin
    })

    let that = this
    //获取滚动容器的高度
    func.getScrollHeight().then(scrollHeight => {
      that.setData({
        scrollHeight
      })
    })

    //获取页面元素距离顶部的高度
    let query = wx.createSelectorQuery()
    query.selectAll(".element-distance").boundingClientRect(res => {
      let baseHeight = res[2].height//获取歌单导航条的高度
      let base = res[0].top//获取滚动容器到窗口顶部的距离
      let calParam = base + baseHeight//滚动参数
      let showTopBarChangeParam = res[1].top - base - 18//圆形icon导航容器距离顶部高度-base=个人信息容器的高度，即顶部导航条显示头像昵称的滚动距离
      let songListnavBarTopDiff = res[2].top - base//歌单导航条置顶的滚动距离

      // let maxScrollDiff = res[res.length - 1].top + (res[res.length - 1].top - res[res.length - 2].top) - base - res[0].height//滚动容器最大的滚动值

      let songListNav = that.data.songListNav
      //获取点击歌单导航条时各歌单容器对应的滚动距离，并设置到data中
      for (let i = 3; i < res.length; i++) {
        let diff = res[i].top - calParam//实际对应的滚动距离是对应的歌单模块到窗口顶部距离 - （滚动容器到窗口顶部的距离 + 歌单导航条的高度）
        songListNav[i - 3]['scrollDiff'] = diff
      }

      that.setData({
        showTopBarChangeParam,
        songListnavBarTopDiff,
        songListNav,
        // maxScrollDiff,
      })

    }).exec()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  scrolling(event) {
    let scrollTop = event.detail.scrollTop

    // this.setData({
    //   currentScrollPosition: scrollTop
    // })
    //控制滑动时顶部条是否显示头像昵称以及背景颜色变化
    if (scrollTop <= this.data.showTopBarChangeParam && this.data.topBarchange) {
      // let frequencyParam = 1 / this.data.showTopBarChangeParam;
      // this.setData({
      //   thumbAvatorOpacity: scrollTop * frequencyParam,
      //   topBarColorOpacity: app.globalData.themeBgOpacity + this.data.themeBgAndModuleColorDiffer * frequencyParam
      // })
      this.setData({
        topBarchange: false
      })
    } else if (scrollTop > this.data.showTopBarChangeParam && !this.data.topBarchange){
      this.setData({
        topBarchange: true
      })
    }
    // else if (scrollTop <= 4) {
    //   this.setData({
    //     thumbAvatorOpacity: 0,
    //     topBarColorOpacity: app.globalData.themeBg
    //   })
    // } else {
    //   this.setData({
    //     thumbAvatorOpacity: 1,
    //     topBarColorOpacity: app.globalData.themeModuleColorOpacity
    //   })
    // }

    //控制滑动时歌单导航行条是否固定在顶部
    if (scrollTop >= this.data.songListnavBarTopDiff && !this.data.navBarIsTop){
      this.setData({
        navBarIsTop:true
      })
    } else if (scrollTop < this.data.songListnavBarTopDiff && this.data.navBarIsTop){
      this.setData({
        navBarIsTop: false
      })
    }
    

    //滚动条滚动到一定范围，歌单导航条当前对应元素相应改变
    let songListNav = this.data.songListNav
    for (let i = 0; i < songListNav.length; i++){
      //获取当前歌单模块的滚动范围上限，第一个模块上限为0，其他模块上限为自己的srcollDiff
      let scrollDiffTop = 0
      if(i != 0){
        scrollDiffTop = songListNav[i].scrollDiff
      }

      //获取当前歌单模块的滚动范围下限，最后一个模块下限为无穷，其他模块下限为其下一模块的srcollDiff
      let scrollDiffDwon = Number.MAX_VALUE
      if (i != songListNav.length - 1) {
        scrollDiffDwon = songListNav[i + 1].scrollDiff
      }

      //判断当前滚动条的滚动距离落在哪个范围，歌单导航条上相应元素的样式状态改变
      if (scrollTop >= scrollDiffTop && scrollTop < scrollDiffDwon) {
        //如果当前的滚动不是点击定位滚动且当前相应样式还没有改变，则执行
        if (!this.data.isClickSongListINav && this.data.currentSongListId !== i){
          this.setData({
            currentSongListId: i
          })
        }
        //如果当前是点击定位滚动且已经滚动到目标元素，则将点击滚动的标识去除
        if (this.data.isClickSongListINav && this.data.currentSongListId == i){
          this.setData({
            isClickSongListINav: false
          })
        }
      }

    }
  },

  scrolltoupper() {
    //确保滑动到顶部时顶部头像昵称消失，背景颜色恢复
    if (this.data.topBarchange){
      this.setData({
        topBarchange: false
      })
    }

    //确保滑动到顶部时歌单导航条回到原先的位置
    if (this.data.navBarIsTop){
      this.setData({
        navBarIsTop:false
      })
    }

    //确保滑动到顶部时歌单导航条高亮的元素是第一个
    if (this.data.currentSongListId != 0) {
      this.setData({
        currentSongListId: 0
      })
    }
    
  },

  /**
   * 点击歌单导航条，滚动到对应的歌单模块
   */
  tapSongListNavTitle(event){
    let index = event.currentTarget.dataset.index
    this.setData({
      currentSongListId: index,
      isClickSongListINav: true,//点击滚动标识
      scrollDiff: this.data.songListNav[index].scrollDiff
    })

    //若当前所在的位置与滚动后所在的位置不同并且不是二次触底滚动，则执行点击滚动
    // if (this.data.currentScrollPosition != this.data.songListNav[index].scrollDiff
    //   && !(this.data.currentScrollPosition == this.data.maxScrollDiff && this.data.maxScrollDiff <= this.data.songListNav[index].scrollDiff)
    // ){
    //   this.setData({
    //     isClickSongListINav: true,//点击滚动标识
    //     scrollDiff: this.data.songListNav[index].scrollDiff
    //   })
    // }

  },

  scrolltolower(){

    //滚动到底部时可能由于内容高度不足，未能滚动到目标点击元素的位置，导致点击滚动标识未能自动去除，这里手动调整
    if (this.data.isClickSongListINav){
      this.setData({
        isClickSongListINav: false
      })
    }
  }

})
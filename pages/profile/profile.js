// pages/profile/profile.js
let app = getApp()
let Store = require('../../common/utils/store/store.js')
let func = require('../../common/utils/func/wxml-element.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAddInput: false,
    newSongListName: '',
    switchInfos: {
      musicListCardIndex: -1,
      id:-1,
      index:-1,
      title: '',
      actions: []
    },
    userInfo:{},
    currentSongListId:0,
    isClickSongListINav: false,
    scrollDiff: 0,
    navBarIsTop:false,
    topBarchange:false,
    isVip:false,
    themeColor: app.globalData.themeColor,
    iconNavs:[
      {
        icon:'like_fill',
        text:'喜欢'
      },
      {
        icon: 'unfold',
        text: '下载'
      },
      {
        icon: 'time_fill',
        text: '最近'
      },
      {
        icon: 'message_fill',
        text: '评论'
      },
      {
        icon: 'integral_fill',
        text: '会员'
      },
      {
        icon: 'label_fill',
        text: '标签'
      }
    ],
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
    ],
    allMusicListInfo:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let that = this

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onShow(){
    this.initUserInfo()
    this.initMusicListInfo()
  },

  //初始化用户信息
  initUserInfo(){
    Store.getUserInfo().then(res => {
      
      this.data.userInfo.avator = res.avator
      this.data.userInfo.userName = res.userName
      this.data.userInfo.choosedStyles = res.choosedStyles
      this.setData({
        userInfo: this.data.userInfo
      })
    })
  },

  //初始化歌单信息
  initMusicListInfo(){
    //初始化我的歌单信息
    let selfSongList = []
    let myMusicListInfo = {}
    let collectionMusicListInfo = {}
    let lastPlayMusicListInfo = {}
    Store.getMyMusicList().then(res=>{
      //初始化我的歌单
      myMusicListInfo = {
        title: '我的歌单',
        list: res
      }
      return Store.getCollectMusicList()

    }).then(res=>{
      //初始化收藏歌单信息
      collectionMusicListInfo = {
        title: '收藏歌单',
        list: res
      }
      return Store.getLastPlayList()
    }).then(res=>{
      //初始化最近播放歌单信息
      lastPlayMusicListInfo = {
        title: '最近播放',
        list: res
      }
      return Promise.resolve(true)
    }).then(res=>{
      this.setData({
        allMusicListInfo: [
          lastPlayMusicListInfo,
          myMusicListInfo,
          collectionMusicListInfo
        ]
      })
    })

  },

  scrolling(event) {
    let scrollTop = event.detail.scrollTop
    //控制滑动时顶部条是否显示头像昵称以及背景颜色变化
    if (scrollTop <= this.data.showTopBarChangeParam && this.data.topBarchange) {
      this.setData({
        topBarchange: false
      })
    } else if (scrollTop > this.data.showTopBarChangeParam && !this.data.topBarchange){
      this.setData({
        topBarchange: true
      })
    }

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
  clickTabItem(event){
    let index = event.detail
    this.setData({
      currentSongListId: index,
      isClickSongListINav: true,//点击滚动标识
      scrollDiff: this.data.songListNav[index].scrollDiff
    })

  },

  scrolltolower(){

    //滚动到底部时可能由于内容高度不足，未能滚动到目标点击元素的位置，导致点击滚动标识未能自动去除，这里手动调整
    if (this.data.isClickSongListINav){
      this.setData({
        isClickSongListINav: false
      })
    }
  },
  goToPayment(e){
    wx.navigateTo({
      url: '/subpackages-payment/pages/payment/payment'
    })
  },
  goToProfileDetail(e){
    wx.navigateTo({
      url: '/pages/sub-pages/profile-detail/profile-detail'
    })
  },
  tapNavItem(e){
    let index = e.currentTarget.dataset.index
    switch(this.data.iconNavs[index].icon){
      case 'like_fill':
      wx.navigateTo({
        url: '/subpackages-song-list/pages/song-list-detail/song-list-detail?flag=1&id=3'
      })
    break
      case 'unfold':
        wx.navigateTo({
          url: '/subpackages-song-list/pages/song-list-detail/song-list-detail?flag=1&id=2'
        })
    break
      case 'time_fill':
      wx.navigateTo({
        url: '/subpackages-song-list/pages/song-list-detail/song-list-detail?flag=1&id=1'
      })
    break
      case 'message_fill':

    break
      case 'integral_fill':
      wx.navigateTo({
        url: '/subpackages-payment/pages/payment/payment'
      })
    break
      case 'label_fill':
    break
    default:
    break
    }
    this.setData({
      switchInfos: {
        musicListCardIndex: -1,
        title: '',
        actions: []
      },
    })
  },
  tapAdd(e) {
    this.setData({
      newSongListName:'',
      showAddInput: true
    })
  },
  tapSwitch(e){
    let musicListCardIndex = e.currentTarget.dataset.index
    let actions = []
    if (musicListCardIndex==0){
      actions = [
        {
          id:1,
          icon:'createtask',
          text:'歌单管理'
        }
      ]
    } else if (musicListCardIndex==1){
      actions = [
        {
          id: 1,
          icon: 'add',
          text: '新建歌单'
        },
        {
          id:2,
          icon:'createtask',
          text:'歌单管理'
        }
      ]
    } else if (musicListCardIndex==2){
      actions = [
        {
          id: 1,
          icon: 'createtask',
          text: '歌单管理'
        }
      ]
    }
    this.setData({
      switchInfos: {
        musicListCardIndex,
        title:this.data.allMusicListInfo[musicListCardIndex].title,
        actions
      }

    })
  },
  songListInput(e) {
    let value = e.detail.value.trim()
    this.setData({
      newSongListName: value
    })
  },
  songListConfirm(e) {

    if(this.data.newSongListName==''){
      wx.showToast({
        title: '歌单名称不能为空！',
        icon:'none'
      })
      return
    }

    let myMusicList = this.data.allMusicListInfo[1].list

    let isIncludeTitle = myMusicList.find(e=>{
      if(e.title == this.data.newSongListName)return true
      return false
    })
    if (isIncludeTitle){
      wx.showToast({
        title: '歌单已经存在！',
        icon: 'none'
      })
      return
    }

    let newMusicList = { id: Math.max.apply(Math, myMusicList.map(e => e.id)) + 1, cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg', title: this.data.newSongListName,list:[]}
    myMusicList.push(newMusicList)
    this.data.allMusicListInfo[1].list=myMusicList
    this.setData({
      allMusicListInfo: this.data.allMusicListInfo,
      showAddInput: false,
      newSongListName:''
    })
    Store.addSelfSongList(newMusicList)
    wx.showToast({
      title: '新建歌单成功！',
      icon: 'none'
    })
  },
  tapButton(e){
    const index = e.detail.index;
    if(index==0){
      this.setData({
        showAddInput:false
      })
    }else{
      this.songListConfirm(e)
    }
  },
  tapItemSwitch(e){
    let id = e.detail.id
    let type=e.detail.type
    let title = e.detail.title
    let index = e.detail.index
    let musicListCardIndex = e.currentTarget.dataset.index
    let actions=[]
    if (musicListCardIndex==0){
      actions = [
        {
          id: 1,
          icon: "unfold",
          text: "下载"
        },
        {
          id: 2,
          icon: "trash",
          text: "删除"
        }
      ]
    } else if (musicListCardIndex==1){
      actions = [
        {
          id: 1,
          icon: "unfold",
          text: "下载"
        },
        {
          id: 2,
          icon: "trash",
          text: "删除"
        },
        {
          id: 3,
          icon: "editor",
          text: "编辑歌单信息"
        }
      ]
    } else if (musicListCardIndex==2){
      actions = [
        {
          id: 1,
          icon: "unfold",
          text: "下载"
        },
        {
          id: 2,
          icon: "trash",
          text: "删除"
        }
      ]
    }

    this.setData({
      switchInfos:{
        musicListCardIndex,
        id,
        index,
        title,
        actions
      },
    })
    
  },
  hideModal(e){
    this.setData({
      switchInfos: {
        musicListCardIndex:-1,
        title:'',
        actions:[]
      },
    })
  },
  tapAction(e){
    let index = e.currentTarget.dataset.index
    switch (this.data.switchInfos.actions[index].icon){
      case 'add':
      this.setData({
        showAddInput:true,
      })
      break
      case 'trash':
        this.removeMusicList()
      break
      case 'editor':
        wx.navigateTo({
          url: '/pages/sub-pages/edit-music-list/edit-music-list?id='+this.data.switchInfos.id
        })
      
      break
      case 'unfold':
      break
      case 'createtask':
        wx.navigateTo({
          url: '/pages/sub-pages/batch-music-list/batch-music-list?id=' + this.data.switchInfos.musicListCardIndex
        })
      break
      default:
      break
    }
    if (this.data.switchInfos.actions[index].icon!='trash'){
      this.setData({
        switchInfos: {
          musicListCardIndex: -1,
          title: '',
          actions: []
        },
      })
    }
  },
  removeMusicList(){
    let that = this
    wx.showModal({
      title: '是否删除歌单',
      content: '歌单：' + this.data.switchInfos.title,
      success(res){
        if (res.confirm) {
          
          that.data.allMusicListInfo[that.data.switchInfos.musicListCardIndex].list.splice(that.data.switchInfos.index,1)
          that.setData({
            allMusicListInfo: that.data.allMusicListInfo
          })

          if (that.data.switchInfos.musicListCardIndex==0){
            Store.removeLastPlayList(that.data.switchInfos.id)
          } else if (that.data.switchInfos.musicListCardIndex == 1){
            Store.removeSelfSongList(that.data.switchInfos.id)
          } else if (that.data.switchInfos.musicListCardIndex==2){
            Store.removeCollectMusicList(that.data.switchInfos.id)
          }

          wx.showToast({
            title: '歌单删除成功！',
            icon:'none'
          })
          
        } else if(res.cancel) {
          
        }
        that.setData({
          switchInfos: {
            musicListCardIndex: -1,
            title: '',
            actions: []
          },
        })
      }
    })
  }
})
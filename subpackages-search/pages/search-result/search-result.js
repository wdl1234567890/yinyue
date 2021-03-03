// subpackages-search/pages/search-result/search-result.js
let app = getApp()
let func = require('../../../common/utils/func/wxml-element.js')
let Store = require('../../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionModal:false,
    hasMusicList:false,
    musicInfo:{},
    actions:[
      {
        id:1,
        icon:'camera',
        text:'播放',
      },
      {
        id: 2,
        icon: 'camera',
        text: '下一首播放',
      },
      {
        id: 3,
        icon: 'camera',
        text: '收藏到歌单',
      },
      {
        id: 4,
        icon: 'camera',
        text: '下载',
      },
      {
        id: 5,
        icon: 'camera',
        text: '评论',
      }
    ],
    tabTitles:[
      {
        id:1,
        title:"单曲",
      },
      {
        id: 2,
        title: "歌手",
      },
      {
        id: 3,
        title: "歌单",
      }
    ],
    singDatas:[
      {
        id:1,
        singName:"歌曲1",
        singerName:"歌手1",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount:100,
        isVip:true,
      },
      {
        id: 2,
        singName: "歌曲2",
        singerName: "歌手2",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 122,
        isVip: true,
      },
      {
        id: 3,
        singName: "歌曲3",
        singerName: "歌手3",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 1,
        isVip: false,
      },
      {
        id: 4,
        singName: "歌曲4",
        singerName: "歌手4",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 504,
        isVip: false,
      },
      {
        id: 5,
        singName: "歌曲5",
        singerName: "歌手5",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 235,
        isVip: false,
      },
      {
        id: 6,
        singName: "歌曲6",
        singerName: "歌手6",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 152,
        isVip: false,
      },
      {
        id: 7,
        singName: "歌曲7",
        singerName: "歌手7",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 1000,
        isVip: false,
      },
      {
        id: 8,
        singName: "歌曲8",
        singerName: "歌手8",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 1277,
        isVip: false,
      },
      {
        id: 9,
        singName: "歌曲9",
        singerName: "歌手9",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 106,
        isVip: false,
      },
      {
        id: 10,
        singName: "歌曲10",
        singerName: "歌手10",
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        commentCount: 640,
        isVip: false,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getContentHeight(e){
    this.setData({
      contentHeight: e.detail
    })
  },
  hideModal(e) {
    this.setData({
      showActionModal: false
    })
  },
  showModal(e) {
    this.setData({
      showActionModal: true
    })
  },
  tapSwitch(e){
    this.setData({
      musicInfo:this.data.singDatas[e.detail]
    })
    this.showModal(e)
  },
  tapAction(e){
    let index = e.currentTarget.dataset.index
    switch(this.data.actions[index].text){
      case "播放":
        wx.navigateTo({
          url: '/subpackages-music/pages/music-play/music-play?id=' + this.data.musicInfo.id
        })
        break
      case "下一首播放":
        this.nextPlay()
        break
      case "收藏到歌单":
        break
      case "下载": this.downMusic()
        break
      case "评论":
        wx.navigateTo({
          url: '/subpackages-comment/pages/comment/comment?id=' + this.data.musicInfo.id
        })
        break
      default:
        break
    }
  },
  downMusic() {
    //TODO user is vip?
    if (this.data.musicInfo.isVip) {
      wx.showModal({
        title: '该曲需要开通vip才能下载哦',
        confirmText: '立即开通',
        cancelText: '暂不开通',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/subpackages-payment/pages/payment/payment' })
          }
        }
      })
    }
  },
  async nextPlay(){
    let oldMusicList
    let currentPlayMusic
  
    //获取缓存中的“当前播放列表”数据
    oldMusicList = await Store.getCurrentMusicList()
    //获取当前播放歌曲
    currentPlayMusic = await Store.getCurrentPlayMusic()
    //如果当前没有播放的歌曲，则直接将歌曲加入到列表的最前面,并且设置为当前播放歌曲，开始播放
    if (Object.keys(currentPlayMusic).length == 0){
      oldMusicList.unshift(this.data.musicInfo)
      Store.setCurrentMusic(this.data.musicInfo)
      //显示播放条
      this.setData({
        hasMusicList:true
      })
      //TODO开始播放
    }else{
      //检查将要加入的歌曲是否已经在“当前播放列表”里
      let oldMusicListLength = oldMusicList.length
      let currentPlayMusicIndex = -1
      for (let i = 0; i < oldMusicListLength; i++) {
        //是
        if (oldMusicList[i].id == this.data.musicInfo.id) {
          //检查将要加入的歌曲是否是当前播放的歌曲,是则什么也不做，否则把将要加入的歌曲重置到下一首的位置
          if (currentPlayMusic.id != this.data.musicInfo.id) {
            //删除和“将要加入的下一首”相同的歌曲
            oldMusicList.splice(i, 1)
            //找到当前播放歌曲在播放列表里的位置
            currentPlayMusicIndex = Store.getCurrentPlayMusicIndex(oldMusicList, currentPlayMusic)
            console.log(currentPlayMusicIndex)
            //将歌曲加入“下一首播放”
            oldMusicList.splice(currentPlayMusicIndex+1, 0, this.data.musicInfo)
          }else{
            //关闭弹框
            this.setData({
              showActionModal: false
            })
            //提示
            wx.showToast({
              title: '已添加到下一首播放',
              icon: 'none'
            })
            return
          }
          break
        }
      }

      //否则把将要加入的歌曲插入到当前播放的歌曲的下一首的位置
      if (currentPlayMusicIndex==-1){
        //如果歌单为空，则直接将歌曲添加到列表末尾
        if (oldMusicListLength == 0) {
          oldMusicList.push(this.data.musicInfo)
        } else {
          //找到当前播放歌曲在播放列表里的位置
          let currentPlayMusicIndex = Store.getCurrentPlayMusicIndex(oldMusicList, currentPlayMusic)
          //将歌曲加入“下一首播放”
          oldMusicList.splice(currentPlayMusicIndex+1, 0, this.data.musicInfo)
        }
      }  
    }
    //更新歌单列表缓存
    Store.setMusicList(oldMusicList)

    //关闭弹框
    this.setData({
      showActionModal:false
    })

    //提示
    wx.showToast({
      title: '已添加到下一首播放',
      icon:'none'
    })
  },
  musicPlayItemChangeInner(e){
    
  }
})
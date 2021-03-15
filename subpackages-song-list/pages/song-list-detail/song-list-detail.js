// subpackages-song-list/pages/song-list-detail/song-list-detail.js
let app = getApp()
let func = require('../../../common/utils/func/wxml-element.js')
let Const = require('../../../common/utils/const.js')
let Store = require('../../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    searchState:false,
    showSwitch:false,
    flag:2,
    showSortSelectCard:false,
    navItems:[{icon:'trash',text:'选择歌曲排序'}],
    musicListInfo:{},
    sortData:[],
    searchResult:[],
    sortIndex:0,
    selectItems:[
      {
        icon:'barrage',
        text:'默认'
      },
      {
        icon: 'remind',
        text: '按单曲名'
      },
      {
        icon: 'group',
        text: '按歌手名'
      }
    ],
    singListDatas: [
      {
        id: 1,
        cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        title: "歌单1",
        list: [
          {
            id: 4,
            singName: "孤梦",
            singerName: "歌手4",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 504,
            isVip: false
          },
          {
            id: 6,
            singName: "天问",
            singerName: "歌手6",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 152,
            isVip: false
          },
          {
            id: 3,
            singName: "爱殇",
            singerName: "歌手3",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 1,
            isVip: false
          }
        ]
      },
      {
        id: 2,
        cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        title: "歌单2",
        list: [
          {
            id: 6,
            singName: "歌曲6",
            singerName: "歌手6",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 152,
            isVip: false
          },
          {
            id: 3,
            singName: "歌曲3",
            singerName: "歌手3",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 1,
            isVip: false
          }
        ]
      },
      {
        id: 3,
        cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
        title: "歌单3",
        list: [
          {
            id: 6,
            singName: "歌曲6",
            singerName: "歌手6",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 152,
            isVip: false
          },
          {
            id: 3,
            singName: "歌曲3",
            singerName: "歌手3",
            cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
            commentCount: 1,
            isVip: false
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取参数里的歌单id
    this.data.musicListInfo.id = options.id
    //获取参数里的标识，1代表本地歌单，4代表网站歌单，2代表最近播放歌单，3代表已收藏歌单
    let flag = options.flag ? options.flag : 4
    this.setData({
      musicListInfo:this.data.musicListInfo,
      flag
    })


    let that = this

    //获取顶部导航栏改变样式的高度参数
    let query = wx.createSelectorQuery()
    query.selectAll(".element-distance").boundingClientRect(res => {
      let height = res[0].height
      that.setData({
        showTopBarChangeParam: height
      })

    }).exec()

    //获取操作板的高度
    func.getElementHeight(this, '.action-card').then(actionCardHeight => {
      this.setData({
        actionCardHeight
      })
    })
  },

  onShow(){
    let flagConst = [Const.SELF_SONG_LIST, Const.LAST_PLAY_LIST, Const.COLLECT_MUSIC_LIST]
    let musicListInfo = null
    if (this.data.flag != 4) {
      Store.getObjectById(flagConst[this.data.flag - 1], this.data.musicListInfo.id).then(res => {
        musicListInfo = res
        return Store.isMusicListCollect(musicListInfo.id)
      }).then(res => {
        musicListInfo.isCollect = res
        this.setData({
          musicListInfo,
          sortData: musicListInfo.list
        })
      })

    } else if (this.data.flag == 4) {
      //request
      musicListInfo = this.data.singListDatas.find(e => {
        if (e.id == this.data.musicListInfo.id) return true
        else return false
      })

      Store.isMusicListCollect(musicListInfo.id).then(res => {
        musicListInfo.isCollect = res
        this.setData({
          musicListInfo,
          sortData: musicListInfo.list
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  scrolltoupper() {
    //如果滚动到顶部后顶部导航栏样式没有恢复，则手动恢复
    if (this.data.topBarchange) {
      this.setData({
        topBarchange: false
      })
    }
  },

  scrolling(event) {
    let scrollTop = event.detail.scrollTop

    //滚动过程判断是否到达顶部导航栏样式变化的高度
    if (scrollTop < this.data.showTopBarChangeParam && this.data.topBarchange) {
      this.setData({
        topBarchange: false
      })
    }
    if (scrollTop >= this.data.showTopBarChangeParam && !this.data.topBarchange) {
      this.setData({
        topBarchange: true
      })
    }
  },
  //点击搜索按钮，出现搜索页面
  clickSearch(e){
    this.setData({
      searchState:true
    })
  },
  //点击返回按钮
  clickBack(e){
    //如果当前处于搜索状态，则切换为歌单主页面
    if(this.data.searchState){
      this.setData({
        searchState:false
      })
    }
  },
  //进入批量操作页面
  goToBatch(e) {
    app.globalData.searchResult = this.data.musicListInfo.list
    wx.navigateTo({
      url: '/subpackages-search/pages/batch-action-page/batch-action-page?flag='+this.data.flag + '&id='+this.data.musicListInfo.id
    })
  },

  //收藏歌单
  collect(e){
    let musicListInfo = this.data.musicListInfo
    musicListInfo.isCollect = !musicListInfo.isCollect
    if (musicListInfo.isCollect){
      Store.addCollectMusicList(this.data.musicListInfo).then(res=>{
        wx.showToast({
          title: '歌单收藏成功！',
          icon:'none'
        })
      })
    }else{
      Store.removeCollectMusicList(this.data.musicListInfo.id).then(res => {
        wx.showToast({
          title: '歌单已取消收藏！',
          icon: 'none'
        })
      })
    }
    this.setData({
      musicListInfo
    })
  },
  toComment(e){
    wx.navigateTo({
      url: '/subpackages-comment/pages/comment/comment?id=' + this.data.musicListInfo.id
    })
  },
  closeSearch(e){
    if(this.data.searchState){
      this.setData({
        searchState:false
      })
    }
  },
  searchInput(e){
    let value = e.detail.value.trim()
    if(value==''){
      this.setData({
        searchResult:[]
      })
      return
    }
    let searchResult = this.data.musicListInfo.list.filter(e=>{
      if(e.singName.indexOf(value)!=-1)return true
      else if(e.singerName.indexOf(value)!=-1)return true
      return false
    })
    this.setData({
      searchResult
    })
  },
  tapSwitch(e){
    this.setData({
      showSwitch: !this.data.showSwitch
    })
  },
  tapNavItem(e){
    let index=e.detail
    switch(this.data.navItems[index].icon){
      case "trash":
      this.setData({
        showSwitch:false,
        showSortSelectCard:true
      })
      break
      default:
    }
  },
  removeMusic(e){
    let id = e.detail
    Store.removeMusicFromSelfSongList(this.data.musicListInfo.id,id).then(res=>{
      wx.showToast({
        title: '删除成功！',
        icon:'none'
      })
      this.data.musicListInfo.list = this.data.musicListInfo.list.filter(e=>{
        if(e.id==id)return false
        return true
      })
      this.data.sortData = this.data.sortData.filter(e=>{
        if (e.id == id) return false
        return true
      })
      this.setData({
        musicListInfo:this.data.musicListInfo,
        sortData:this.data.sortData
      })
    })
  },
  tapSelectItem(e){
    let index = e.currentTarget.dataset.index
    let sortData = [...this.data.musicListInfo.list]
    this.setData({
      showSortSelectCard:false,
      sortIndex:index
    })
    switch (this.data.selectItems[index].icon) {
      case "barrage":
        this.setData({
          sortData
        })
        break
      case "remind":
        sortData.sort((a, b) => {
          return a.singName.localeCompare(b.singName)
        })
        this.setData({
          sortData
        })
        break
      case "group":
        sortData.sort((a, b) => {
          return a.singerName.localeCompare(b.singerName)
        })
        this.setData({
          sortData
        })
        break
      default:
    }
  }
})
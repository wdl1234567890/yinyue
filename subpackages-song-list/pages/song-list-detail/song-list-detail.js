// subpackages-song-list/pages/song-list-detail/song-list-detail.js
let app = getApp()
let func = require('../../../common/utils/func/wxml-element.js')
let Const = require('../../../common/utils/const.js')
let Store = require('../../../common/utils/store/store.js')
let { httpGet, httpPost } = require('../../../network/httpClient.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    searchState:false,
    showSwitch:false,
    musicInfo:{},
    flag:2,
    searchKey:'',
    showSortSelectCard:false,
    navItems:[{icon:'trash',text:'选择歌曲排序'}],
    musicListInfo: {},
    sortData:[],
    searchResult:[
      
    ],
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    //获取参数里的歌单id
    this.data.musicListInfo.id = options.id

    //获取参数里的标识，1代表本地歌单，4代表网站歌单，2代表最近播放歌单，3代表已收藏歌单，5代表歌手歌单
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
    if (this.data.flag != 4 && this.data.flag != 5) {
      Store.getObjectById(flagConst[this.data.flag - 1], this.data.musicListInfo.id).then(res => {
        musicListInfo = res
        return Store.isMusicListCollect(musicListInfo.id)
      }).then(res => {
        musicListInfo.isCollect = res
        this.setData({
          musicListInfo,
          sortData: musicListInfo.songs
        })
      })

    } else if (this.data.flag == 4 || this.data.flag == 5) {
      wx.showLoading({
        title: '加载中...'
      })
      let ff = false
      if (this.data.musicListInfo.id == -2) {
        ff=true
        this.data.musicListInfo.id ='7066716639'
      }
      httpGet('song-list-service//songList/' + this.data.musicListInfo.id).then(musicListInfo=>{
        Store.isMusicListCollect(musicListInfo.id).then(res => {
          musicListInfo.isCollect = res
          if(ff==true)musicListInfo.cover=''
          this.setData({
            musicListInfo,
            sortData: musicListInfo.songs
          })
          console.log(this.data.musicListInfo)
          wx.hideLoading()
        }).catch(res => wx.hideLoading())
      }).catch(res=>wx.hideLoading())

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
    app.globalData.searchResult = this.data.musicListInfo.songs
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
        searchResult:[],
        searchKey: value
      })
      return
    }
    let searchResult = this.data.musicListInfo.songs.filter(e=>{
      if(e.songName.indexOf(value)!=-1)return true
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
      this.data.musicListInfo.songs = this.data.musicListInfo.songs.filter(e=>{
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
  musicPlayItemChangeInner(e) {
   
    if (e != null && e.detail != null) {
      Store.getCurrentPlayMusic().then(res => {
        this.setData({
          musicInfo: res
        })
      })
    }

  },
  tapSelectItem(e){
    let index = e.currentTarget.dataset.index
    let sortData = [...this.data.musicListInfo.songs]
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
          return a.songName.localeCompare(b.songName)
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
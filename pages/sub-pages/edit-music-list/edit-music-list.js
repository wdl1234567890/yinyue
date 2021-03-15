// pages/sub-pages/edit-music-list/edit-music-list.js
let app = getApp()
let Const = require('../../../common/utils/const.js')
let Store = require('../../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList:{},
    showInput:false,
    themeColor: app.globalData.themeColor,
    newListName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id

    Store.getObjectById(Const.SELF_SONG_LIST,id).then(res=>{
      let musicList = res
      this.setData({
        musicList,
        newListName: musicList.title
      })
    })
    
    // let musicList = { id: 1, title: '歌单1', cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg' }
    // this.setData({
    //   musicList,
    //   newListName: musicList.title
    // })
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
  tapChangeCover(e){
    let that=this
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.data.musicList.cover=tempFilePaths[0]
        that.setData({
          musicList:that.data.musicList
        })
      }
    })
  },
  tapEditTitle(e){
    this.setData({
      showInput:true,
      newListName:this.data.musicList.title
    })
  },
  tapButton(e) {
    const index = e.detail.index;
    if (index == 0) {
      this.setData({
        showInput: false
      })
    } else {
      this.songListConfirm(e)
    }
  },
  songListConfirm(e){
    if(this.data.newListName==''){
      wx.showToast({
        title: '歌单名称不能为空!',
        icon:'none'
      })
      return
    }
    this.data.musicList.title = this.data.newListName
    this.setData({
      musicList: this.data.musicList,
      newListName:'',
      showInput:false
    })
    
  },
  songListInput(e){
    this.setData({
      newListName:e.detail.value.trim()
    })
  },
  tapSave(e){
    Store.updateMyMusicList(this.data.musicList).then(res => {
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
})
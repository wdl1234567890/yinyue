// subpackages-search/pages/batch-action-page/batch-action-page.js
let app = getApp()
let Const = require('../../../common/utils/const.js')
let Store = require('../../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    singDatas:[],
    checkedIds:[],
    showSongListAction:false,
    musicInfos:[],
    themeColor: app.globalData.themeColor,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    if(id){
      Store.getObjectById(Const.SELF_SONG_LIST,id).then(res=>{
        this.setData({
          musicListInfo:res
        })
      })
    }
    this.setData({
      flag: options.flag ?options.flag:0,
      singDatas: app.globalData.searchResult
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  allChecked(e){
    let checkedIds = []
    if (this.data.checkedIds.length!=this.data.singDatas.length){
      checkedIds = this.data.singDatas.map(e => {
        return e.id
      })
    }
    
    this.setData({
      checkedIds,
      isAllChecked:!this.data.isAllChecked
    })
  },
  getContentHeight(e) {
    this.setData({
      contentHeight: e.detail
    })
  },
  addNextSong(infos,index,isFirst){

    app.globalData.nextPlay(infos[index], null, null,res=>{
      console.log(res)
      if(index!=infos.length-1){
        this.addNextSong(infos, index + 1, isFirst)
      }else{
        //提示
        wx.showToast({
          title: '已全部添加到下一首播放',
          icon: 'none'
        })

        if (isFirst) {
          wx.navigateTo({
            url: '/subpackages-music/pages/music-play/music-play?id=' + res.id
          })
        }
      }
    },this,false)
  },
  tapAddNextSong(e){
    if (!this.checkIsHasChecked()) return
    let currentPlayMusic =  {}
    let index = 0
    let musicInfos = this.data.singDatas.reverse().filter(e => {
      if (this.data.checkedIds.indexOf(e.id) != -1) return true
      return false
    })
    //获取当前播放歌曲
    Store.getCurrentPlayMusic().then(res=>{
      currentPlayMusic = res
      this.addNextSong(musicInfos, index, Object.keys(currentPlayMusic).length == 0)
    })
    // let currentPlayMusic = await Store.getCurrentPlayMusic()
  
    
  },
  checkIsHasChecked(){
    if (this.data.checkedIds.length == 0) {
      wx.showToast({
        title: '还没有选择歌曲！',
        icon: 'none'
      })
      return false;
    }
    return true
  },
  tapAddToSongList(e){
    
    if (!this.checkIsHasChecked())return

    let musicInfos = this.data.singDatas.filter(e=>{
      if(this.data.checkedIds.indexOf(e.id)!=-1)return true
      return false
    })
    this.setData({
      musicInfos,
      showSongListAction:true
    })
  },
  tapDownload(e){
    if (!this.checkIsHasChecked()) return
    let isHasVip = this.data.singDatas.find(e => {
      if (this.data.checkedIds.indexOf(e.id) != -1 && e.isVip)return true
      return false
    })
    if(isHasVip){
      wx.showModal({
        title: "购买VIP",
        content: '包含VIP歌曲，是否购买VIP?',
        confirmText: "购买VIP",
        confirmColor: this.data.themeColor,
        success(e) {
          if (e.confirm) {
            wx.navigateTo({ url: '/subpackages-payment/pages/payment/payment' })
          }
        }
      })
    }else{

    }
    
  },
  handleCheckChange(e){
    
    let checked = e.detail.checked
    let id = e.detail.id
    let checkedIds = this.data.checkedIds
    if(checked){
      checkedIds.push(id)
    }else{
      checkedIds.splice(checkedIds.indexOf(id),1)
    }
    this.setData({
      checkedIds
    })
  },
  tapRemove(e){
    console.log("**")
    if (!this.checkIsHasChecked()) return
    let that = this
    wx.showModal({
      title: '删除歌曲',
      content: '确定要删除所选歌曲吗?',
      success(res){
        if(res.confirm){
          let singDatas = that.data.singDatas.filter(e => {
            if (that.data.checkedIds.indexOf(e.id) != -1) return false
            return true
          })
          that.setData({
            singDatas
          })
          that.data.musicListInfo.list = singDatas
          Store.updateMyMusicList(that.data.musicListInfo).then(res => {
            wx.showToast({
              title: '删除成功！',
              icon: 'none'
            })
          }).catch(res => {
            wx.showToast({
              title: '删除失败！',
              icon: 'none'
            })
          })
        }
      }
    })
  }
})
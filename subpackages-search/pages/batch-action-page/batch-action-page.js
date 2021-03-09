// subpackages-search/pages/batch-action-page/batch-action-page.js
let app = getApp()
let Store = require('../../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    this.setData({
      singDatas: app.globalData.searchResult
    })
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
  async tapAddNextSong(e){
    if (!this.checkIsHasChecked()) return
    //获取当前播放歌曲
    let currentPlayMusic = await Store.getCurrentPlayMusic()
    let musicInfos = this.data.singDatas.reverse().filter(e => {
      if (this.data.checkedIds.indexOf(e.id) != -1)return true
      return false
    })
    let index = 0
    this.addNextSong(musicInfos, index, Object.keys(currentPlayMusic).length==0)
    
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
  }
})
// pages/sub-pages/batch-music-list/batch-music-list.js
let Store = require('../../../common/utils/store/store.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:-1,
    indexs:[2,1,3],
    checkedIds:[],
    musicListDatas: [],
    isAllChecked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
      id
    })
    if (this.data.id == 0) {
      Store.getLastPlayList().then(res=>{
        this.setData({
          musicListDatas:res
        })
      })
    } else if (this.data.id == 1) {
      Store.getMyMusicList().then(res=>{
        this.setData({
          musicListDatas: res
        })
      })
    } else if (this.data.id == 2) {
      Store.getCollectMusicList().then(res=>{
        this.setData({
          musicListDatas: res
        })
      })
    }
  },

  setDataToStorage(){
    if (this.data.id == 0) {
      Store.setLastPlayList(this.data.musicListDatas)
    } else if (this.data.id == 1) {
      Store.setMyMusicList(this.data.musicListDatas)
    } else if (this.data.id == 2) {
      Store.setCollectMusicList(this.data.musicListDatas)
    }
  },

  onUnload(){
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  allChecked(e) {
    let checkedIds = []
    if (this.data.checkedIds.length != this.data.musicListDatas.length) {
      checkedIds = this.data.musicListDatas.map(e => {
        return e.id
      })
    }

    this.setData({
      checkedIds,
      isAllChecked: !this.data.isAllChecked
    })
  },
  handleCheckChange(e) {

    let checked = e.detail.checked
    let id = e.detail.id
    let checkedIds = this.data.checkedIds
    if (checked) {
      checkedIds.push(id)
    } else {
      checkedIds.splice(checkedIds.indexOf(id), 1)
    }
    this.setData({
      checkedIds
    })
  },
  tapUp(e){
    let id = e.detail
    let index = -1
    let musicListDatas = this.data.musicListDatas
    for (let i = 0; i < musicListDatas.length;i++){
      if (musicListDatas[i].id == id){
        index = i
        break
      }
    }

    if(index!=-1 && index!=0){
      this.data.musicListDatas.splice(index - 1, 0, this.data.musicListDatas[index])
      this.data.musicListDatas.splice(index+1,1)
      this.setData({
        musicListDatas:this.data.musicListDatas
      })
    }

    this.setDataToStorage()
  },
  tapDown(e){
    let id = e.detail
    let index = -1
    let musicListDatas = this.data.musicListDatas
    for (let i = 0; i < musicListDatas.length; i++) {
      if (musicListDatas[i].id == id) {
        index = i
        break
      }
    }

    if (index != -1 && index != musicListDatas.length-1) {
      this.data.musicListDatas.splice(index + 2, 0, this.data.musicListDatas[index])
      this.data.musicListDatas.splice(index, 1)
      this.setData({
        musicListDatas: this.data.musicListDatas
      })
    }

    this.setDataToStorage()
  },
  tapRemove(e){
    let that = this
    if (!this.data.checkedIds || this.data.checkedIds.length == 0) {
      wx.showToast({
        title: '请先选择歌单！',
        icon: 'none'
      })
      return
    }
    wx.showModal({
      title: '删除歌单',
      content: '是否删除？',
      success(res){
        if(res.confirm){
          let musicListDatas = that.data.musicListDatas.filter(e => {
            if (that.data.checkedIds.indexOf(e.id)!=-1) return false
            return true
          })
          that.setData({
            musicListDatas
          })

          that.setDataToStorage()

          wx.showToast({
            title: '删除成功！',
            icon:'none'
          })
        }else if(res.cancel){
          
        }
      },
      fail(res){
        wx.showToast({
          title: '删除失败！',
          icon:'none'
        })
      }
    })
    
  }
})
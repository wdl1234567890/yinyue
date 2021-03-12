// pages/sub-pages/batch-music-list/batch-music-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedIds:[],
    musicListDatas: [{ "id": 1, "cover": "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg", "title": "最近播放", "list": [] }, { "id": 2, "cover": "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg", "title": "已下载歌曲", "list": [] }, { "id": 3, "cover": "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg", "title": "我喜欢的音乐", "list": [] }],
    isAllChecked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
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
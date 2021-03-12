// subpackages-comment/pages/profile-comment/profile-comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentDatas:[
      {
        id: 1,
        isUp:true,
        upCount: 10,
        commentDate:123456,
        comment:'这首歌太好听了~',
        musicInfo:{
          id:1,
          cover:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName:'孤梦',
          singerName:'张哲瀚'
        },
        replyFromInfo:{
          userName:'茯苓',
          comment:'哈哈哈'
        }
      },
      {
        id: 2,
        isUp: false,
        upCount: 1,
        commentDate: 12345,
        comment: '声音太好听了~',
        musicInfo: {
          id:2,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName: '化身孤岛的鲸',
          singerName: '不才'
        },
        replyFromInfo: {
          
        }
      },
      {
        id: 3,
        isUp: false,
        upCount: 0,
        commentDate: 123945,
        comment: '一般般吧',
        musicInfo: {
          id:3,
          cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
          singName: '不知名歌曲',
          singerName: '网络歌手'
        },
        replyFromInfo: {

        }
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

  }
})
// app.js
let systemInfo = wx.getSystemInfoSync()
let menuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect()
let Store = require('./common/utils/store/store.js')

let musicListData= [
  {
    id: 1,
    singName: '我在赶去找你的路上',
    singerName: '小时姑娘',
    singTime: 240,
    lyric: '我在赶去找你的路上 - 小时姑娘\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
    cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    commentCount: 1000,
    isVip: true
  },
  {
    id: 2,
    singName: '歌曲2',
    singerName: '歌手2',
    isVip: true,
    singTime: 260,
    lyric: '歌曲2 - 歌手2\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
    commentCount: 900,
    cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    isVip: true
  },
  {
    id: 3,
    singName: '歌曲3',
    singerName: '歌手3',
    isVip: false,
    singTime: 100,
    cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    lyric: '歌曲3 - 歌手3\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
    commentCount: 10,
    isVip: false
  },
  {
    id: 4,
    singName: '歌曲4',
    singerName: '歌手4',
    isVip: false,
    singTime: 190,
    cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    lyric: '歌曲4 - 歌手4\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
    commentCount: 1000,
    isVip: false
  },
  {
    id: 5,
    singName: '歌曲5',
    singerName: '歌手5',
    isVip: true,
    singTime: 244,
    cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    lyric: '歌曲5 - 歌手5\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
    commentCount: 104,
    isVip: true
  },
  {
    id: 6,
    singName: '歌曲6',
    singerName: '歌手6',
    isVip: false,
    singTime: 205,
    lyric: '歌曲6 - 歌手6\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
    cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    commentCount: 20,
    isVip: false
  },
  {
    id: 7,
    singName: '歌曲7',
    singerName: '歌手7',
    isVip: false,
    singTime: 220,
    lyric: '歌曲7 - 歌手7\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
    cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    commentCount: 195,
    isVip: false
  },
  {
    id: 8,
    singName: '歌曲8',
    singerName: '歌手8',
    isVip: false,
    singTime: 209,
    lyric: '歌曲8 - 歌手8\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
    cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    commentCount: 580,
    isVip: false
  },
  {
    id: 9,
    singName: '歌曲9',
    singerName: '歌手9',
    isVip: false,
    singTime: 120,
    lyric: '歌曲9 - 歌手9\n词：Running Fool\n曲：Running Fool\n编曲：Running Fool\n制作人：Running Fool\n和声编写：Running Fool\n和声：Running Fool\n混音师：澍\n母带工程师：王天培\n出品：Round K Star Studio\n封面：Running Fool\n策划/监制：卜小可\nOne two three\n你在人海中孤单脆弱\n没人能懂你的沉重\n陷入黑暗无处能躲\n没人能懂你的沉默\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n你说话我听你讲\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强\n我在找你的路上\n我在赶去找你的路上\n带着星星和太阳\n给你赤子的目光\n我在赶去找你的路上\n带着你爱的模样\n陪伴你所有倔强',
    cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
    commentCount: 1744,
    isVip: false
  }
]



App({
  
  globalData: {
    themeBg: "rgba(253, 253, 253, 0.418)",
    themeModuleColor: "rgba(253, 253, 253, 1)",
    themeColor: "rgba(255,181,185,1)",
    systemInfo,
    menuButtonBoundingClientRect,
    topNavMargin: (menuButtonBoundingClientRect.top - systemInfo.statusBarHeight) * 2 + menuButtonBoundingClientRect.height + systemInfo.statusBarHeight,
    currentPlayTime:-1,
    loopStatusIndex :0,
    stopIntervalNumber:null,
    doSomething:null,
    obj:null,
    endSomething:null,
    searchResult:[]
  },

  onLaunch(e){
    this.globalData.calPlayTime = this.calPlayTime
    this.globalData.playMusic = this.playMusic
    this.globalData.pausePlayMusic = this.pausePlayMusic
    this.globalData.playMusicById = this.playMusicById
    this.globalData.nextSong = this.nextSong
    this.globalData.preSong = this.preSong
    this.globalData.stopPlayMusic = this.stopPlayMusic
    this.globalData.nextPlay = this.nextPlay
    this.initSelfSongList()
    this.initUserInfo()
  },

  //初始化自建歌单信息
  initSelfSongList(){
    let lastList = {
      id: 1,
      cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
      title: "最近播放",
      list: []
    }
    let downloadList = {
      id: 2,
      cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
      title: "已下载歌曲",
      list: []
    }
    let likeList = {
      id: 3,
      cover: "https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",
      title: "我喜欢的音乐",
      list: []
    }
    let listInfos=[
      lastList,
      downloadList,
      likeList
    ]
    Store.getSelfSongList().then(res=>{
      if (res.length == 0) {
        Store.setSelfSongList(listInfos)
      }
    })
    
  },

  //方便测试
  initUserInfo(){
    let userInfo={
     avator:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
     userName : '茯苓',
     choosedStyles : ["流行", "古风", "摇滚"]
    }
    Store.setUserInfo(userInfo)
  },

  //下一首播放
  async nextPlay(musicInfo, okCallback = null, onePlayCallback = null,setedCallBack=null,obj =null,onePlay=true){
    let oldMusicList
    let currentPlayMusic

    //获取缓存中的“当前播放列表”数据
    oldMusicList = await Store.getCurrentMusicList()
    //获取当前播放歌曲
    currentPlayMusic = await Store.getCurrentPlayMusic()
    //如果当前没有播放的歌曲，则直接将歌曲加入到列表的最前面,并且设置为当前播放歌曲，开始播放
    if (Object.keys(currentPlayMusic).length == 0) {
      oldMusicList.unshift(musicInfo)
      // Store.setCurrentMusic(this.data.musicInfo)
      //显示播放条
      // this.setData({
      //   hasMusicList:true
      // })
      //TODO开始播放
    } else {
      //检查将要加入的歌曲是否已经在“当前播放列表”里
      let oldMusicListLength = oldMusicList.length
      let currentPlayMusicIndex = -1
      for (let i = 0; i < oldMusicListLength; i++) {
        //是
        if (oldMusicList[i].id == musicInfo.id) {
          //检查将要加入的歌曲是否是当前播放的歌曲,是则什么也不做，否则把将要加入的歌曲重置到下一首的位置
          if (currentPlayMusic.id != musicInfo.id) {
            //删除和“将要加入的下一首”相同的歌曲
            oldMusicList.splice(i, 1)
            //找到当前播放歌曲在播放列表里的位置
            currentPlayMusicIndex = await Store.getCurrentPlayMusicIndex()

            //将歌曲加入“下一首播放”
            oldMusicList.splice(currentPlayMusicIndex + 1, 0, musicInfo)
          } else {
            if (okCallback) {
              okCallback.apply(obj)
              // //关闭弹框
              // this.setData({
              //   showActionModal: false
              // })
              //提示
              wx.showToast({
                title: '已添加到下一首播放',
                icon: 'none'
              })
            }
            
            return
          }
          break
        }
      }

      //否则把将要加入的歌曲插入到当前播放的歌曲的下一首的位置
      if (currentPlayMusicIndex == -1) {
        //如果歌单为空，则直接将歌曲添加到列表末尾
        if (oldMusicListLength == 0) {
          oldMusicList.push(musicInfo)
        } else {
          //找到当前播放歌曲在播放列表里的位置
          let currentPlayMusicIndex = await Store.getCurrentPlayMusicIndex()
          //将歌曲加入“下一首播放”
          oldMusicList.splice(currentPlayMusicIndex + 1, 0, musicInfo)
        }
      }
    }
    //更新歌单列表缓存
    Store.setMusicList(oldMusicList).then(res=>{
      if(setedCallBack){
        setedCallBack.apply(obj, oldMusicList)
      }
    })
   
    if(okCallback){
      okCallback.apply(obj)
      // //关闭弹框
      // this.setData({
      //   showActionModal: false
      // })

      //提示
      wx.showToast({
        title: '已添加到下一首播放',
        icon: 'none'
      })
    }
    if (onePlay){
      if (Object.keys(currentPlayMusic).length == 0) {
        // app.globalData.playMusicById(currentPlayMusic.id)
        // this.setData({
        //   cmusicInfo: this.data.musicInfo
        // })
        wx.navigateTo({
          url: '/subpackages-music/pages/music-play/music-play?id=' + musicInfo.id
        })
        if (onePlayCallback) onePlayCallback.apply(obj)
      }
    }
    
  },

  //继续播放
  async playMusic(){
    this.musicPlayItemChange((await Store.getCurrentPlayMusic()).id)
  },

  //播放某一首歌曲
  playMusicById(id) {
    this.musicPlayItemChange(id)
  },
  //暂停播放
  pausePlayMusic(){
    if (this.globalData.stopIntervalNumber != null) clearInterval(this.globalData.stopIntervalNumber)
    this.globalData.stopIntervalNumber = null
  },

  //停止播放
  stopPlayMusic() {
    this.pausePlayMusic()
    this.globalData.currentPlayTime = -1
    Store.clearCurrentMusicList()
    Store.clearCurrentMusic()
    this.globalData.endSomething = null
    this.globalData.obj = null
    this.globalData.doSomething = null
  },

  //计时回调
 async timer(){
   this.globalData.currentPlayTime = this.globalData.currentPlayTime + 1
   // Store.addCurrentPlayTimeStepOne()
   let musicInfo = await Store.getCurrentPlayMusic()

   if (musicInfo.singTime == this.globalData.currentPlayTime) {
     if (this.globalData.loopStatusIndex == 1) {
       this.musicPlayItemChange(musicInfo.id)
     } else {
       this.nextSong()
     }
     if (this.globalData.doSomething != null) this.globalData.doSomething.apply(this.globalData.obj)
     return
   }
   if (this.globalData.doSomething != null) this.globalData.doSomething.apply(this.globalData.obj)
  },

  //全局播放计时器
  calPlayTime(){
    let that = this
    // if (await Store.getStopIntervalNumber() == null) {
    if (this.globalData.stopIntervalNumber == null) {
      this.globalData.stopIntervalNumber = setInterval(this.timer, 1000)
      this.timer()
      // Store.setStopIntervalNumber(stopIntervalNumber)
    }
    
  },
  //播放下一首
  async nextSong() {
    let nextIndex = -1
    let musicList = await Store.getCurrentMusicList()
    let currentPlayId = (await Store.getCurrentPlayMusic()).id
    let currentPlayIndex = await Store.getCurrentPlayMusicIndex()
    if (currentPlayIndex == -1) return


    if (this.globalData.loopStatusIndex == 2) {
      if (musicList.length != 1) {
        while ((nextIndex = Math.floor(Math.random() * musicList.length)) == currentPlayIndex) { }
      } else {
        nextIndex = currentPlayIndex
      }

    } else {
      nextIndex = currentPlayIndex + 1 >= musicList.length ? 0 : currentPlayIndex + 1
    }
   
    this.musicPlayItemChange(musicList[nextIndex].id)

  },

  //播放上一首
  async preSong() {
    let preIndex = -1
    let musicList = await Store.getCurrentMusicList()
    let currentPlayId = (await Store.getCurrentPlayMusic()).id
    let currentPlayIndex = await Store.getCurrentPlayMusicIndex()

    if (currentPlayIndex == -1) return

    if (this.globalData.loopStatusIndex == 2) {
      if (musicList.length != 1) {
        while ((preIndex = Math.floor(Math.random() * musicList.length)) == currentPlayIndex) { }
      } else {
        preIndex = currentPlayIndex
      }

    } else {
      preIndex = currentPlayIndex - 1 <= -1 ? musicList.length - 1 : currentPlayIndex - 1
    }
    this. musicPlayItemChange(musicList[preIndex].id)
  },
  //播放指定id的歌曲
  async musicPlayItemChange(id) {
    let newItem = {}
    let ctime = this.globalData.currentPlayTime
    let musicInfo = await Store.getCurrentPlayMusic()

    if (id == musicInfo.id) {
      // console.log(musicInfo.singTime == ctime)
      if (musicInfo.singTime == ctime) {
        newItem = musicInfo
      } else {
        //if (this.globalData.endSomething != null) this.globalData.endSomething.apply(this.globalData.obj)
        this.calPlayTime()
        return
      }
    } else {
      //TODO request 
      for (let i = 0; i < musicListData.length; i++) {
        if (musicListData[i].id == id) {
          newItem = musicListData[i]
          break
        }
      }

    }


    //TODO user is vip?
    if (newItem.isVip) {
      wx.showModal({
        title: '该曲需要开通vip才能听完整首哦',
        confirmText: '立即开通',
        cancelText: '暂不开通',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: '/subpackages-payment/pages/payment/payment' })
          }
        }
      })
    }

    // this.setData({
    // musicInfo= newItemf
    this.globalData.currentPlayTime = -1
    // playStatus: true,
    // perSecondProgress: this.data.progressLength / newItem.singTime
    // })

    // let currentMusic = await Store.getCurrentPlayMusic()

    // if (newItem != musicInfo) {
      // this.setData({
      // this.globalData.currentPlayTime= 0
      // })
      // Store.setCurrentPlayTime(0)
      // let stopNumber = await Store.getStopIntervalNumber()
      // clearInterval(this.data.stopIntervalNum)
      if (this.globalData.stopIntervalNumber != null) clearInterval(this.globalData.stopIntervalNumber)
      this.globalData.stopIntervalNumber = null
    // }

    let that = this
    Store.setCurrentMusic(newItem).then(res=>{
      if (that.globalData.endSomething != null) that.globalData.endSomething.apply(that.globalData.obj)
    })
    this.calPlayTime()
  }
})

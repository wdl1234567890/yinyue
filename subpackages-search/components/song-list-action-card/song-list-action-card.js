// subpackages-search/components/song-list-action-card/song-list-action-card.js
let app = getApp()
let Store = require('../../../common/utils/store/store.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSongListAction:{
      type:Boolean,
      value:false
    },
    musicInfos:{
      type:Array,
      value:[]
    }
  },

  async ready(){
    
    this.setData({
      selfSongList: await Store.getSelfSongList()
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor,
    showModal:'songListModal',
    selfSongList: [],
    newSongListName:'',
    checkedIdList:[]
  },
  pageLifetimes: {
    async show() {
      this.setData({
        selfSongList: await Store.getSelfSongList()
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    collection(e){
      const index = e.detail.index;
      let modal = this.data.showModal
      if (index === 0) {

        if (modal == 'songListModal') {
          this.setData({
            showSongListAction: false,
            checkedIdList: []
          })
        } else if (modal == 'inputModal') {
          this.setData({
            showModal: 'songListModal'
          })
        }
      } else if (index === 1) {

        if (modal == 'songListModal') {
          this.collectionToSongList()
        } else if (modal == 'inputModal') {
          this.songListConfirm()
        }
      }
      this.triggerEvent('collection', e)
    },
    addNewSongList(e){
      this.setData({
        showModal: 'inputModal',
        newSongListName: this.data.musicInfos[0].singName
      })
      this.triggerEvent('addnewsonglist', e)
    },
    handleCheckChange(e){
      let checked = e.detail.checked
      let id = e.detail.id
      let checkedIdList = this.data.checkedIdList
      if (checked) {
        checkedIdList.push(id)

      } else {
        checkedIdList.splice(checkedIdList.indexOf(id), 1)
      }
      this.setData({
        checkedIdList
      })
    
      this.triggerEvent('handlecheckchange', e)
    },
    songListInput(e){
      this.setData({
        newSongListName: e.detail.value
      })
      this.triggerEvent('songlistinput', e)
    },
    isListNameIclude(){
      for(let i =0;i<this.data.selfSongList.length;i++){
        if(this.data.selfSongList[i].title==this.data.newSongListName)return true
      }
      return false
    },
    collectionToSongList(){

      if (this.data.checkedIdList.length==0){
        wx.showToast({
          title: '还没有选择歌单！',
          icon:'none'
        })
        return;
      }
      
      let checkedList = this.data.selfSongList.filter(e=>{
        if(this.data.checkedIdList.indexOf(e.id)!=-1)return true
        return false
      })
      let musicInfos = this.data.musicInfos.reverse()
      
      for (let i = 0; i < checkedList.length;i++){
        for (let j = 0; j < musicInfos.length;j++){
          if (!this.isIncludeSongInList(checkedList[i], musicInfos[j])){
            checkedList[i].list.unshift(musicInfos[j])
          }
        }
      }

      let newSelfSongList = this.data.selfSongList.map(e=>{
        for (let i = 0; i < checkedList.length;i++){
          if (checkedList[i].id==e.id)return checkedList[i]
          else return e
        }
      })
      this.setData({
        selfSongList:newSelfSongList,
        showSongListAction:false
      })

      Store.setSelfSongList(newSelfSongList).then(res=>{
        wx.showToast({
          title: '已加入歌单！',
          icon:'none'
        })
      })
    },
    isIncludeSongInList(musicList,musicInfo){
      return musicList.list.find(e=>{
        if (e.id == musicInfo.id)return true
        return false
      })
    },
    songListConfirm(e){
      let isInclude = this.isListNameIclude()
      if(isInclude){
        wx.showToast({
          title: '该歌单已经存在！',
          icon:'none'
        })
        return
      }
      let newId = this.data.selfSongList.length + 1
      let value = { title: this.data.newSongListName, srcUrl: this.data.musicInfos[0].cover, id: newId ,list:[]}
      Store.addSelfSongList(value).then(res => {
        wx.showToast({
          title: '新建歌单完成!',
          icon: 'none'
        })
        let oldSelfSongList = this.data.selfSongList
        oldSelfSongList.push(value)
        this.setData({
          selfSongList: oldSelfSongList,
          showModal: 'songListModal'
        })
      })
      this.triggerEvent('songlistconfirm', e)
    }
  }
})

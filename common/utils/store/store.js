let Const = require('../const.js')
function setStorage(key, value){
  return new Promise((resolve,reject)=>{
    wx.setStorage({
      key: key,
      data: value,
      success(res){
        resolve(res)
      },
      fail(res){
        reject(res)
      }
    })
  })
}

function addStorage(key,value){
  let store=[]
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success(res) {
        store = res.data
      },
      complete(res){
        if (store.indexOf(value)==-1){
          store.push(value)
          wx.setStorage({
            key: key,
            data: store,
            success(res) {
              resolve(store)
            },
            fail(res) {
              reject(res)
            }
          })
        }
      }
    })
  })
  
}

function isInclude(key, value) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success(res) {
        let data = res.data
        resolve(data.indexOf(value) != -1)
      },
      fail(res) {
        resolve(false)
      }
    })

  })
}

function addStorageIfNotIncluded(key, value) {
  let store = []
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success(res) {
        store = res.data
      },
      complete(res) {
        
        let isInclud = store.find(e=>{
          if(e.id==value.id)return true
          return false
        })

        if (isInclud){
          resolve(store)
          return
        }

        store.push(value)
        wx.setStorage({
          key: key,
          data: store,
          success(res) {
            resolve(store)
          },
          fail(res) {
            resolve(res)
          }
        })
      }
    })
  })

}

function getStorage(key, defalutValue=null){
  let store = defalutValue
  return new Promise((resolve, reject)=>{
    wx.getStorage({
      key: key,
      success(res) {
        store = res.data
        resolve(store)
      },
      fail(res){
        resolve(store)
      }
    })
  })
}

function isIncludeById(key,id){
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success(res) {
        let data = res.data
        let isInclude = data.find(e => {
          if (e.id == id) return true
          return false
        })
        resolve(isInclude)
      },
      fail(res) {
        resolve(false)
      }
    })

  })
}

function addStorageIfNotIncludedNotFromStorage(list,value,insertMode=0){
  let item = getObjectByIdFromNotStorage(list, value.id)

  if(item==null){
    if(insertMode==0)list.unshift(value)
    else if(insertMode==1)list.push(value)
    return true
  }
  return false

}

function romoveStorageNotFromStorage(list,id){
  let item = getObjectByIdFromNotStorage(list,id)

  if (item != null) {
    list.splice(list.indexOf(item),1)
    return true
  }

  return false

}

function addStorageIfNotIncludedNotFromStorageBase(list,value){
  if(list.indexOf(value)!=-1)return false
  list.push(value)
  return true
}

function romoveStorageNotFromStorageBase(list,value){
  if (list.indexOf(value) == -1) return false
  list.splice(list.indexOf(value),1)
  return true
}

function removeStorageById(key,id){
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success(res) {
        let data = res.data
        let newData=data.filter(e=>{
          if(e.id==id)return false
          return true
        })
        wx.setStorage({
          key: key,
          data: newData,
          success(res) {
            resolve(newData)
          },
          fail(res) {
            resolve(null)
          }
        })
      },
      fail(res) {
        reject(res)
      }
    })

  })
}

function removeStorage(key,value){
  return new Promise((resolve,reject)=>{
    wx.getStorage({
      key: key,
      success(res) {
        let choosedStyles = res.data
        choosedStyles.splice(choosedStyles.indexOf(value),1)
        wx.setStorage({
          key: key,
          data: choosedStyles,
          success(res) {   
            resolve(choosedStyles)
          },
          fail(res) {
            resolve(null)
          }
        })
      },
      fail(res){
        reject(res)
      }
    })
    
  })
}

function clearStorage(key){
  return new Promise((resolve, reject) => {
    wx.removeStorage({
      key:key,
      success(res){
        resolve(res)
      },
      fail(res){
        resolve(res)
      }
    })
  })
  
}

function getObjectById(key,id){
  return new Promise((resolve,reject)=>{
    let itemValue = null
    getStorage(key, []).then(res=>{
      let value = res
      itemValue = value.find(item=>{
        if(item.id==id)return true
        return false
      })
      itemValue = itemValue ? itemValue:null
      resolve(itemValue)
    }).catch(res=>{
      resolve(null)
    })
  })
}

function getObjectByIdFromNotStorage(list,id){
  if (!list || list.length==0)return null
  let item = list.find(e=>{
    if(e.id==id)return true
    return false
  })
  item == item?item:null
  return item
}

function getSelfSongList(){
  return getStorage(Const.SELF_SONG_LIST, [])
}

function isLike(id){
  return new Promise((resolve,reject)=>{
    getObjectById(Const.SELF_SONG_LIST,3).then(res=>{
      let value = getObjectByIdFromNotStorage(res.songs,id)
      resolve(value!=null)
    })
  })
}

function getCurrentPlayMusic() {
  return getStorage(Const.CURRENT_PLAY_MUSIC_STORE_KEY,{})
}
function getCurrentMusicList() {
  return getStorage(Const.MUSIC_LIST_STORE_KEY,[])
}


function getHistorySearch(){
  return getStorage(Const.HISTORY_SEARCH, [])
}


function getCollectMusicList(){
  return getStorage(Const.COLLECT_MUSIC_LIST, [])
}

function getLastPlayList(){
  return getStorage(Const.LAST_PLAY_LIST,[])
}

function setLastPlayList(musicLists){
  return setStorage(Const.LAST_PLAY_LIST,musicLists)
}

function setMusicList(musicList){
  return setStorage(Const.MUSIC_LIST_STORE_KEY,musicList)
}

function addMusicList(musicList){
  return addStorageIfNotIncluded(Const.MUSIC_LIST_STORE_KEY,musicList)
}

function removeMusicList(id){
  return removeStorageById(Const.MUSIC_LIST_STORE_KEY,id)
}


function setSelfSongList(selfSongList){
  return setStorage(Const.SELF_SONG_LIST, selfSongList)
}

function addSelfSongList(musicList){
  return addStorageIfNotIncluded(Const.SELF_SONG_LIST,musicList)
}

function removeSelfSongList(id){
  return removeStorageById(Const.SELF_SONG_LIST,id)
}

function addMusicToSelfSongList(id,musicList){
  return new Promise((resolve,reject)=>{
    getSelfSongList().then(value=>{
      let item = getObjectByIdFromNotStorage(value,id)
      if(item!=null){
        if(!addStorageIfNotIncludedNotFromStorage(item.songs,musicList))resolve(false)
        else setSelfSongList(value).then(res=>resolve(true)).then(res=>resolve(false))
      }else{
        resolve(false)
      }
    }).catch(res=>resolve(false))
  })
}

function removeMusicFromSelfSongList(id,musicId){
  return new Promise((resolve, reject) => {
    getSelfSongList().then(value => {
      let item = getObjectByIdFromNotStorage(value, id)
      
      if (item != null) {
        if (!romoveStorageNotFromStorage(item.songs, musicId)){
          resolve(false)
          return
        }
        value[getIndex(value,id)]=item
        setSelfSongList(value).then(res => resolve(true)).then(res => resolve(false))
      } else {
        resolve(false)
      }
    }).catch(res => resolve(false))
  })
}

function setCurrentMusic(currentMusic){
  return setStorage(Const.CURRENT_PLAY_MUSIC_STORE_KEY, currentMusic)
}


function setCollectMusicList(musicLists){
  return setStorage(Const.COLLECT_MUSIC_LIST, musicLists)
}

function addCollectMusicList(musicList){
  return addStorageIfNotIncluded(Const.COLLECT_MUSIC_LIST,musicList)
}

function removeCollectMusicList(id){
  return removeStorageById(Const.COLLECT_MUSIC_LIST,id)
}

function setHistorySearch(historySearch){
  return setStorage(Const.HISTORY_SEARCH,historySearch)
}

function setToken(token) {
  return setStorage(Const.TOKEN, token)
}

function addHistorySearch(value){
  return addStorage(Const.HISTORY_SEARCH, value)
}

function addUpThumbList(value){
  return addStorage(Const.UP_THUMB_LIST, value)
}

function cancelUpThumbList(value) {
  return removeStorage(Const.UP_THUMB_LIST, value)
}

function removeHistorySearch(value){
  return removeStorage(Const.HISTORY_SEARCH,value)
}


function addLastPlayList(lastPlayList){
  return addStorageIfNotIncluded(Const.LAST_PLAY_LIST, lastPlayList)
}

function removeLastPlayList(id) {
  return removeStorageById(Const.LAST_PLAY_LIST, id)
}

function setMyMusicList(musicLists){
  return new Promise((resolve, reject) => {
    getSelfSongList().then(res => {
      let musicListsCopy = [ ...musicLists]
      musicListsCopy.unshift(res[2])
      musicListsCopy.unshift(res[1])
      musicListsCopy.unshift(res[0])
      setSelfSongList(musicListsCopy)
      resolve(true)
    })
  })

}
function getMyMusicList(){
  return new Promise((resolve,reject)=>{
    getSelfSongList().then(res => {
      let myMusicList = []
      for (let i = 3; i < res.length; i++)myMusicList.push(res[i])
      resolve(myMusicList)
    })
  })
}

function getIndex(list,id){
  for(let i=0;i<list.length;i++){
    if(list[i].id==id)return i
  }
  return -1
}

function updateMyMusicList(musicList){
  return new Promise((resolve,reject)=>{
    getSelfSongList().then(res=>{
      let index = getIndex(res, musicList.id)
      res.splice(index,1,musicList)
      return setSelfSongList(res)
    }).then(res => resolve(true)).catch(res => resolve(false))

  })
}

function getUserInfo(){
  return getStorage(Const.USER_INFO,{
    avator:'',
    userName:'用户名',
    styleLabels:[]
  })
}

function setUserInfo(userInfo){
  return setStorage(Const.USER_INFO, userInfo)
}

function addDownloadMusic(music) {
  return new Promise((resolve, reject) => {
    getSelfSongList().then(res => {
      res[1].songs.unshift(music)
      setSelfSongList(res)
      resolve(true)
    })
  })

}

function updateUserInfo(avator,userName){
  return getUserInfo().then(res=>{
    let cavator = avator ? avator : res.avator
    let cuserName = userName ? userName : res.userName
    res.avator = cavator
    res.userName = cuserName
    setUserInfo(res)
  })
}

function getStyleLabels(){
  return new Promise((resolve,reject)=>{
    getUserInfo().then(res => resolve(res.styleLabels)).catch(res=>resolve([]))
  }) 
}

function addStyleLabels(value){
  return new Promise((resolve, reject) => {
    getUserInfo().then(res => {
      if(!addStorageIfNotIncludedNotFromStorageBase(res.styleLabels,value))resolve(false)
      setUserInfo(res)
      resolve(true)
    })
  }) 
}

function removeStyleLabels(value) {
  return new Promise((resolve, reject) => {
    getUserInfo().then(res => {
      if (!removeStorageIfNotIncludedNotFromStorageBase(res.styleLabels, value)) resolve(false)
      setUserInfo(res)
      resolve(true)
    })
  })
}


async function getCurrentPlayMusicIndex() {
  let currentMusicList = await getCurrentMusicList()
  let currentPlayMusic = await getCurrentPlayMusic()
  let length = currentMusicList.length

  for (let i = 0; i < length; i++) {
    if (currentMusicList[i].id == currentPlayMusic.id) return i
  }
  return -1;
}

function isUpThumbList(value){
  return isInclude(Const.UP_THUMB_LIST, value)
}

function getCurrentPlayMusicIndexSync() {
  let currentMusicList = null
  let currentPlayMusic = null
  return new Promise((resolve,reject)=>{
    getCurrentMusicList().then(res => {
      currentMusicList = res
      return getCurrentPlayMusic()
    }).then(res => {
      currentPlayMusic = res
      let length = currentMusicList.length
      for (let i = 0; i < length; i++) {
        if (currentMusicList[i].id == currentPlayMusic.id) resolve(i)
      }
      resolve(-1)
    }).catch(res=>resolve(-1))
  })

}

function getToken(){
  return getStorage(Const.TOKEN,'')
}

function getUpThumbList() {
  return getStorage(Const.UP_THUMB_LIST, [])
}

function isMusicListCollect(id){
  return isIncludeById(Const.COLLECT_MUSIC_LIST,id)
}

function clearCurrentMusicList(){
  return clearStorage(Const.MUSIC_LIST_STORE_KEY)
}

function clearCurrentMusic() {
  return clearStorage(Const.CURRENT_PLAY_MUSIC_STORE_KEY)
}

function clearUserInfo(){
  return clearStorage(Const.USER_INFO)
}

function clearToken(){
  return clearStorage(Const.TOKEN)
}

module.exports = {
  setStorage,
  addStorage,
  addStorageIfNotIncluded,
  getStorage,
  isInclude,
  isIncludeById,
  addStorageIfNotIncludedNotFromStorage,
  romoveStorageNotFromStorage,
  removeStorageById,
  removeStorage,
  clearStorage,
  getObjectById,
  getObjectByIdFromNotStorage,
  getSelfSongList,
  getCurrentPlayMusic,
  getCurrentMusicList,
  getHistorySearch,
  getCollectMusicList,
  getLastPlayList,
  setLastPlayList,
  setMusicList,
  addMusicList,
  removeMusicList,
  setSelfSongList,
  addSelfSongList,
  removeSelfSongList,
  addMusicToSelfSongList,
  removeMusicFromSelfSongList,
  setCurrentMusic,
  setCollectMusicList,
  addCollectMusicList,
  removeCollectMusicList,
  setHistorySearch,
  addHistorySearch,
  removeHistorySearch,
  addLastPlayList,
  removeLastPlayList,
  getCurrentPlayMusicIndex,
  getCurrentPlayMusicIndexSync,
  isMusicListCollect,
  clearCurrentMusicList,
  clearCurrentMusic,
  getUserInfo,
  setUserInfo,
  updateUserInfo,
  clearUserInfo,
  getStyleLabels,
  addStyleLabels,
  removeStyleLabels,
  isLike,
  setMyMusicList,
  getMyMusicList,
  updateMyMusicList,
  setToken,
  getToken,
  clearToken,
  addDownloadMusic,
  getUpThumbList,
  isUpThumbList,
  addUpThumbList,
  cancelUpThumbList
}
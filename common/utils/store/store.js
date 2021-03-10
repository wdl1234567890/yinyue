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
        store.push(value)
        wx.setStorage({
          key: key,
          data: store,
          success(res){   
            resolve(store)
          },
          fail(res){
            reject(res)
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

function getSelfSongList(){
  return getStorage(Const.SELF_SONG_LIST, [])
}

function getCurrentPlayMusic() {
  return getStorage(Const.CURRENT_PLAY_MUSIC_STORE_KEY,{})
}
function getCurrentMusicList() {
  return getStorage(Const.MUSIC_LIST_STORE_KEY,[])
}
function getMusicListIsCollectionAll(){
  return getStorage(Const.MUSIC_LIST_IS_COLLECTION_ALL,false)
}

function getLoopStatusIndex(){
  return getStorage(Const.LOOP_STATUS_INDEX, 0)
}

function getHistorySearch(){
  return getStorage(Const.HISTORY_SEARCH, [])
}

function getCurrentPlayTime(){
  return getStorage(Const.CURRENT_PLAY_TIME,0)
}

function getCurrentPlayStatus(){
  return getStorage(Const.CURRENT_PLAY_STATUS, false)
}

function getStopIntervalNumber(){
  return getStorage(Const.STOP_INTERVAL_NUMBER,null)
}

function setStopIntervalNumber(stopInervalNumber){
  return setStorage(Const.STOP_INTERVAL_NUMBER,stopInervalNumber)
}
function setMusicList(musicList){
  return setStorage(Const.MUSIC_LIST_STORE_KEY,musicList)
}

function setLoopStatusIndex(loopStatusIndex) {
  return setStorage(Const.LOOP_STATUS_INDEX, loopStatusIndex)
}

function setSelfSongList(selfSongList){
  return setStorage(Const.SELF_SONG_LIST, selfSongList)
}

function setCurrentPlayStatus(status){
  return setStorage(Const.CURRENT_PLAY_STATUS, status)
}

function setCurrentMusic(currentMusic){
  return setStorage(Const.CURRENT_PLAY_MUSIC_STORE_KEY, currentMusic)
}

function setCurrentPlayTime(time){
  return setStorage(Const.CURRENT_PLAY_TIME, time)
}

function setHistorySearch(historySearch){
  return setStorage(Const.HISTORY_SEARCH,historySearch)
}

function addSelfSongList(value){
  return addStorage(Const.SELF_SONG_LIST,value)
}

function addHistorySearch(value){
  return addStorage(Const.HISTORY_SEARCH, value)
}

async function addCurrentPlayTimeStepOne(){
  let time = await getStorage(Const.CURRENT_PLAY_TIME, 0)
  time = time+1
  setStorage(Const.CURRENT_PLAY_TIME, time)
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

function clearCurrentMusicList(){
  return clearStorage(Const.MUSIC_LIST_STORE_KEY)
}

function clearCurrentMusic() {
  return clearStorage(Const.CURRENT_PLAY_MUSIC_STORE_KEY)
}

module.exports = {
  setStorage,
  addStorage,
  getStorage,
  removeStorage,
  clearStorage,
  getSelfSongList,
  getHistorySearch,
  getCurrentPlayMusic,
  getCurrentMusicList,
  getCurrentPlayMusicIndex,
  getMusicListIsCollectionAll,
  getLoopStatusIndex,
  getCurrentPlayTime,
  getCurrentPlayStatus,
  getStopIntervalNumber,
  setSelfSongList,
  setMusicList,
  setHistorySearch,
  setCurrentMusic,
  setCurrentPlayStatus,
  setLoopStatusIndex,
  setCurrentPlayTime,
  setStopIntervalNumber,
  addSelfSongList,
  addCurrentPlayTimeStepOne,
  addHistorySearch,
  clearCurrentMusicList,
  clearCurrentMusic
}
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

function setMusicList(musicList){
  setStorage(Const.MUSIC_LIST_STORE_KEY,musicList)
}

function setCurrentMusic(currentMusic){
  setStorage(Const.CURRENT_PLAY_MUSIC_STORE_KEY, currentMusic)
}

function getCurrentPlayMusicIndex(currentMusicList, currentPlayMusic) {
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
  getCurrentPlayMusic,
  getCurrentMusicList,
  getCurrentPlayMusicIndex,
  getMusicListIsCollectionAll,
  getLoopStatusIndex,
  setMusicList,
  setCurrentMusic,
  clearCurrentMusicList,
  clearCurrentMusic
}
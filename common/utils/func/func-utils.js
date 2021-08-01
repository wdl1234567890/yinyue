function debounce(func,obj,time){
  let stop = null
  return function(args){
    if(stop != null)clearTimeout(stop)
    stop = setTimeout(()=>{
      func.apply(obj,args)
    },time)
  }
}

function throttle(fn,obj,delay) {
  let valid = true
  return function (args) {
    if (!valid) {
      return false
    }
    valid = false
    setTimeout(() => {
      fn.apply(obj,args)
      valid = true;
    }, delay)
  }
}

module.exports={
  debounce,
  throttle
}
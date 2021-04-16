function debounce(func,obj,time){
  let stop = null
  return function(args){
    if(stop != null)clearTimeout(stop)
    stop = setTimeout(()=>{
      func.apply(obj,args)
    },time)
  }
}

module.exports={
  debounce
}
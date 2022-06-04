class EventEmitter {
  constructor() {
    this.callbacks = []
  }
  
  $on(name, callback){
    this.callbacks.push({name, callback})
  }
  
  $off(name, callback){
    this.callbacks = this.callbacks.filter(callbackItem => {
      if (name === callbackItem.name && callback === callbackItem.callback) {
        return false
      }
      if (!callback && name === callbackItem.name) {
        return false
      }
      return true
    })
  }

  $emit(name, ...args){
    // this.callbacks.map(callbackItem => name === callbackItem.name && callbackItem.callback.apply(undefined, args))
    this.callbacks.map(callbackItem => name === callbackItem.name && callbackItem.callback(...args))
  }
}

export default new EventEmitter()
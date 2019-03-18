function createStore(reducer, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer)
  }
  let state     = null    //用来储存全局状态
  let listeners = []      //用来存储状态发生变化和回调函数数组

  const subcribe = listener => {
    listeners.push(listener)
  }
  
  const getState = () => state

  // 接收一个action 通过reducer,根据旧的state和action生成新的state,遍历数组执行回调
  const dispatch = action => { 
    state = reducer(state, action) // 生成新的state
    listeners.forEach(listener => listener()) // execute callback
  }

  dispatch({}) // 初始化全局状态

  return { getState, dispatch, subcribe } // 返回对象 提供三个对外方法
}

const combineReducers = reducers => (state = {}, action) => {
  let currentState = {}
  for (let key in reducers) {
    currentState[key] = reducers[key](state[key], action)
  }
}

function bindActionCreator(actions, dispatch) {
  let newActions = {}
  for (let key in actions) {
    newActions[key] = () => dispatch(actions[key].apply(null, arguments))
  }
  return newActions
}

function compose(...funcs) {
  return funcs.reduce((a,b) => (...args) => a(b(...args)))
}

function applyMiddleware(middleware) {
  return function a1 (createStore) {
    return function a2 (reducer) {
      const store = createStore(reducer)
      let dispatch = store.dispatch

      const middlewareAPI = {
        getState: store.getState,
        dispatch: action => dispatch(action)
      }

      let mid = middleware(middlewareAPI)
      dispatch = mid(store.dispatch)
      
      return {
        ...store,
        dispatch
      }
    }
  }
} 
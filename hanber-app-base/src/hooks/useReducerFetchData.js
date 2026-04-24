import { useEffect, useReducer } from 'react'
import { get } from '@/utils/request'

// 初始状态
const createInitialState = (immediate) => ({
  data: {},
  loading: immediate,
  error: false,
  refreshing: false, // 添加refreshing状态，表示是否正在刷新
})

// 定义action类型
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_ERROR = 'FETCH_ERROR'
const SET_DATA = 'SET_DATA'
const RELOAD_DATA = 'RELOAD_DATA'
const SET_REFRESHING = 'SET_REFRESHING'

// 定义reducer函数
const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
        refreshing: false,
      }
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        refreshing: false,
      }
    case SET_DATA:
      return {
        ...state,
        data: typeof action.payload === 'function' ? action.payload(state.data) : action.payload,
      }
    case RELOAD_DATA:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case SET_REFRESHING:
      return {
        ...state,
        refreshing: action.payload,
      }
    default:
      return state
  }
}

// 定义useReducerFetchData hook
export default function useFetchData(url, params, options = {}) {
  // immediate false - 不立即请求数据，组件挂载后不请求数据，需要手动调用fetchData函数请求数据，适合在某些交互后才请求数据的场景；true - 立即请求数据，组件挂载后立即请求数据，适合在组件加载时就需要数据的场景
  const { immediate = true } = options
  const [state, dispatch] = useReducer(reducer, immediate, createInitialState)

  const fetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // 模拟网络请求延迟
    try {
      const { data } = await get(url, params)
      dispatch({ type: FETCH_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_ERROR })
    }
  }

  const setData = (data) => {
    dispatch({ type: SET_DATA, payload: data })
  }

  const onReload = () => {
    dispatch({ type: RELOAD_DATA })
    fetchData()
  }

  const onRefresh = async () => {
    dispatch({ type: SET_REFRESHING, payload: true })
    /* 下拉刷新更明显 */
    await new Promise((resolve) => setTimeout(resolve, 1000)) // 模拟网络请求延迟
    await fetchData()
  }

  useEffect(() => {
    if (immediate) {
      dispatch({ type: RELOAD_DATA })
      fetchData()
    }
  }, [url, immediate]) // 依赖项改变时重新获取数据

  // state - data, loading, error, refreshing
  return {
    ...state,
    setData,
    onReload,
    onRefresh,
    fetchData,
  }
}

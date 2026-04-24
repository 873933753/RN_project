import { useEffect, useReducer } from 'react'
import { request, get } from '@/utils/request'

// 初始状态
const initialState = {
  data: {},
  loading: true,
  error: false,
  refreshing: false, // 添加refreshing状态，表示是否正在刷新
}

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
        data: action.payload,
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
export default function useFetchData(url, params) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  )

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
    await new Promise((resolve) =>
      setTimeout(resolve, 1000),
    ) // 模拟网络请求延迟
    await fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [url]) // 依赖项改变时重新获取数据

  // state - data, loading, error, refreshing
  return { ...state, setData, onReload, onRefresh }
}

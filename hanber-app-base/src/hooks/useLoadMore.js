import { useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import { get } from '@/utils/request'

/**
 * 加载更多 Hook
 * @param {string} url - 请求地址
 * @param {string} key - 数据字段名（如 'articles', 'courses'）
 * @param {function} setData - 设置数据的函数
 * @param {object} options - 额外配置
 * @param {number} options.limit - 每页数量（可选，用于无 total 时兜底判断）
 */
export default function useLoadMore(url, key, setData, options = {}) {
  const { limit } = options
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const getTotal = (data) => {
    if (typeof data?.total === 'number') return data.total
    if (typeof data?.pagination?.total === 'number') return data.pagination.total
    if (typeof data?.meta?.total === 'number') return data.meta.total
    return undefined
  }

  /**
   * 触底加载更多处理函数
   * - 防止重复请求
   * - 自动页码管理
   * - 自动判断是否有更多数据
   */
  const onEndReached = async () => {
    if (loading) return // 如果在加载中，直接返回
    if (!hasMore) return // 没有更多了，直接返回

    // 开始加载
    setLoading(true)
    const nextPage = page + 1

    try {
      // 请求接口
      const { data } = await get(url, {
        page: nextPage,
        ...(typeof limit === 'number' ? { limit } : {}),
      })
      const nextList = Array.isArray(data?.[key]) ? data[key] : []
      const total = getTotal(data)

      // 如果没有更多数据，设置 hasMore 为 false
      // 如果有数据，添加到 data 里
      if (nextList.length === 0) {
        setHasMore(false)
      } else {
        setData((prevData) => {
          const prevList = Array.isArray(prevData?.[key]) ? prevData[key] : []
          const mergedList = [...prevList, ...nextList]

          // 优先使用 total 判断是否还有更多。
          if (typeof total === 'number') {
            setHasMore(mergedList.length < total)
          } else if (typeof limit === 'number' && nextList.length < limit) {
            // 无 total 时，当前页不足 limit 视为最后一页。
            setHasMore(false)
          }

          return {
            ...prevData,
            [key]: mergedList,
          }
        })
        setPage(nextPage)
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * 重置加载更多状态
   */
  const resetLoadMore = () => {
    setHasMore(true)
    setPage(1)
  }

  /**
   * 加载更多底部组件
   * 根据状态显示不同的提示信息：
   * - 加载中：显示指示器和加载中...
   * - 无更多数据：显示没有更多了
   * - 可加载：显示上拉加载更多
   */
  const LoadMoreFooter = () => {
    let message
    if (loading) {
      message = '加载中...'
    } else if (!hasMore) {
      message = '没有更多了'
    } else {
      message = '上拉加载更多'
    }

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="small" color="#1f99b0" />}
        <Text style={styles.message}>{message}</Text>
      </View>
    )
  }

  return { onEndReached, resetLoadMore, LoadMoreFooter }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },
  message: {
    fontSize: 13,
    marginHorizontal: 16,
  },
})

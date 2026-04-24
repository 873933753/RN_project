import LoadingCmp from '@/components/shared/LoadingCmp'
import NetworkErrCmp from '@/components/shared/NetworkErrCmp'
import { View, Text, FlatList, TouchableWithoutFeedback, Image, RefreshControl } from 'react-native'
import useFetchData from '@/hooks/useReducerFetchData'
import NoData from '@/components/shared/NoData'
import useLoadMore from '@/hooks/useLoadMore'

const renderItem = ({ item }) => {
  const logo = require('@/assets/icon.png')

  return (
    // <Link asChild href={{ pathname: '/message/[id]', params: { id: item.id } }}>
    <TouchableWithoutFeedback>
      <View style={styles.item}>
        <Image source={logo} style={styles.image} />

        <View style={styles.titleWrapper}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.createdAt}>{item.createdAt}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
    // </Link>
  )
}

export default function Messages() {
  const url = '/articles'
  const key = 'articles'
  const limit = 10
  const { data, loading, error, refreshing, onRefresh, setData } = useFetchData(url, {
    page: 1,
    limit,
  })
  let { articles: listData } = data
  const { onEndReached, LoadMoreFooter } = useLoadMore(url, key, setData, { limit })

  if (loading) {
    return <LoadingCmp />
  }
  if (error) {
    return <NetworkErrCmp />
  }

  // 分隔组件
  const ItemSeparatorComponent = () => <View style={styles.separator} />

  return (
    <FlatList
      data={listData}
      style={styles.container}
      /* 
        contentContainerStyle是FlatList的属性，用于设置FlatList内容容器的样式。FlatList的内容容器是一个包裹所有列表项的View组件，contentContainerStyle可以用来设置这个View组件的样式。
      */
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      /* 下拉刷新 */
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'#999'} />
      }
      /* 内容为空时显示组件 */
      ListEmptyComponent={<NoData />}
      /* 
        内容分隔线
        ItemSeparatorComponent用于设置列表项之间的分隔组件。当FlatList渲染列表时，会在每个列表项之间插入一个分隔组件，ItemSeparatorComponent可以用来指定这个分隔组件是什么。
       */
      ItemSeparatorComponent={ItemSeparatorComponent}
      /* 触底加载更多 */
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1} /* 触底距离，单位是屏幕高度的百分比 */
      /* 加载更多底部组件 */
      ListFooterComponent={LoadMoreFooter}
    ></FlatList>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  item: {
    padding: 5,
    paddingLeft: 15,
    height: 90,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  image: {
    alignSelf: 'center',
    height: 70,
    width: 70,
  },
  titleWrapper: {
    flex: 1,
    paddingRight: 8,
    backgroundColor: 'transparent',
  },
  title: {
    marginTop: 18,
    fontSize: 12,
    fontWeight: '300',
    height: 40,
    lineHeight: 18,
    color: '#333',
  },
  createdAt: {
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '300',
    color: '555',
  },
  separator: {
    marginLeft: 15,
    marginRight: 15,
    height: 1.2,
    backgroundColor: '#E7DFD3',
  },
}

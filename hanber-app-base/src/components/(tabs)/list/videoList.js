import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import useFetchData from '@/hooks/useReducerFetchData'
import NoData from '@/components/shared/NoData'
import useLoadMore from '@/hooks/useLoadMore'
import { Link } from 'expo-router'
import LoadingCmp from '@/components/shared/LoadingCmp'
import NetworkErrCmp from '@/components/shared/NetworkErrCmp'

const renderItem = ({ item }) => {
  return (
    <Link asChild href={{ pathname: '/courses/[id]', params: { id: item.id } }}>
      <TouchableWithoutFeedback>
        <View style={styles.item}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>

          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>
              {item.name}
            </Text>

            <View style={styles.countWrapper}>
              <Text style={styles.count}>全 {item.chaptersCount} 回</Text>
            </View>

            <View style={styles.userWrapper}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar}></Image>
              <View style={styles.others}>
                <Text style={styles.nickname}>{item.user.nickname}</Text>
                <Text style={styles.separator}> | </Text>
                <Text style={styles.company} numberOfLines={1}>
                  {item.user.company}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Link>
  )
}

const limit = 10

export default function VideoList({ url }) {
  const { data, loading, error, refreshing, onRefresh, setData } = useFetchData(url, {
    page: 1,
    limit,
  })
  const listData = Array.isArray(data?.courses) ? data.courses : []
  const { onEndReached, onScrollBeginDrag, LoadMoreFooter } = useLoadMore(url, 'courses', setData, {
    limit,
  })

  if (loading) {
    return <LoadingCmp />
  }
  if (error) {
    return <NetworkErrCmp />
  }

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
      /* 触底加载更多 */
      onScrollBeginDrag={onScrollBeginDrag}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1} /* 触底距离，单位是屏幕高度的百分比 */
      /* 加载更多底部组件 */
      ListFooterComponent={<LoadMoreFooter itemCount={listData.length} />}
    ></FlatList>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
    paddingBottom: 0,
    ...Platform.select({
      ios: {
        paddingBottom: 84,
      },
    }),
  },
  item: {
    marginBottom: 8,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    height: 96,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: '#F4F1ED',
  },
  imageWrapper: {
    backgroundColor: 'transparent',
  },
  image: {
    width: 96,
    height: 80,
    borderRadius: 15,
  },
  countWrapper: {
    backgroundColor: '#1f99b0',
    borderRadius: 3,
    height: 15,
    width: 40,
  },
  count: {
    fontSize: 8,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 15,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  title: {
    height: 37,
    fontSize: 13,
  },
  userWrapper: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  avatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  others: {
    flexDirection: 'row',
    fontSize: 10,
    color: '#777',
    marginLeft: 5,
    backgroundColor: 'transparent',
  },
  nickname: {
    marginTop: 4,
    fontSize: 10,
  },
  separator: {
    fontSize: 10,
    marginTop: 3,
    marginHorizontal: 1, // 调整 '|' 两侧的间距
  },
  company: {
    marginTop: 4,
    fontSize: 10,
    width: 130,
  },
  likeIcon: {
    position: 'absolute',
    right: 10,
    bottom: 7,
  },
})

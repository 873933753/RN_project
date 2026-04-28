import { View, Text } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from '@/components/shared/ScrollableTabView'
import LoadingCmp from '@/components/shared/LoadingCmp'
import NetworkErrCmp from '@/components/shared/NetworkErrCmp'
import useFetchData from '@/hooks/useReducerFetchData'
import CourseList from '@/components/(tabs)/list/courseList'

export default function List() {
  const url = '/categories'
  /* 获取分类接口 */
  const { data, loading, error, onReload } = useFetchData(url)
  const { categories } = data

  // 加载中
  if (loading) {
    return <LoadingCmp />
  }

  // 网络错误
  if (error) {
    return <NetworkErrCmp onReload={onReload} />
  }

  const pages = categories.map((item) => (
    <CourseList key={item.id} tabLabel={item.name}>
      {item.name}
    </CourseList>
  ))

  return (
    <ScrollableTabView
      style={styles.container}
      initialPage={0}
      renderTabBar={() => <ScrollableTabBar />}
      tabBarUnderlineStyle={styles.barUnderLine}
      tabBarBackgroundColor={'#fff'}
      tabBarInactiveTextColor={'#777'}
      tabBarActiveTextColor={'#000'}
      tabBarTextStyle={styles.barText}
    >
      {pages}
    </ScrollableTabView>
  )
}

const styles = {
  container: {
    flex: 1,
  },
  barUnderLine: {
    height: 2,
    backgroundColor: '#000',
  },
  barText: {
    fontSize: 16,
    fontWeight: '500',
  },
}

import { ScrollView, RefreshControl } from 'react-native'
import NetworkErrCmp from '@/components/shared/NetworkErrCmp'
import LoadingCmp from '@/components/shared/LoadingCmp'
import useFetchData from '@/hooks/useReducerFetchData'
import Slides from '@/components/(tabs)/index/slides'
import CourseList from '@/components/(tabs)/index/courseList'

export default function TabsIndex() {
  const { data, loading, error, refreshing, onReload, onRefresh } = useFetchData('/')
  const { recommendedCourses, likesCourses, introductoryCourses } = data

  const renderContent = () => {
    if (loading) {
      return <LoadingCmp />
    }
    if (error) {
      return <NetworkErrCmp reloadData={onReload} />
    }
    return (
      <ScrollView style={styles.container}>
        <Slides courses={recommendedCourses} />
        <CourseList courses={likesCourses} title="猜你喜欢" />
        <CourseList courses={introductoryCourses} title="入门精选" />
      </ScrollView>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#999" />
      }
    >
      {renderContent()}
    </ScrollView>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    minHeight: '80%',
  },
}

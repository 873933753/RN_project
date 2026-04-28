import useFetchData from '@/hooks/useReducerFetchData'
import { useLocalSearchParams } from 'expo-router'
import { View, Text, FlatList } from 'react-native'
import LoadingCmp from '@/components/shared/LoadingCmp'
import NetworkErrCmp from '@/components/shared/NetworkErrCmp'
import NoData from '@/components/shared/NoData'
import IntroduceInfo from '@/components/(tabs)/list/IntroduceInfo'
import ContentInfo from '@/components/(tabs)/list/ContentInfo'
import TeacherInfo from '@/components/(tabs)/list/TeacherInfo'
import ChaptersList from '@/components/(tabs)/list/ChaptersList'

export default function CourseDetail() {
  let { id } = useLocalSearchParams()
  // console.log('id===', id)
  id = 2
  const { data, loading, error } = useFetchData(`/courses/${id}`)
  const { course, category, user, chapters } = data
  const chapterList = Array.isArray(chapters) ? chapters : []
  console.log('chapterList--', chapterList)

  if (loading) {
    return <LoadingCmp />
  }
  if (error) {
    return <NetworkErrCmp />
  }

  const renderItem = ({ item }) => {
    return <ChaptersList chapter={item} course={course} user={user} />
  }

  // return <FlatList />
  return (
    <FlatList
      data={chapterList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<NoData content="当前课程暂无章节" />}
      ListHeaderComponent={<IntroduceInfo course={course} />}
      ListFooterComponent={
        <>
          <ContentInfo course={course} />
          <TeacherInfo user={user} />
        </>
      }
    />
  )
}

const styles = {
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
}

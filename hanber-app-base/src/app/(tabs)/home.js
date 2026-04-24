import { View, Text, ScrollView, RefreshControl } from 'react-native'
import NetworkErrCmp from '@/components/shared/NetworkErrCmp'
import LoadingCmp from '@/components/shared/LoadingCmp'
import useFetchData from '@/hooks/useReducerFetchData'
import Slides from '@/components/(tabs)/index/slides'
import CourseList from '@/components/(tabs)/index/courseList'
import { useState, useCallback } from 'react'

export default function Home() {
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
    /* 页面滚动需要用ScrollView */
    /* 
      1)TabBar页面需要内容都要用ScrollView包裹，才能实现页面滚动，否则内容会被TabBar遮挡，
      2)给ScrollView设置contentContainerStyle minHeight,否则NetworkErrCmp和LoadingCmp无法居中显示，因为ScrollView的flex属性会让它占满整个屏幕，导致内容无法居中。
    */
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      /* 下拉刷新 */
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

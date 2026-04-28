import { ScrollView, Text, StyleSheet, RefreshControl, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import useFetchData from '@/hooks/useReducerFetchData'
import LoadingCmp from '@/components/shared/LoadingCmp'
import NetworkErrCmp from '@/components/shared/NetworkErrCmp'

export default function Teacher() {
  const { id } = useLocalSearchParams()
  const url = `/teachers/${id}`

  const { data, loading, refreshing, onRefresh, error, onReload } = useFetchData(url)
  const { user } = data

  // 加载中
  if (loading) {
    return <LoadingCmp />
  }

  // 网络错误
  if (error) {
    return <NetworkErrCmp onReload={onReload} />
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'#1f99b0'} />
      }
    >
      <Image source={{ uri: user.avatar }} style={styles.avatar}></Image>
      <Text style={styles.nickname}>{user.nickname}</Text>
      <Text style={styles.company}>{user.company}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#fff',
  },
  avatar: {
    alignSelf: 'center',
    width: 132,
    height: 132,
    borderRadius: 66,
  },
  nickname: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
  },
  company: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '300',
    marginBottom: 2,
    color: '#666',
  },
  bio: {
    marginTop: 20,
    paddingHorizontal: 20,
    fontSize: 12,
    lineHeight: 20,
    color: '#555',
  },
})

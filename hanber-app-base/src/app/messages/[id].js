import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import ProgressWebView from '@/components/shared/ProgressWebView'

export default function MessageDetail() {
  const baseURL = process.env.EXPO_PUBLIC_API_URL
  const { id } = useLocalSearchParams()
  const uri = `${baseURL}/articles/${id}/info`
  return (
    <ProgressWebView source={{ uri: uri }} />
    // <View style={styles.container}>
    //   <Text>消息详情-{id}</Text>
    //   <Text>{article?.title}</Text>
    //   <WebView source={{ html: article?.content || '' }} />
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

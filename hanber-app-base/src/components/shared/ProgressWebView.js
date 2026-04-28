import { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import LoadingCmp from './LoadingCmp'
import { colors } from '@/theme/colors'
import * as WebBrowser from 'expo-web-browser'

// import Loading from '@/components/shared/Loading'

/**
 * 进度条
 * @param props
 */
const ProgressBar = (props) => {
  const width = `${props.progress * 100}%`

  return <View style={[styles.loadingBar, { width }]} />
}

/* 
  超链接拦截方法
*/
const createShouldStartLoadWithRequest = (sourceUri) => (request) => {
  // props.source.uri 是当前 WebView 加载的 URL
  // request.url 是即将要加载的 URL
  // 在这里处理超链接
  if (sourceUri === request.url) {
    return true
  }
  // 否则，用webBrowser打开
  void WebBrowser.openBrowserAsync(request.url)
  return false
}

/**
 * 带加载中和进度条的 WebView
 * @param props
 */
export default function ProgressWebView(props) {
  const [progress, setProgress] = useState(0)
  const sourceUri = props.source?.uri

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />

      <WebView
        // startInLoadingState={true}
        // renderLoading={() => <Loading />}
        // // 加载进度，值为 0...1 之间（含有小数）
        // onLoadProgress={({ nativeEvent }) => {
        //   setProgress(nativeEvent.progress)
        // }}
        userAgent="clwy-app"
        startInLoadingState={true}
        renderLoading={() => <LoadingCmp />}
        // 加载进度，值为 0...1 之间（含有小数）
        onLoadProgress={({ nativeEvent }) => {
          setProgress(nativeEvent.progress)
        }}
        onShouldStartLoadWithRequest={createShouldStartLoadWithRequest(sourceUri)}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingBar: {
    backgroundColor: colors.primary,
    height: 2,
  },
})

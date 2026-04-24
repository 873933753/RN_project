import { ActivityIndicator, StyleSheet } from 'react-native'
import useAppColors from '@/theme/useAppColors'

/* 
  LoadingCmp 加载中组件
  ActivityIndicator 是RN内置的加载指示器组件，支持多平台，使用简单，性能较好
*/
export default function LoadingCmp() {
  const colors = useAppColors()
  const styles = createStyles(colors)

  return <ActivityIndicator size="large" color={colors.spinner} style={styles.loading} />
}

function createStyles(colors) {
  return StyleSheet.create({
    loading: {
      backgroundColor: colors.background,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
  })
}

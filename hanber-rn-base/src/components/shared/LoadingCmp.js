import { ActivityIndicator, StyleSheet } from 'react-native'
import useAppColors from '@/theme/useAppColors'

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

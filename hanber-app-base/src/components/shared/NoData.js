import { View, Text, StyleSheet } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import useAppColors from '@/theme/useAppColors'

/**
 * 暂无数据
 */
export default function NoData() {
  const colors = useAppColors()
  const styles = createStyles(colors)

  return (
    <View style={styles.notice}>
      <SimpleLineIcons name={'drawer'} size={160} color={colors.iconMuted} />
      <Text style={styles.noticeMsg}>暂时还没有内容哦~</Text>
    </View>
  )
}

function createStyles(colors) {
  return StyleSheet.create({
    notice: {
      height: 500,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    noticeMsg: {
      color: colors.textSecondary,
    },
  })
}

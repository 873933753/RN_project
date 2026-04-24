import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import useAppColors from '@/theme/useAppColors'

export default function NetworkErrCmp({ title, reloadData }) {
  const colors = useAppColors()
  const styles = createStyles(colors)

  return (
    <View style={styles.container}>
      <SimpleLineIcons name={'drawer'} size={160} color={colors.iconMuted} />
      <Text style={styles.errText}>{title || '抱歉，网络连接出错了'}</Text>
      {/* Button在双端表现不一致 */}
      <TouchableOpacity style={styles.reload} onPress={() => reloadData()}>
        <Text style={styles.label}>重新加载</Text>
      </TouchableOpacity>
    </View>
  )
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errText: {
      color: colors.textSecondary,
    },
    reload: {
      backgroundColor: colors.warning,
      marginTop: 10,
      height: 40,
      borderRadius: 4,
      paddingLeft: 10,
      paddingRight: 10,
    },
    label: {
      color: colors.onPrimary,
      lineHeight: 40,
    },
  })
}

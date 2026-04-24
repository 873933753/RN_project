import { Link } from 'expo-router'
// import { Image } from 'expo-image'
import { SimpleLineIcons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

/**
 * 导航栏 Logo 组件
 */
function LogoTitle() {
  return <Image style={styles.logo} contentFit="contain" source={require('@/assets/icon.png')} />
}

/**
 * 导航栏按钮组件
 * @param props
 */
function HeaderButton(props) {
  const { name, colors, ...rest } = props

  return (
    <Link asChild {...rest}>
      <TouchableOpacity>
        <SimpleLineIcons size={20} color={colors.icon} name={name} />
      </TouchableOpacity>
    </Link>
  )
}

export default function tabOptions(colors) {
  return {
    headerTitleAlign: 'center', // 安卓标题栏居中
    // headerTitle: (props) => <LogoTitle {...props} />,
    headerLeft: () => (
      <HeaderButton name="bell" colors={colors} href="/messages" style={styles.headerButton} />
    ),
    headerRight: () => (
      <>
        <HeaderButton
          name="magnifier"
          colors={colors}
          href="/search"
          style={[styles.headerButton, styles.searchButton]}
        />
        <HeaderButton name="options" colors={colors} href="/settings" style={styles.headerButton} />
      </>
    ),
    tabBarActiveTintColor: colors.primary, // 设置tabBar激活状态的颜色
    tabBarInactiveTintColor: colors.textSecondary, // 设置tabBar非激活状态的颜色
    tabBarStyle: { backgroundColor: colors.surface }, // 设置tabBar背景色
    /* android 取消水波纹效果*/
    tabBarButton: (props) => (
      <TouchableOpacity
        {...props}
        activeOpacity={1}
        style={[props.style, { backgroundColor: colors.transparent }]}
      />
    ),
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 135,
    height: 35,
  },
  headerButton: {
    padding: 8,
  },
  searchButton: {
    marginRight: 10,
  },
})

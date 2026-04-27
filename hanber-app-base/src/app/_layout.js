import { Stack } from 'expo-router'
import screenOptions from '@/options/screenOptions'
import useAppColors from '@/theme/useAppColors'
import { useColorScheme } from 'react-native'

export default function Layout() {
  const colors = useAppColors()
  const scheme = useColorScheme()

  return (
    <Stack screenOptions={screenOptions(colors)}>
      {/* TabBar */}
      {/* headerShown可以隐藏当前页面的导航栏，双端表现一致 */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* cards 其他页面 */}
      <Stack.Screen
        name="index"
        options={{
          title: '详情页',
          contentStyle: { backgroundColor: colors.background },
          statusBarStyle: scheme === 'dark' ? 'light' : 'dark',
        }}
      />
      {/* 消息列表 */}
      <Stack.Screen name="messages/index" options={{ title: '消息列表' }} />
      {/* 消息详情 */}
      <Stack.Screen
        name="messages/[id]"
        options={({ route }) => ({ title: `消息详情 - ${route.params.id}` })}
      />
      {/* 设置页 */}
      <Stack.Screen name="settings/index" options={{ title: '设置' }} />
      {/* 设置详情 */}
      <Stack.Screen
        name="settings/[uri]"
        options={({ route }) => ({ title: route.params.title || '设置详情' })}
      />
    </Stack>
  )
}

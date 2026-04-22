import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      /* 这里ios和android表现不一样，如android标题在左且不是左右滑动效果 */
      screenOptions={{
        headerTitleAlign: 'center', // android标题居中
        animation: 'slide_from_right' // android左右滑动效果
      }}
    >
      <Stack.Screen name="index" options={{ title: '首页' }} />
      <Stack.Screen name="detail" options={{ title: '详情页' }} />
    </Stack>
  )
}
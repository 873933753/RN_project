import tabOptions from '@/options/tabOptions'
import { Tabs } from 'expo-router'
import { SimpleLineIcons } from '@expo/vector-icons'
import useAppColors from '@/theme/useAppColors'

/* TabBar图标组件 */
function TabBarIcon(props) {
  return <SimpleLineIcons size={20} {...props} />
}

export default function TabsLayout() {
  const colors = useAppColors()

  return (
    <Tabs screenOptions={tabOptions(colors)}>
      <Tabs.Screen
        name="home"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <TabBarIcon name="compass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: '列表',
          tabBarIcon: ({ color }) => <TabBarIcon name="camrecorder" color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}

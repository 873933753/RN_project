import { Link, Tabs } from 'expo-router';
import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

/* 导航栏logo */
function LogoTitle() {
  return (
    <Image
      contentFit="contain"
      style={{ width: 30, height: 30 }}
      source={require('@/assets/icon.png')}
    />
  );
}

/* 导航栏左侧组件 */
function LogoLeft() {
  return (
    <Link href={'/detail'} style={{ marginLeft: 10 }} asChild>
      <TouchableOpacity>
        <SimpleLineIcons name={'bell'} size={20} color="#1f99b0" />
      </TouchableOpacity>
    </Link>
  );
}

/* 导航栏右侧组件 */
function LogoRight() {
  return (
    <>
      <Link href={'/detail'} style={{ marginRight: 10 }} asChild>
        <TouchableOpacity>
          <SimpleLineIcons name={'magnifier'} size={20} color="#1f99b0" />
        </TouchableOpacity>
      </Link>

      <Link href={'/detail'} style={{ marginRight: 10 }} asChild>
        <TouchableOpacity>
          <SimpleLineIcons name={'options'} size={20} color="#1f99b0" />
        </TouchableOpacity>
      </Link>
    </>
  );
}

/* TabBar图标组件 */
function TabBarIcon(props) {
  return <SimpleLineIcons size={20} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center', // android标题居中
        headerTitle: (props) => <LogoTitle {...props} />,
        headerLeft: () => <LogoLeft />,
        headerRight: () => <LogoRight />,
        tabBarActiveTintColor: '#e91e63', // 设置tabBar激活状态的颜色
        tabBarInactiveTintColor: '#999999', // 设置tabBar非激活状态的颜色
        tabBarStyle: { backgroundColor: '#f5f5f5' }, // 设置tabBar背景色
        /* android 取消水波纹效果*/
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            activeOpacity={1}
            style={[props.style, { backgroundColor: 'transparent' }]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: '视频',
          tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
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
  );
}

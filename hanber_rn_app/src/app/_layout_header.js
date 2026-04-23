import { Link, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { Touchable, TouchableOpacity } from 'react-native';
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
          <SimpleLineIcons name={'magifier'} size={20} color="#1f99b0" />
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

export default function Layout() {
  return (
    <Stack
      /* 这里ios和android表现不一样，如android标题在左且不是左右滑动效果 */
      screenOptions={{
        title: '', // 设置默认标题为空。否则双端表现不一致，ios会有默认标题，android没有
        headerTitleAlign: 'center', // android标题居中
        animation: 'slide_from_right', // android左右滑动效果

        headerStyle: {
          backgroundColor: '#f4511e', // 设置标题栏背景色
        },
        headerTintColor: '#fff', // 设置标题栏文字颜色
        headerTitleStyle: {
          fontWeight: 'bold', // 设置标题栏文字样式
        },
        headerBackButtonDisplayMode: 'minimal', // 设置返回按钮样式,只显示箭头，不显示文字，android默认就是这个样式，ios默认是显示文字的
      }}
    >
      {/* index的title设置logo */}
      <Stack.Screen
        name="index"
        // options={{ title: '首页' }}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerLeft: () => <LogoLeft />,
          headerRight: () => <LogoRight />,
        }}
      />
      <Stack.Screen name="detail" options={{ title: '详情页' }} />
      <Stack.Screen
        name="details/[id]"
        options={({ route }) => ({
          title: route.params?.id || 'xxx',
        })}
      />
    </Stack>
  );
}

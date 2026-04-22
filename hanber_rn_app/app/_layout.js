import { Link, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { TouchableOpacity, View } from 'react-native';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/* 导航栏logo */
function LogoTitle() {
  return (
    <Image
      contentFit="contain"
      style={{ width: 30, height: 30 }}
      source={require('../assets/icon.png')}
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

/* 模态页关闭按钮组件 */
function ModalCloseButton() {
  const router = useRouter();
  return (
    <View style={{ width: 30 }}>
      <TouchableOpacity onPress={() => router.dismiss()} style={{ marginLeft: 10 }}>
        <MaterialCommunityIcons name={'close'} size={20} color="#1f99b0" />
      </TouchableOpacity>
    </View>
  );
}

export default function Layout() {
  return (
    <Stack
      /* 这里ios和android表现不一样，如android标题在左且不是左右滑动效果 */
      screenOptions={{
        title: '', // 设置默认标题为空。否则双端表现不一致，ios会有默认标题，android没有
        headerTitleAlign: 'center', // android标题居中
        // animation: 'slide_from_right', // android左右滑动效果，但是安卓模态展示没有滑动效果，暂时先注释掉

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
      {/* tabs */}
      {/* headerShown可以隐藏当前页面的导航栏，双端表现一致 */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* cards */}
      {/* index的title设置logo */}
      {/* <Stack.Screen
        name="index"
        // options={{ title: '首页' }}
        options={{
          headerTitle: props => <LogoTitle {...props} />,
          headerLeft: () => <LogoLeft />,
          headerRight: () => <LogoRight />
        }}
       /> */}
      <Stack.Screen name="detail" options={{ title: '详情页' }} />
      <Stack.Screen
        name="details/[id]"
        options={({ route }) => ({
          title: route.params?.id || 'xxx',
        })}
      />

      {/* modal */}
      <Stack.Screen
        name="teachers/[id]"
        options={({ route }) => ({
          presentation: 'modal', // 设置页面为模态展示
          title: '讲师信息' + (route.params?.id || 'xxx'),
          headerLeft: () => <ModalCloseButton />, // 模态页左侧显示关闭按钮
          animation: 'slide_from_bottom', // 兼容android模态页从底部滑出动画，但是只能全屏无法像ios一样堆叠
        })}
      />
    </Stack>
  );
}

import { StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';


export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        Hello World!12ddd
      </Text> 
      {/* 跳转详情页
        asChild可以让Link组件的子组件成为一个可点击的元素，点击这个元素时会触发Link组件的导航功能，而不是Link组件本身。这对于需要自定义样式或者行为的链接非常有用，可以让开发者更灵活地控制链接的外观和交互方式。
      */}
      <Link href="/detail" style={{color:'blue', fontSize: 30}} asChild>  
        <Text>go to Detail</Text>
      </Link>

      <Text onPress={() => router.navigate('/detail')}>
        GO Detail - router
      </Text>

      {/* 路由传参 */}
      {/* 1）link直接传参数 */}
      <Link href="/details/123?limit=20" style={{color:'blue', fontSize: 30}} asChild>
        <Text>go to Detail with id</Text>
      </Link>

      <Link 
        href={{
          pathname: '/details/[id]',
          params: {id: 456,limit:'4561'}
        }} 
        style={{color:'blue', fontSize: 30}}  
        asChild
      >
        <Text>go to Detail with id - 456</Text>
      </Link>

      {/* 2）router传参数 */}
      <Text onPress={() => router.navigate('/details/789')}>
        GO Detail with id - 789
      </Text>

      <Text onPress={() => router.navigate({
        pathname: '/details/[id]',
        params: {id: 999,limit:'9991'} 
      })}>
        GO Detail with id - 999
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content:{
    fontSize: 60
  }
});

import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

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

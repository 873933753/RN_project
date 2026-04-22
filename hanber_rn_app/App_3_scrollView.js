import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput,ScrollView, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true); //下拉刷新时，设置refreshing为true，显示刷新动画
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    /* View组件不支持滚动，若需要滚动需要引入scrollView组件
      scrollView一般作为页面的根组件，或者需要滚动的组件的父组件，来包裹需要滚动的内容
     需要注意的是，scrollView会一次性渲染所有的子组件，如果子组件过多可能会导致性能问题，此时可以考虑使用FlatList或者SectionList来优化性能
     另外，scrollView默认是垂直滚动的，如果需要水平滚动，可以设置horizontal属性为true
    */
    /* 注意：ScrollView组件只能有一个子组件，如果需要多个子组件，需要使用一个View组件来包裹它们 */
    /* ScrollView组件的contentContainerStyle属性可以用来设置内容容器的样式，比如padding、margin等 */
    /* ScrollView组件的onScroll事件可以用来监听滚动事件，获取当前滚动位置等信息 */
    /* ScrollView组件的refreshControl属性可以用来实现下拉刷新功能，配合RefreshControl组件使用 */ 
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
        /* tintColor - 加载中指示器的颜色，只在ios有效 */
          refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  tintColor = 'red'/>
          }
        >
          <StatusBar style="auto" />
          <Text style={styles.content}>
            君不见黄河之水天上来，奔流到海不复回。
            君不见高堂明镜悲白发，朝如青丝暮成雪。
            人生得意须尽欢，莫使金樽空对月。  
            天生我材必有用，千金散尽还复来。
            烹羊宰牛且为乐，会须一饮三百杯。
            岑夫子，丹丘生，将进酒，杯莫停。
            与君歌一曲，请君为我倾耳听。
            钟鼓馔玉不足贵，但愿长醉不复醒。
            古来圣贤皆寂寞，惟有饮者留其名。
            陈王昔时宴平乐，斗酒十千恣欢谑。
            主人何为言少钱，径须沽取对君酌。
            五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput,ScrollView, RefreshControl, FlatList } from 'react-native';
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

  const data = [
    {id:1, name:'课程1'},
    {id:2, name:'课程2'},
    {id:3, name:'课程3'},
    {id:4, name:'课程4'},
    {id:5, name:'课程5'},
    {id:6, name:'课程6'},
    {id:7, name:'课程7'},
    {id:8, name:'课程8'},
    {id:9, name:'课程9'},
    {id:10, name:'课程10'},
    {id:11, name:'课程11'},
    {id:12, name:'课程12'},
    {id:13, name:'课程13'},
    {id:14, name:'课程14'},
    {id:15, name:'课程15'},
    {id:16, name:'课程16'},
    {id:17, name:'课程17'},
    {id:18, name:'课程18'},
    {id:19, name:'课程19'},
    {id:20, name:'课程20'},
    {id:21, name:'课程21'},
    {id:22, name:'课程22'},
    {id:23, name:'课程23'},
    {id:24, name:'课程24'},
    {id:25, name:'课程25'},
    {id:26, name:'课程26'},
    {id:27, name:'课程27'},
    {id:28, name:'课程28'},
    {id:29, name:'课程29'},
    {id:30, name:'课程30'}
  ]

  const renderItem = ({item}) => {
    return (
      <Text style = {{color:"#999999",fontSize:60}}>
        {item.name}
      </Text>
    )
  }

  const onEndReached = () => {
    console.log('触底了，加载更多数据')
  } 
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={ renderItem }
          // horizontal={true} //默认是false，竖直滚动  
          /* listFooter */
          ListHeaderComponent={item => (<Text>已经到顶了...</Text>)}
          ListFooterComponent={item => (<Text>没有更多了...</Text>)}
          /* 下拉刷新 */
          refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  tintColor = 'red'/>
          }
          /* 触底加载更多 */
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1} /* 触底距离，单位是屏幕高度的百分比 */
        />
        {/* {
          data.map((item,index) => {
            return <Text key={item.id} style = {{color:"#999999",fontSize:60}}>{item.name}</Text>
          })
        } */}
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

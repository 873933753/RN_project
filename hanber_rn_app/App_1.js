import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// import { ActivityIndicator } from 'react-native/types_generated/index';
import LoadingCmp from './components/shared/loadingCmp';
import NetworkErrCmp from './components/shared/networkErrCmp';
import request, { get } from './utils/request'; 
import useFetchData from './hooks/useFetchData';


export default function App() {
  const [ count ,setCount ]  = useState(0);
  const [courses, setCourses] = useState([
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'React' }
  ]);

  const [ list ,setList ] = useState([]);
  const handleGetList = async () => {
    /* 这里要等数据返回才能setList */
    const data = await fetchData(keyword);
    setList(data);
  } 

  const [ keyword, setKeyword ] = useState('');

  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  const fetchData = async (keyword = '') => {
  try {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500)); // 模拟网络请求延迟
    /* 这里用localhost会请求失败 */
    // const res = await fetch(`http://192.168.1.102:3000/search?q=${keyword}`); 
    const res = await get('/search', { q: keyword });
    const { data } = await res.json(); // json解析数据
    console.log(data.courses);
    return data.courses
  } catch (error) {
    console.error('Error fetching data:', error);
    setIsError(true);
  } finally { // 加载完成 isLoading 设为false
    setIsLoading(false);
  }
};

  // 6、使用自定义的hook
  const { data, loading, error, fetchData } = useFetchData();

  // 重新加载
  const onReload = async () => {
    setIsError(false);
    await fetchData();
  } 

  /* 4、useEffect自动获取接口数据 */
  // 只要组件重新渲染，useEffect就会执行，默认情况下它在每次渲染后都会运行
  useEffect(() => {
    handleGetList();
  // 依赖项改变useEffect会再次执行，数组为空表示只在组件挂载时执行一次，类似于componentDidMount
  },[keyword]) 

  /* 5、加载组件 ， 活动治时期 ActivityIndicator -原生组件*/
  /* 安卓模拟器要重启才会生效 */
  if(isLoading){
    // return <ActivityIndicator size="large" color="#0000ff" style = { styles.loading } />
    return <LoadingCmp />
  }

  /* 6、网络连接错误，图标 */
  if(isError){
    return <NetworkErrCmp title={'父组件传过来的参数'}  reloadData = { onReload }/>
  }


  return (
    /* 但是View不提供滚动，如果内容超出屏幕范围，就没法显示出来了 */
    <View style = {styles.container}>
      {/* 1、样式相关 */}
      {/* 文字内容必须Text标签包裹才会显示 */}
      {/* 写多个样式用中括号 */}
      <Text style = { [styles.title, {color:'green'}]} >hahaha!</Text>
      {/* 行内样式用双花括号 */}
      <Text
        style = {{ fontSize: 18, color: 'blue' }}
      >一共点击{count}次</Text>
      <Button title='点我' onPress={() => setCount(count + 1)} />
      {/* 顶部电量、时间、网络信息 */}
      <StatusBar style="auto" />

      {/* 2、map遍历 */}
      {
        courses.map((item,index) => {
          return <Text key={item.id}>({index})-{item.name}</Text>
        })
      }

      {/* 3、点击获取接口数据 */}
      {
        list.map((item,index) => {
          return <Text key={item.id} style = {{color:"#999999"}}>{item.name}</Text>
        })
      }
      <Button title='获取数据' onPress={handleGetList} />

      {/* 4、useEffect */}
      <Text>关键词：{keyword}</Text>
      <TextInput placeholder='请输入内容'
        style = { styles.input }
        onChangeText = {keyword => setKeyword(keyword)}
      />


    </View>
  );
}

/* RN中写样式必须用 StyleSheet.create 创建
1)布局默认是flex布局，默认是竖直方向column，元素从上到下排列
flexShrink 默认为 0 而不是 1 ， flex 参数仅支持单个数字，不能像 web 那样设置 flex: 1 2 3 等等
 - https://reactnative.dev/docs/flexbox
2)写多个样式用中括号,后面样式会将前面覆盖
3)行内样式用双花括号
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 22,
    color: 'red',
    fontWeight: 'bold'
  },
  input:{
    height:40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,  
    borderColor: '#ccc',
    borderRadius: 5
  }
});

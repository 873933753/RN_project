import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import LoadingCmp from './components/shared/loadingCmp';
import NetworkErrCmp from './components/shared/networkErrCmp';
// import useFetchData from './hooks/useFetchData';
import useFetchData from './hooks/useReducerFetchData';

const themes = {
  light: {
    backgroundColor: '#fff',
    color: '#000'
  },
  dark: {
    backgroundColor: 'blue',
    color: '#fff'
  }
}

// 创建一个context对象
const ThemeContext = createContext({
  theme: themes.light,
  setTheme: () => {}
})

function ChildCmp () {
  const { theme } = useContext(ThemeContext);
  return (
    <View style = {[{ backgroundColor: theme.backgroundColor }]}>
      <Text style = {{ color: theme.color }}>这是子组件</Text>
    </View>
  )
}

function ChildCmp2 () {
  const { theme, setTheme } = useContext(ThemeContext);
  const changeTheme = () => {
    setTheme(prev => (
      prev.backgroundColor === 'blue' ? themes.light : themes.dark
    ));
  } 
  return (
    <View style = {[{ backgroundColor: theme.backgroundColor }]}>
      <Text style = {{ color: theme.color }}>这是孙组件</Text>
      <Button title='修改theme' onPress={ changeTheme } />
    </View>
  )
}

export default function App() {
  const [theme, setTheme] = useState(themes.dark);

  const [ keyword, setKeyword ] = useState('');
  // 6、使用自定义的hook
  const { data, loading: isLoading, error: isError, onReload } = useFetchData('/search', { q: keyword });
  const list = data?.courses ?? [];

  // 按回车才查询
  const handleSearch = () => {
    onReload();
  }


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
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <View style = {[styles.container]}>
        <StatusBar style="auto" />

        {/* 3、点击获取接口数据 */}
        {
          list.map((item,index) => {
            return <Text key={item.id} style = {{color:"#999999"}}>{item.name}</Text>
          })
        }

        {/* 4、useEffect */}
        <Text>关键词：{keyword}</Text>
        <TextInput placeholder='请输入内容'
          style = { styles.input }
          onChangeText = {keyword => setKeyword(keyword)}
          onSubmitEditing = { handleSearch }
          returnKeyType='search'
          value = { keyword }
        />

        <ChildCmp />
        <ChildCmp2 />

      </View>
    </ThemeContext.Provider>
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

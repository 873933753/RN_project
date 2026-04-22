import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Button } from 'react-native';

export default function NetworkErrCmp ({title, reloadData}) {
  return (
    <View style = { styles.container }>
      <SimpleLineIcons name={'drawer'} size={160} color="#dddddd" />
      <Text style = { styles.errText }>{ title || '抱歉，网络连接出错了' }</Text>
      {/* Button在双端表现不一致 */}
      {/* 
        <Button
          title='重新加载'
          style = { styles.button }
          onPress={() => {
            // 刷新页面，重新请求数据
            reloadData()
          }}
        />
      */}
      <TouchableOpacity style = { styles.reload } onPress={ () => reloadData() }>
        <Text style = { styles.label }>重新加载</Text>
      </TouchableOpacity> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgoundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errText: {
    color: '#999999'
  },
  reload: {
    backgroundColor: '#e09913',
    marginTop: 10,
    height: 40,
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10
  },
  label: {
    color: '#fff',
    lineHeight: 40
  }
})
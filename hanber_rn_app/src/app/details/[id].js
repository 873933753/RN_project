import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Stack, useNavigation } from 'expo-router'; // useParams是expo-router提供的一个hook，用来获取路由参数

export default function Detail() {
  // 获取参数
  const { id,limit } = useLocalSearchParams();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{ title: '课程详情'+ id }} /> */}
      <Text style={styles.content}> 
        Detail Page - {id} - {limit}
      </Text>
      <Text onPress={() => {navigation.setOptions({ title: '修改后的标题' })}}>
        修改标题 - useNavigation
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },      
  content: {
    fontSize: 60
  }
})    
import { StyleSheet, Text, View, Switch, Alert, Button, Dimensions, StatusBar  } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Image } from 'expo-image';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

/* Switch、Alert、Dimentions 、StatusBar、Image  */
export default function App() {
  const [ isEnabled, setIsEnabled ] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [ dimensions, setDimensions ] = useState({
    window: windowDimensions,
    screen: screenDimensions
  });

  /* 监听屏幕尺寸变化 */
  useEffect(() => {
    const onChange = ({ window, screen }) => {
      setDimensions({ window, screen });
    }
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    }
  }, [])

  const onPressOne = () => {
    Alert.alert('只有确认按钮', '这是一个只有确认按钮的alert', [
      { 
        text: '确认',
        onPress: () => console.log('确认了')
     }
    ])
  }

  const onPressTwo = () => {
    /* 按钮在ios超过3个显示竖排，android三个以上显示不出来 */
    Alert.alert('确认和取消按钮', '这是一个有确认和取消按钮的alert', [
      { 
        text: '取消', 
        onPress: () => console.log('取消了') 
      },
      { text: '确认', 
        onPress: () => console.log('确认了')
      }
    ])  
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.content}>
          Hello World!333
        </Text>
        {/* Switch ios和安卓样式不一样，无法修改 */}
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Button title="只有确认" onPress= { onPressOne } />
        <Button title="确认和取消" onPress = { onPressTwo } />
        {/* 屏幕尺寸 */}
        <Text style={styles.header}>Window Dimensions</Text>
          {Object.entries(dimensions.window).map(([key, value]) => (
            <Text key={key}>
              {key} - {value}
            </Text>
          ))}
        <Text style={styles.header}>Screen Dimensions</Text>
          {Object.entries(dimensions.screen).map(([key, value]) => (
            <Text key={key}>
              {key} - {value}
            </Text>
          ))}
        {/* StatusBar  - 状态栏*/}
        <StatusBar hidden />

        {/* Image */}
        <Image
          source={{uri:'http://192.168.1.102:3000/uploads/images/avatar-user.png'}}
          style={styles.image}
         />

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
  },
  header: {
    fontSize: 16,
    marginVertical: 10,
  },
  image:{
    width: 200,
    height: 200,
    resizeMode: 'cover' /* cover - 保持图片的宽高比，缩放图片以填充容器，可能会裁剪图片；contain - 保持图片的宽高比，缩放图片以适应容器，可能会留空白；stretch - 不保持图片的宽高比，拉伸图片以填充容器；repeat - 重复图片以填充容器；center - 保持图片的宽高比，不缩放图片，居中显示，如果图片比容器大则裁剪图片 */
  }
});
import { View, Text, FlatList } from 'react-native'
import { Link } from 'expo-router'
import { TouchableWithoutFeedback, Image } from 'react-native'

const renderItem = ({ item, index }, courses) => (
  <Link asChild href={{ pathname: '/courses/[id]', params: { id: item.id } }}>
    {/* 
      TouchableWithoutFeedback - 触摸事件不反馈任何视觉效果，适合包裹复杂组件，
      TouchableOpacity - 触摸时会有透明度变化的反馈效果，适合包裹简单组件
    */}
    <TouchableWithoutFeedback>
      <View
        style={[
          styles.course,
          /* 头尾间距 */
          index === 0 && styles.first,
          index === courses.length - 1 && styles.last,
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.category}>{item.category.name}</Text>
          <View style={styles.userWrapper}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.nickname}>{item.user.nickname}</Text>
              {/* numberOfLines - 超出部分省略显示，2行显示完就省略*/}
              <Text style={styles.company} numberOfLines={2}>
                {item.user.company}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Link>
)

export default function Slides({ courses }) {
  return (
    <View style={styles.slides}>
      <FlatList
        data={courses}
        renderItem={(item) => renderItem(item, courses)}
        keyExtractor={(item) => item.id}
        /* 开启横向滚动，FastList和ScrollView若方向一致会报错 */
        horizontal={true}
        /* showsHorizontalScrollIndicator - 是否显示滚动条 */
        showsHorizontalScrollIndicator={false}
      ></FlatList>
    </View>
  )
}

const styles = {
  slides: {
    marginTop: 10,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backGroundColor: '#fff',
  },
  course: {
    marginRight: 8,
  },
  image: {
    width: 320,
    height: 145,
    borderRadius: 10,
  },
  content: {
    paddingLeft: 10,
  },
  name: {
    width: 305,
    marginTop: 7,
    fontWeight: 'bold',
    fontSize: 13,
  },
  category: {
    marginTop: 6,
    fontSize: 8,
  },
  userWrapper: {
    marginTop: 15,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  nickname: {
    fontSize: 11,
  },
  company: {
    width: 100,
    marginTop: 2,
    fontSize: 10,
    color: '#777',
  },
  first: {
    marginLeft: 10,
  },
  last: {
    marginRight: 10,
  },
}

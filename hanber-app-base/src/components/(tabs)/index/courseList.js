import { View, Text, StyleSheet } from 'react-native'
import Slides from './slides'

export default function CourseList({ courses, title }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>{title}</Text>
      </View>
      <Slides courses={courses} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 6,
  },
  content: {
    backgroundColor: 'transparent',
    paddingLeft: 12,
    position: 'relative',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 11,
  },
})

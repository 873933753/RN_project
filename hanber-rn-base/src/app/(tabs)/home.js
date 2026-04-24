import { View, Text } from 'react-native'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>tanIndex!</Text>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}

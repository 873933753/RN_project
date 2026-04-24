import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import useFetchData from '@/hooks/useReducerFetchData'
import { Link } from 'expo-router'
import useAppColors from '@/theme/useAppColors'

export default function App() {
  const colors = useAppColors()
  const { data, loading, error } = useFetchData('/search', { q: 'node' })
  console.log('data-', data)

  const styles = createStyles(colors)

  return (
    <View style={styles.container}>
      <Text>hi!</Text>
      <Link href="/home" asChild>
        <Text>Go to home</Text>
      </Link>
      <StatusBar style="auto" />
    </View>
  )
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}

import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Detail() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        Detail Page
      </Text>
      <Link href="/" style={{color:'blue', fontSize: 30}}>  
        Go to Home
      </Link>
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
import { StyleSheet, Text, View } from 'react-native';

export default function Teacher() {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        Teacher Page
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
    fontSize: 20,
    fontWeight: 'bold'
  }
})
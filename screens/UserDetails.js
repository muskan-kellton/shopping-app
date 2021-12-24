import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const UserDetails = () => {
  return (
    <View style= {styles.container}>
      <Text style= {styles.heading}>User Details</Text>
      <Text style= {styles.text}>Name: Mus </Text>
      <Text style= {styles.text}>Email: m@gmail.com </Text>
      <Text style= {styles.text}>Password: 123456</Text>
      <Text style= {styles.text}>Phone: 8888777777</Text>
    </View>
  );
}
export default UserDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'mistyrose'
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10
  },
  text: {
    marginBottom: 10,
    fontWeight: 'bold',
  }
});
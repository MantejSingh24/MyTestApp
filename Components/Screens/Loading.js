import React, {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator, StyleSheet,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Loading = ({navigation}) => {
  useEffect(() => {
    _retrieveData();
  }, []);

  const check = (value, result) => {
    if (result === 'true') {
      navigation.navigate('Finish');
    } else if (value !== null) {
      console.log('index');
      console.log(value);
      navigation.navigate('ProfileScreen');
    } else if (value === null) {
      console.log('hello');
      navigation.navigate('Home');
    }
  };

  const _retrieveData = async () => {
    try {
      const indexx = await AsyncStorage.getItem('index');
      const result = await AsyncStorage.getItem('result');
      console.log(result);

      check(indexx, result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator color="#000" size="large" />
    </View>
  );
};
export default Loading;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

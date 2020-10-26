import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');
function HomeScreen({navigation}) {
  useEffect(() => {
    AsyncStorage.removeItem('JJ');
    AsyncStorage.removeItem('JB');

    AsyncStorage.removeItem('DT');

    AsyncStorage.removeItem('HH');

    AsyncStorage.removeItem('index');
    AsyncStorage.removeItem('result');
  } );
  
 
  return (
    <SafeAreaProvider
      style={{flex: 1, justifyContent: 'flex-end'}}
      forceInset={{top: 'always', bottom: 'always'}}>
      <View style={{flex: 1, bottom: 30, justifyContent: 'flex-end'}}>
        <ImageBackground
          resizeMethod="resize"
          style={styles.container}
          source={require('../../asserts/quizImage.jpg')}>
          <View style={{flex: 5}}></View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text
              style={{
                fontSize: 15,

                textAlign: 'center',
                color: '#fff',
                margin:10
              }}>
              hello world jaghghkhskahd asjdlsdjkls ajipjasdppd jlsajdl
              sjdkljlasdjlajudp pjsdpo aj 
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('ProfileScreen');
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  margin: 5,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                Start Quiz
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#101010',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    margin: 20,
  },
  internalContainer: {
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#F47D20',

    borderRadius: 40,

    marginHorizontal: 100,
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

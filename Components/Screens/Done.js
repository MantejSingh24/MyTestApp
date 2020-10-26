import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Image,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function Done({navigation}) {
  const [click, setClick] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Press again to SHARE',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    setClick(click + 1);
  };
  const backAction = () => {
    if (click == 1) {
      navigation.navigate('Finish');
      setClick(0);
    } else {
      toast();
    }

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  });
  const check = async () => {
    await AsyncStorage.setItem('restart', JSON.stringify(value));
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={require('../../asserts/democracylogo.png')}
          style={{height: 100, width: 350, alignSelf: 'center'}}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flex: 1.5,
          backgroundColor: '#fff',
          borderColor: '#F47D20',
          borderTopWidth: 1,
          borderBottomWidth: 1,
        }}>
        <View style={{flex: 3}}>
          <Image
            style={{flex: 2, width: 400, height: 400}}
            source={require('../../asserts/imgOne.jpg')}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            flex: 1,
            fontSize: 15,
            fontWeight: 'bold',
            margin: 10,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          hello world jaghghkhskahd asjdlsdjkls ajipjasdppd jlsajdl
          sjdkljlasdjlajudp pjsdpo jsdpojaso doajd asodjoas do asodjoas doas
          djoas doas doa sdho ashdd oasdhos dhoas dohi
        </Text>
      </View>

      <View style={{flex: 1}}>
        <View style={{marginTop: 10}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Finish');
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                margin: 5,
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
              check();
              setValue(1);
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                margin: 5,
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Restart the Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eae9e7',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',

    marginTop: 20,
  },

  button: {
    backgroundColor: '#fff',
    borderRadius: 40,
    borderColor: '#F47D20',
    borderWidth: 2,
    margin: 10,
  },
});
export default Done;

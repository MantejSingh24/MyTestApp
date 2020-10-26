import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  View,
  BackHandler,
  Alert,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  //Share,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Progress from 'react-native-progress';
import {set} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Fontisto';
//import ViewShot from 'react-native-view-shot';
import {captureScreen} from 'react-native-view-shot';
import Share from 'react-native-share';
import MyIcon from '../../asserts/src/configs/icon-font';


const Finish = ({navigation, arr = [1]}) => {
  const [jjcount, setJjcount] = useState({
    name: '',
    value: 0,
  });
  const [hhcount, setHhcount] = useState({
    name: '',
    value: 0,
  });
  const [jbcount, setJbcount] = useState({
    name: '',
    value: 0,
  });
  const [dtcount, setDtcount] = useState({
    name: '',
    value: 0,
  });
  const [vv, setVv] = useState(0);
  const [changed, setChanged] = useState(false);

  const [stateValues, setStateValues] = useState(sort);

  const sort = [jjcount, hhcount, jbcount, dtcount];

  // const onShare = async () => {
  //   try {
  // const result = await Share.share({
  //   url: 'http://www.example.com',
  // message: `Your political views are more inline with ${
  //   stateValues[0].name
  // }.\nHere's the quiz results:\n\n${stateValues[0].name}:  ${(
  //   (stateValues[0].value / 18) *
  //   100
  // ).toFixed(1)}%\n${stateValues[1].name}:  ${(
  //   (stateValues[1].value / 18) *
  //   100
  // ).toFixed(1)}%\n${stateValues[2].name}:  ${(
  //   (stateValues[2].value / 18) *
  //   100
  // ).toFixed(1)}%\n${stateValues[3].name}:  ${(
  //   (stateValues[3].value / 18) *
  //   100
  // ).toFixed(1)}%\n\nThis quiz taken via Democracy App`,
  //   subject: 'Democracy App Political Views Quiz Results',
  // });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const onShare = async () => {
    try {
      captureScreen({
        //either png or jpg or webm (Android). Defaults to png
        format: 'jpg',
        //quality 0.0 - 1.0 (default). (only available on lossy formats like jpg)
        quality: 0.8,
      }).then(
        //callback function to get the result URL of the screnshot
        (uri) => {
          let options = {
            title: 'Share Title',
            subject: 'Democracy App Political Views Quiz Results',
            message: `This quiz taken via Democracy App`,
            url: uri,
            type: 'image/jpeg',
          };
          Share.open(options)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              err && console.log(err);
            });
        },
        (error) => console.error('Oops, Something Went Wrong', error),
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const backAction = () => {
    BackHandler.exitApp();
    // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => null,
    //     style: 'cancel',
    //   },
    //   {
    //     text: 'YES',
    //     onPress: () => {
    //       navigation.reset({
    //         index: 0,
    //         routes: [{name: 'Home'}],
    //       });
    //     },
    //   },
    // ]);
    return true;
  };
  const sorted = async () => {
    const seet = sort
      .sort(function (a, b) {
        return b.value - a.value;
      })
      .slice(0);

    console.log(seet);
    setStateValues(seet);
    setChanged(true);
    await AsyncStorage.setItem('result', JSON.stringify(changed));
  };
  useEffect(() => {
    console.log('show something');
    _retrieveData();
    setTimeout(
      function () {
        sorted();
        setVv(1);
        sorted();
        console.log('once');
      }.bind(this),
      1000,
    );

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [vv]);

  const _retrieveData = async () => {
    try {
      const JJvalue = await AsyncStorage.getItem('JJ');
      const JBvalue = await AsyncStorage.getItem('JB');

      const HHvalue = await AsyncStorage.getItem('HH');

      const DTvalue = await AsyncStorage.getItem('DT');

      if (
        JJvalue !== null ||
        JBvalue !== null ||
        HHvalue !== null ||
        DTvalue !== null
      ) {
        setJjcount({
          name: 'Jo Jorgensen',
          value: JSON.parse(JJvalue) + 1,
        });
        setHhcount({
          name: 'Howie Hawkins',
          value: JSON.parse(HHvalue) + 1,
        });

        setJbcount({
          name: 'Joe Biden',
          value: JSON.parse(JBvalue) + 1,
        });

        setDtcount({
          name: 'Donald Trump',
          value: JSON.parse(DTvalue) + 1,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.5, justifyContent: 'center'}}>
        <View
          style={{
            margin: 5,
            borderWidth: 2,
            backgroundColor: '#fff',
            borderColor: '#fff',
            borderRadius: 20,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
              padding: 5,
            }}>
            Your political views are more inline with{' '}
            {vv === 1 ? stateValues[0].name : ''}.
          </Text>
        </View>
      </View>
      <View style={{flex: 4, padding: 5}}>
        <Text style={{fontSize: 18, padding: 10}}>
          Here's the quiz results:
        </Text>
        <FlatList
          data={stateValues}
          extraData={stateValues}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderColor: '#F47D20',
                  borderWidth: 2,
                  margin: 3,
                  borderRadius: 10,
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={require('../../asserts/imgOne.jpg')}
                      style={{
                        flex: 1,
                        height: 80,
                        width: 80,
                        margin: 10,
                        borderColor:
                          index === 0
                            ? '#058D20'
                            : '#fff' && index === 1
                            ? '#1365A4'
                            : '#fff' && index === 2
                            ? '#FEB304'
                            : '#fff' && index === 3
                            ? '#EE0900'
                            : '#fff',
                        borderWidth: 1,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,

                      justifyContent: 'center',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 15,
                        fontWeight: 'bold',
                        alignSelf: 'flex-start',
                        marginTop: 20,
                      }}>
                      {item.name}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'flex-end',
                          marginBottom: 20,
                          flex: 4,
                        }}>
                        <Progress.Bar
                          borderWidth={0}
                          unfilledColor={'#eae9e7'}
                          borderRadius={10}
                          progress={JSON.parse((item.value / 18).toFixed(1))}
                          width={200}
                          height={20}
                          color={
                            index === 0
                              ? '#058D20'
                              : '#fff' && index === 1
                              ? '#1365A4'
                              : '#fff' && index === 2
                              ? '#FEB304'
                              : '#fff' && index === 3
                              ? '#EE0900'
                              : '#fff'
                          }
                        />
                      </View>
                      <View
                        style={{
                          marginBottom: 20,
                          flex: 2,
                        }}>
                        <TouchableWithoutFeedback style={{margin: 5}}>
                          <Text
                            style={{
                              fontSize: 12,
                              borderRadius: 50,
                              borderWidth: 1,
                              alignSelf: 'center',
                              backgroundColor: '#eae9e7',
                              padding: 5,
                              borderColor:
                                index === 0
                                  ? '#058D20'
                                  : '#fff' && index === 1
                                  ? '#1365A4'
                                  : '#fff' && index === 2
                                  ? '#FEB304'
                                  : '#fff' && index === 3
                                  ? '#EE0900'
                                  : '#fff',
                              color:
                                index === 0
                                  ? '#058D20'
                                  : '#fff' && index === 1
                                  ? '#1365A4'
                                  : '#fff' && index === 2
                                  ? '#FEB304'
                                  : '#fff' && index === 3
                                  ? '#EE0900'
                                  : '#fff',
                            }}>
                            <MyIcon name={'phone'} size={30} color="#000" />
                          </Text>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View
        style={{
          marginBottom: 5,
          flexDirection: 'row',
          backgroundColor:"#000"
        }}>
        <View style={{flex: 1, alignSelf: 'flex-end'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.reset({
                index: 1,
                routes: [{name: 'Home'}],
              });
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                margin: 5,
                alignSelf: 'center',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              Retake
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignSelf: 'flex-end'}}>
          <TouchableOpacity
            style={{
              ...styles.button,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={() => {
              onShare();
            }}>
            <Icon name="share-a" size={20} style={{alignSelf: 'center'}}></Icon>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                margin: 5,
                alignSelf: 'center',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#eae9e7',
    flexDirection: 'column',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#fff',
    borderRadius: 40,
    borderColor: '#F47D20',
    borderWidth: 2,
    margin: 5,
  },
});
export default Finish;

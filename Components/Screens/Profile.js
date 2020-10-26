import React, {useState, useEffect, useRef, Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  BackHandler,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {DATA} from '../data/DATA';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from './Loading';
import * as Animatable from 'react-native-animatable';

  let textInput = null; 

const _renderDoneButton = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Animatable.View
        style={{
          backgroundColor: '#fff',

          borderColor: '#F47D20',
          justifyContent: 'center',
          marginHorizontal: 30,
          borderWidth: 2,
          borderRadius: 10,
          margin: 5,
        }}
        animation={'bounceIn'}
        easing={'ease-in'}
        duration={350}>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            margin: 5,
            alignSelf: 'center',
            fontWeight: 'bold',
          }}>
          Done
        </Text>
      </Animatable.View>
    </View>
  );
};

const ProfileScreen = ({navigation}) => {
  const [data, setData] = React.useState(DATA);
  const [value, setValue] = React.useState(0);
  const [inndex, setInndex] = React.useState();
  const [jjcount, setJjcount] = React.useState(0);
  const [hhcount, setHhcount] = React.useState(0);
  const [jbcount, setJbcount] = React.useState(0);
  const [dtcount, setDtcount] = React.useState(0);
  const [ selected, setSelected ] = useState();
    const [startloading, setStartloading] = useState(false);

  let count = 0;

  const _renderNextButton = () => {
    return (
      <View
        style={{
          backgroundColor: '#eae9e7',

          justifyContent: 'flex-end',
          marginHorizontal: 30,
        }}>
        <Animatable.View
          style={{
            backgroundColor: '#fff',

            borderColor: '#F47D20',
            justifyContent: 'center',
            marginHorizontal: 10,
            borderWidth: 2,
            borderRadius: 10,
            margin: 5,
          }}
          animation={'bounceIn'}
          easing={ 'ease-in' }
        duration={350}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              margin: 5,
              alignSelf: 'center',
              fontWeight: 'bold',
            }}>
            Next
          </Text>
        </Animatable.View>
      </View>
    );
  };

  const resume = (value) => {
    AsyncStorage.setItem('index', JSON.stringify(value));
    console.log(value);
  };

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to quit', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: () => {
           navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }), AsyncStorage.removeItem('index');
        },
      },
    ]);
    return true;
  };

 const  Loading = async () => {
   const resumeValue = await AsyncStorage.getItem( 'index' );
    const JJvalue = await AsyncStorage.getItem('JJ');
    const JBvalue = await AsyncStorage.getItem('JB');

    const HHvalue = await AsyncStorage.getItem('HH');

    const DTvalue = await AsyncStorage.getItem('DT');

 
   console.log("its here in loading")
   if ( resumeValue !== null ) {
           setStartloading(false);

     console.log( 'its here in loading with false' );
     textInput.goToSlide(resumeValue -1);
     console.log(JSON.parse(resumeValue) + 'resumevalue');
     console.log(JSON.parse(JJvalue) + 'jj');
     console.log(JSON.parse(JBvalue) + 'jb');
     console.log(JSON.parse(HHvalue) + 'hh');
     console.log(JSON.parse(DTvalue) + 'dt');
     setJjcount(JSON.parse(JJvalue));
     setHhcount(JSON.parse(HHvalue));

     setJbcount(JSON.parse(JBvalue));

     setDtcount(JSON.parse(DTvalue));
     

   } else {
     setStartloading( false );
      textInput.goToSlide(0);
      AsyncStorage.removeItem('JJ');
      AsyncStorage.removeItem('JB');

      AsyncStorage.removeItem('DT');

      AsyncStorage.removeItem('HH');
      AsyncStorage.removeItem('index');

      console.log("hhhhhhh")
    }
  }
  // const ResumeCheck = async () => {
     
  //   const resumeValue = await AsyncStorage.getItem('index');
  //   const JJvalue = await AsyncStorage.getItem('JJ');
  //   const JBvalue = await AsyncStorage.getItem('JB');

  //   const HHvalue = await AsyncStorage.getItem('HH');

  //   const DTvalue = await AsyncStorage.getItem('DT');

  //   if (resumeValue !== null) {
  //     textInput.goToSlide(resumeValue - 1);
  //     console.log(JSON.parse(resumeValue) + 'resumevalue');
  //     console.log(JSON.parse(JJvalue) + 'jj');
  //     console.log(JSON.parse(JBvalue) + 'jb');
  //     console.log(JSON.parse(HHvalue) + 'hh');
  //     console.log(JSON.parse(DTvalue) + 'dt');
  //     setJjcount(JSON.parse(JJvalue));
  //     setHhcount(JSON.parse(HHvalue));

  //     setJbcount(JSON.parse(JBvalue));

  //     setDtcount( JSON.parse( DTvalue ) );
     
  //   } else {
  //     console.log('happyfaces');
  //     textInput.goToSlide(0);
  //    AsyncStorage.removeItem('JJ');
  //     AsyncStorage.removeItem('JB');

  //      AsyncStorage.removeItem('DT');

  //     AsyncStorage.removeItem('HH');
  //      AsyncStorage.removeItem('index');
  //   }
  // };

 

  useEffect( () => {

      setStartloading(true);
  
    
      //  ResumeCheck()
      
    
    Loading()
    
    async function fetchMyAPI() {
      const JJvalue = await AsyncStorage.getItem( 'JJ' );
      const JBvalue = await AsyncStorage.getItem( 'JB' );

      const HHvalue = await AsyncStorage.getItem( 'HH' );

      const DTvalue = await AsyncStorage.getItem( 'DT' );

      const resumeValue = await AsyncStorage.getItem( 'index' );


      if ( resumeValue !== null ) {
        setStartloading( false );

        console.log( 'its here in loading with false' );
        textInput.goToSlide( resumeValue - 1 );
     
        setJjcount( JSON.parse( JJvalue ) );
        setHhcount( JSON.parse( HHvalue ) );

        setJbcount( JSON.parse( JBvalue ) );

        setDtcount( JSON.parse( DTvalue ) );
     

      } else {
        setStartloading( false );
        textInput.goToSlide( 0 );
        AsyncStorage.removeItem( 'JJ' );
        AsyncStorage.removeItem( 'JB' );

        AsyncStorage.removeItem( 'DT' );

        AsyncStorage.removeItem( 'HH' );
        AsyncStorage.removeItem( 'index' );

        console.log( "hhhhhhh" )
      }
    }
    


fetchMyAPI();










   
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('JJ', JSON.stringify(jjcount));
      await AsyncStorage.setItem('JB', JSON.stringify(jbcount));

      await AsyncStorage.setItem('DT', JSON.stringify(dtcount));

      await AsyncStorage.setItem('HH', JSON.stringify(hhcount));
    } catch (error) {
      console.log(error);
    }
  };

  const check = (index) => {
    if (inndex >= 0) {
      console.log(inndex);
      for (var i = 0; i < inndex; i++) {
        if (inndex === DATA[i].id) {
          for (var j = 0; j < 3; j++) {
            if (value === DATA[i].key4[j].id) {
              for (var k = 0; k <= 3; k++) {
                if (DATA[i].key4[j].points[k] === 'JJ') {
                  setJjcount(jjcount + 1);
                  console.log('JJ' + jjcount);
                  AsyncStorage.setItem('JJ', JSON.stringify(jjcount));
                } else if (DATA[i].key4[j].points[k] === 'JB') {
                  setJbcount(jbcount + 1);
                  console.log('JB' + jbcount);
                  AsyncStorage.setItem('JB', JSON.stringify(jbcount));
                } else if (DATA[i].key4[j].points[k] === 'HH') {
                  setHhcount(hhcount + 1);
                  console.log('HH' + hhcount);
                  AsyncStorage.setItem('DT', JSON.stringify(dtcount));
                } else if (DATA[i].key4[j].points[k] === 'DT') {
                  setDtcount(dtcount + 1);
                  console.log('DT' + dtcount);
                  AsyncStorage.setItem('HH', JSON.stringify(hhcount));
                }
              }
              setInndex(0);
              setValue(0);
            }
          }
        }
      }
    }
  };
 
     if ( startloading === true ) {
            return (
              <View style={styles.Loadingcontainer}>
                <Text>Loading</Text>
                <ActivityIndicator color="#000" size="large" />
              </View>
            );
          }
          else{ return(<View style={styles.container}>
      <AppIntroSlider
        data={data}
        scrollEnabled={false}
        showPrevButton={false}
        activeDotStyle={{
          backgroundColor: '#eae9e7',
          position: 'absolute',
          top: 500,
        }}
        dotClickEnabled={false}
        ref={(input) => {
          textInput = input;
        }}
        showDoneButton={selected > 0 ? true : false}
        showNextButton={selected > 0 ? true : false}
        keyExtractor={(item, index) => index.toString()}
        renderDoneButton={selected > 0 ? _renderDoneButton : null}
        renderNextButton={selected > 0 ? _renderNextButton : null}
        bottomButton={selected > 0 ? true : false}
        dotStyle={{
          backgroundColor: '#000',
          position: 'absolute',
          top: 500,
        }}
        onSlideChange={(index) => {
          check(index);
          resume(index);
          setSelected(0);
          _storeData();
        }}
        onDone={() => {
          navigation.navigate('Finish'), check(), _storeData();
        }}
        renderItem={ ( { item } ) => {
          
          if (item.key3 !== null) {
            return (
              <View style={styles.container}>
                <View style={{flex: 1.7, justifyContent: 'center'}}>
                  <View style={{flex: 1.5, backgroundColor: '#eae9e7'}}></View>
                  <Image
                    style={{
                      flex: 2,
                      width: 400,
                      height: 400,
                      alignSelf: 'baseline',
                    }}
                    source={item.key5}
                    resizeMode="stretch"
                  />
                </View>
                <View
                  style={{
                    flex: 1.4,
                    backgroundColor: '#fff',
                    paddingBottom: 20,
                  }}>
                  <Text style={styles.Heading}>{item.title}</Text>

                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        selected === item.id + 1 ? '#F47D20' : '#eae9e7',
                      justifyContent: 'center',
                      marginHorizontal: 20,

                      borderRadius: 10,
                      margin: 5,
                      padding: 5,
                    }}
                    value={item.id}
                    onPress={() => {
                      setValue(0);
                      setInndex(item.id);
                      setSelected(item.id + 1);
                    }}>
                    <Text
                      style={{
                        color: selected === item.id + 1 ? '#eae9e7' : '#F47D20',
                        fontSize: 18,
                        alignSelf: 'center',
                      }}>
                      {item.key1}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    value={item.id}
                    style={{
                      backgroundColor:
                        selected === item.id + 2 ? '#F47D20' : '#eae9e7',
                      justifyContent: 'center',
                      marginHorizontal: 20,

                      borderRadius: 10,
                      margin: 5,
                      padding: 5,
                    }}
                    onPress={() => {
                      setValue(1);
                      setInndex(item.id);
                      setSelected(item.id + 2);
                    }}>
                    <Text
                      style={{
                        color: selected === item.id + 2 ? '#eae9e7' : '#F47D20',
                        fontSize: 18,
                        alignSelf: 'center',
                      }}>
                      {item.key2}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    value={item.id}
                    style={{
                      backgroundColor:
                        selected === item.id + 3 ? '#F47D20' : '#eae9e7',
                      justifyContent: 'center',
                      marginHorizontal: 20,

                      borderRadius: 10,
                      margin: 5,
                      padding: 5,
                    }}
                    onPress={() => {
                      setValue(2);
                      setInndex(item.id);
                      setSelected(item.id + 3);
                    }}>
                    <Text
                      style={{
                        color: selected === item.id + 3 ? '#eae9e7' : '#F47D20',
                        fontSize: 18,
                        alignSelf: 'center',
                      }}>
                      {item.key3}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1.1, justifyContent: 'flex-end'}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 24,
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginBottom: 85,
                    }}>
                    {item.id} /18
                  </Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.container}>
                <View style={{flex: 1.8, justifyContent: 'center'}}>
                  <View style={{flex: 1, backgroundColor: '#eae9e7'}}></View>
                  <Image
                    style={{
                      flex: 2,
                      width: 400,
                      height: 400,
                      alignSelf: 'baseline',
                    }}
                    source={item.key5}
                    resizeMode="stretch"
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    position: 'relative',
                  }}>
                  <Text style={styles.Heading}>{item.title}</Text>

                  <TouchableOpacity
                    color="green"
                    value={item.id}
                    style={{
                      backgroundColor:
                        selected === item.id + 4 ? '#F47D20' : '#eae9e7',
                      justifyContent: 'center',
                      marginHorizontal: 20,

                      borderRadius: 10,
                      margin: 5,
                      padding: 5,
                    }}
                    onPress={() => {
                      setValue(0);
                      setInndex(item.id);
                      setSelected(item.id + 4);
                    }}>
                    <Text
                      style={{
                        color: selected === item.id + 4 ? '#eae9e7' : '#F47D20',
                        fontSize: 18,
                        alignSelf: 'center',
                      }}>
                      {item.key1}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    value={item.id}
                    style={{
                      backgroundColor:
                        selected === item.id + 5 ? '#F47D20' : '#eae9e7',
                      justifyContent: 'center',
                      marginHorizontal: 20,

                      borderRadius: 10,
                      margin: 5,
                      padding: 5,
                    }}
                    onPress={() => {
                      setValue(1);
                      setInndex(item.id);
                      setSelected(item.id + 5);
                    }}>
                    <Text
                      style={{
                        color: selected === item.id + 5 ? '#eae9e7' : '#F47D20',
                        fontSize: 18,
                        alignSelf: 'center',
                      }}>
                      {item.key2}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{flex: 0.9, justifyContent: 'flex-end'}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 24,
                      fontWeight: 'bold',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginBottom: 85,
                    }}>
                    {item.id} /18
                  </Text>
                </View>
              </View>
            );
          }
        }}
      />
    </View>)}
    
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#eae9e7',
  },
  Loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  Heading: {
    fontSize: 17,
    color: '#000',
    margin: 10,

    fontFamily: 'serif',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  button: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 40,
    borderColor: '#F47D20',
    borderWidth: 2,
    marginBottom: 50,
    marginHorizontal: 120,
  },
});
export default ProfileScreen;

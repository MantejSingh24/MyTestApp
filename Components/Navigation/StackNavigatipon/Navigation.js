import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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

import ProfileScreen from '../../Screens/Profile';
import HomeScreen from '../../Screens/Home';
import Done from '../../Screens/Done';
import Finish from '../../Screens/Finish';
import Loading from '../../Screens/Loading';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Finish"
          component={Finish}
          path={'first/'}
          options={{
            headerShown: true,

            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#F47D20',
            headerLeft: null,
            headerTitle: (
              <Image
                style={{width: 150, height: 150}}
                source={require('../../../asserts/democracylogo.png')}
                resizeMode="repeat"
              />
            ),
            headerTitleStyle: {
              alignSelf: 'center',
            },
          }}
        />
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            title: 'Quiz',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#F47D20',
            headerLeft: null,
            headerTitle: (
              <Image
                style={{width: 150, height: 150}}
                source={require('../../../asserts/democracylogo.png')}
                resizeMode="repeat"
              />
            ),
            headerTitleStyle: {
              alignSelf: 'center',
            },
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Done"
          component={Done}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;

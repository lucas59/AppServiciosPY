import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Reducers from './Redux/reducers/index';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import { createStore } from 'redux';
import ApikeyDemo from './src/Utils/Constans/Apikey.demo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Profile, Signup, Home, NewService } from './src/Screens';


const Store = createStore(Reducers)

const Stack = createStackNavigator();

export default class App extends Component {

  constructor(props) {
    super(props);
    if (!firebase.apps.length) { firebase.initializeApp(ApikeyDemo.FirebaseConfig) }
  }



  render() {
    const optionHeader = {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }

    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
            <Stack.Screen name="Signup" component={Signup} />

            <Stack.Screen
              options={optionHeader}
              name="Home"
              component={Home} />


            <Stack.Screen name="Profile" options={optionHeader} component={Profile} />
            <Stack.Screen name="NewService" options={optionHeader} component={NewService} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
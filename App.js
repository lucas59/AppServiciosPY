import React, { Component, useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'
import Login from './src/Screens/Auth/Login/Login';
import Signup from './src/Screens/Auth/Signup/Signup';
import Home from './src/Screens/Home/Home';
import Reducers from './Redux/reducers/index';
import Search from './src/Screens/Home/Search/Search';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';

import { createStore } from 'redux';
import ApikeyDemo from './src/Utils/Constans/Apikey.demo';


const HomeTab = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Mapa"
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Buscador"
    }
  }
}, {
  initialRouteName: "Home",
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarOptions: {
      activeTintColor: "orange",
      backgroundColor: "#ebedf1",
    },
    headerShown: true,
    tabBarIcon: ({ focused, horizontal, titnColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === "Home") {
        iconName = `map-marker${focused ? '' : '-outline'}`
      } else {
        iconName = `map-search${focused ? '' : '-outline'}`

      }
      return <MaterialCommunityIcons color={focused ? "orange" : "gray"} name={iconName} size={30} titnColor />
    },
  }),
});

const Store = createStore(Reducers)

const EntryStack = createStackNavigator({
  Login: Login,
  Signup: Signup
}, {
  headerMode: 'none',
  mode: "modal",
  initialRouteName: "Login"
});

const Stack = createStackNavigator({
  Main: {
    screen: HomeTab
  },
  Entry: {
    screen: EntryStack
  },
},
  {
    initialRouteName: "Entry",
    headerMode: 'none',
  }
);


const AppContainer = createAppContainer(Stack)

export default class App extends Component {

  constructor(props) {
    super(props);
    if (!firebase.apps.length) { firebase.initializeApp(ApikeyDemo.FirebaseConfig) }
  }

  render() {
    return (
      <Provider store={Store}>
        <AppContainer />
      </Provider>
    )
  }
}
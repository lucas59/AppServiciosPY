import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Reducers from './Redux/reducers/index';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';

import { createStore } from 'redux';
import ApikeyDemo from './src/Utils/Constans/Apikey.demo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import Logo from "./assets/logo.png"
import { Login, Profile, Signup, Home } from './src/Screens';

/*const HomeTab = createBottomTabNavigator({
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


const HomeTab = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Mapa"
    }
  },
}, {
  headerMode: 'none',
  mode: "modal",
  initialRouteName: "Login"
});



const EntryStack = createStackNavigator({
  Login: Login,
  Signup: Signup
}, {
  headerMode: 'none',
  mode: "modal",
  initialRouteName: "Login"
});
*/
/*const Stack = createStackNavigator({
  Main: {
    screen: HomeTab
  },
  Entry: {
    screen: EntryStack
  },
},
  {
    initialRouteName: "Main",
    headerMode: 'none',
  }
);*/


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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
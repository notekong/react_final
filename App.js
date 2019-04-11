import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import SignInScreen from './components/SignIn';
import NoteScreen from './components/Note';
import CalendarScreen from './components/Calendar';

const RootStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen
  },
  Note: {
    screen: NoteScreen
  },
  Calendar: {
    screen: CalendarScreen
  },
},
{
  initialRouteName: 'SignIn',
},
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {


  render() {
    return <AppContainer />;
  }
}

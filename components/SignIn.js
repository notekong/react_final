import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class SignInScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTintStyle: {
      fontWeight: 'bold',
    },
  };


  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go to Notes"
          onPress={() => { 
            this.props.navigation.navigate('Note');
          }}
        />

        <Button
          title="Go to Calendar"
          onPress={() => { 
            this.props.navigation.navigate('Calendar');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

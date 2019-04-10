import React, { Component } from 'react';
import {  View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    itemsList: {
        flex: 1,
        flexDirection: 'column',
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemDetails: {
        fontSize: 20,

    }
});



export default class ItemComponent extends Component {

  static propTypes = {
      items: PropTypes.array.isRequired
  };

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
            return (
                <View key={index}>
                    <Text style={styles.itemTitle}>{item.username}</Text>
                    <Text style={styles.itemDetails}>{item.notes.slice(1).join('\n')}</Text>
                    <Text style={styles.itemtext}>----------------------------------</Text>

                </View>
            )
        })}
      </View>
    );
  }
}



import React from 'react';
import { View, Modal, Text, Platform, TouchableHighlight, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendario';


export function CloseButton({ onClose, children }) {
  return (
    <View>
      <Text style={{ fontSize: 20, marginLeft: 10 }} onPress={onClose}>
        Close
      </Text>
      {children}
    </View>
  );
}

export default class CalendarScreen extends React.PureComponent<
  {},
  {
    isVisibleModalCustom: boolean,
  },
> {
  state = {
    isVisibleModalCustom: false,
  };

  handleOpenCustomModal = () => {
    this.setState({ isVisibleModalCustom: true });
  };

  handleCloseCustomModal = () => {
    this.setState({ isVisibleModalCustom: false });
  };

  renderDayContent = (item: DayType) => {
    const { isActive, date } = item;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={[
            { color: isActive ? 'green' : 'grey' },
            THEME.dayTextStyle,
            isActive ? THEME.activeDayTextStyle : {},
          ]}
        >
          {date.getDate()}
        </Text>
        <Text style={{ fontSize: 7 }}>asd</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <TouchableHighlight
          style={styles.closeButton}
          onPress={this.handleOpenCustomModal}
        >
        <Text>Open Calendar</Text>
        </TouchableHighlight>

        <Modal
          animationType="fade"
          onRequestClose={() => this.setState({ isVisibleModalCustom: false })}
          visible={this.state.isVisibleModalCustom}
        >
          <CloseButton onClose={this.handleCloseCustomModal}>
            <Calendar
              locale="en"
              monthHeight={370}
              numberOfMonths={600}
              initialListSize={4}
              onChange={console.log}
              theme={THEME}
              // renderDayContent={this.renderDayContent}
            />
          </CloseButton>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closeButton: {
    top:50,
    height: 50,
    width: 100,
    flexDirection: 'row',
    backgroundColor:'#e0d3af',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center',
    borderColor: "gray",
    borderWidth: 2
  },
});


const THEME = {
  activeDayColor: {},
  monthTitleTextStyle: {
    color: '#6d95da',
    fontWeight: '300',
    fontSize: 16,
  },
  emptyMonthContainerStyle: {},
  emptyMonthTextStyle: {
    fontWeight: '200',
  },
  weekColumnsContainerStyle: {},
  weekColumnStyle: {
    paddingVertical: 10,
  },
  weekColumnTextStyle: {
    color: '#b6c1cd',
    fontSize: 13,
  },
  nonTouchableDayContainerStyle: {},
  nonTouchableDayTextStyle: {},
  startDateContainerStyle: {},
  endDateContainerStyle: {},
  dayContainerStyle: {},
  dayTextStyle: {
    color: '#2d4150',
    fontWeight: '200',
    fontSize: 15,
  },
  dayOutOfRangeContainerStyle: {},
  dayOutOfRangeTextStyle: {},
  todayContainerStyle: {},
  todayTextStyle: {
    color: '#6d95da',
  },
  activeDayContainerStyle: {
    backgroundColor: '#6d95da',
  },
  activeDayTextStyle: {
    color: 'white',
  },
  nonTouchableLastMonthDayTextStyle: {},
};


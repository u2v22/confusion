import React, { Component } from 'react';
import { Text, View, StyleSheet, Switch, Button, ScrollView, Picker, Modal, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

class Reservation extends Component {
  constructor(props){
    super(props);

    const today = new Date();
    const dateToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    this.state = {
      guests: 1,
      smoking: false,
      date: dateToday,
      showModal: false
    }
  }

  handleReservation(){
    const smoking = this.smoking ? 'Yes' : 'No';

    Alert.alert(
          'Confirm your Reservation Details',
          'Guests: ' + this.state.guests + '\nSmoking: ' + smoking + '\nDate: ' + this.state.date,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('cancelled'),
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => this.resetForm()
            }
          ],
          { cancelable: false }
        )

    this.toggleModal();
  }

  toggleModal(){
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm(){
    this.setState({
      guests: 1,
      smoking: false,
      date: ''
    });
  }

  render(){
    return(
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>
              Number of guests
            </Text>
            <Picker style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue })}>
                <Picker.Item label='1' value='1' />
                <Picker.Item label='2' value='2' />
                <Picker.Item label='3' value='3' />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>
              Smoking/Non-Smoking?
            </Text>
            <Switch style={styles.formItem}
                    value={this.state.smoking}
                    trackColor='#512DA8'
                    onValueChange={(value) => this.setState({ smoking: value})}>
            </Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>
              Date and Time:
            </Text>
            <DatePicker style={{ flex: 2, marginRight: 20 }}
                        date={this.state.date}
                        format=''
                        mode='datetime'
                        placeholder='Select Date & Time'
                        minDate='2020-04-01'
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36
                          }
                        }}
                        format="YYYY-MM-DD"
                        onDateChange={(date) => {this.setState({date: date})}}
                        />
          </View>
          <View style={styles.formRow}>
            <Button title='Submit'
                    color='#512DA8'
                    onPress={() => this.handleReservation()}/>
          </View>
        </Animatable.View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    margin: 10,
    fontSize: 18
  }
});

export default Reservation;

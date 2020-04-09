import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

class ContactUs extends Component{

  sendMail(){
    MailComposer.composeAsync({
      recipients: ['veronica.wajda@gmail.com'],
      subject: 'Just saying hello',
      body: 'To whom it may concern'
    })
  }

  render(){
    const address = "\
        121, Clear Water Bay Road \n \
        Clear Water Bay, Kowloon \n \
        HONG KONG \n \
        Tel: +852 1234 5678 \n \
        Fax: +852 8765 4321 \n \
        Email:confusion@food.net"
    return(
      <Card
          title={'Our Address'}
          >
          <Text style={{ margin: 10 }}>
            {address}
          </Text>
          <Button title='  Send Email'
                  buttonStyle={{ backgroundColor: '#512DA8'}}
                  icon={
                    <Icon name='envelope-o'
                          type='font-awesome'
                          color='#ffffff'
                    />
                  }
                  onPress={this.sendMail}
          />
        </Card>
    );
  }
}

export default ContactUs;



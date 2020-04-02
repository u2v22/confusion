import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';

export function ContactUs(){

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
      </Card>
  );
}



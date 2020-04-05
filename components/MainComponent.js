import React, { Component } from 'react';
import {
          View,
          Platform,
          Image,
          StyleSheet,
          ScrollView,
          Text,
          SafeAreaView
       } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenContainer } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

import Menu, { MenuScreen } from './MenuComponents';
import DishDetail from './DishDetailComponent';
import AboutUs from './AboutUs';
import { ContactUs } from './ContactUs';
import Home from './HomeComponent';

const AboutUsNavigator = createStackNavigator();
const ContactUsNavigator = createStackNavigator();

const Drawer = createDrawerNavigator();

export const Main = () => {
  const style={
    flex:1,
    paddingTop: Platform.OS === 'ios' ? 0 : 25
  }

  return(
    <NavigationContainer style={style}>
      <Drawer.Navigator>
        <Drawer.Screen name="Menu" component={Menu} options={{ title: 'Menu' }} />
        <Drawer.Screen name="AboutUs" component={AboutUs} options={{ title: 'About Us'}} />
        <Drawer.Screen name="ContactUs" component={ContactUs} options={{ title: 'Contact Us'}} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});


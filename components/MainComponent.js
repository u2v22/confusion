import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import Menu from './MenuComponents';
import DishDetail from './DishDetailComponent';
import { AboutUs } from './AboutUs';
import { ContactUs } from './ContactUs';
import Home from './HomeComponent';

import { DISHES } from '../shared/dishes';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    DishDetail: { screen: DishDetail },
    AboutUs: { screen: AboutUs},
    ContactUs: { screen: ContactUs }
  },
  {
    initialRouteName: 'Menu',
    navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"
      }
    }
  }
);

const HomeNavigator = createStackNavigator({
    Home: { screen: Home },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home'
    }
  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us'
    }
  },
  AboutUs: {
    screen: AboutUs,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us'
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu'
    }
  }
}, {
  drawerBackgroundColor: '#D1C4E9'
})

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null
    }
  }


  render(){
    const style={
      flex:1,
      paddingTop: Platform.OS === 'ios' ? 0 : 25
    }

    return(
      <View style={style}>
        <MainNavigator />
      </View>
    )
  }
}

export default Main;


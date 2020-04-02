import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Menu from './MenuComponents';
import DishDetail from './DishDetailComponent';
import AboutUs from './AboutUs';
import { ContactUs } from './ContactUs';
import Home from './HomeComponent';

import { DISHES } from '../shared/dishes';

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Icon name='menu'
                          size={24}
                          color='white'
                          onPress={() => navigation.toggleDrawer()}
                    />
      })
    },
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
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: <Icon name='menu'
                        size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                  />
    })
  }
);

const AboutUsNavigator = createStackNavigator({
  AboutUs: { screen: AboutUs },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: <Icon name='menu'
                        size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                  />
    })
  }
);

const ContactUsNavigator = createStackNavigator({
  ContactUs: { screen: ContactUs },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: <Icon name='menu'
                        size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                  />
    })
  }
);

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon name='home' type='font-awesome' size={24} color={ tintColor } />
      )
    }
  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
      drawerIcon: ({ tintColor }) => (
        <Icon name='address-card' type='font-awesome' size={24} color={ tintColor } />
      )
    }
  },
  AboutUs: {
    screen: AboutUs,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => (
        <Icon name='info-circle' type='font-awesome' size={24} color={ tintColor } />
      )
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor }) => (
        <Icon name='list' type='font-awesome' size={24} color={ tintColor } />
      )
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


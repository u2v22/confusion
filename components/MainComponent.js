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

import { MyTabs } from './LoginComponent';
import Menu, { MenuScreen } from './MenuComponents';
import DishDetail from './DishDetailComponent';
import Favorites from './FavoriteComponent';
import AboutUs from './AboutUs';
import LoginTab from './LoginComponent';
import ContactUs from './ContactUs';
import Home from './HomeComponent';
import Reservation from './ReservationComponent';
import { fetchDishes, fetchComments, fetchPromotions, fetchLeaders } from '../redux/ActionCreators';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const Drawer = createDrawerNavigator();

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromotions: () => dispatch(fetchPromotions())
});

const MenuStack = createStackNavigator();

const MenuStackScreen = ({ navigation }) => {
  return(
    <MenuStack.Navigator>
      <MenuStack.Screen name='Menu'
                        component={Menu} />
      <MenuStack.Screen name='DishDetail'
                        component={DishDetail}
                        onPress={() => navigation.navigate('DishDetail', { dishId: 3 })}/>
    </MenuStack.Navigator>
  )
}


export function DrawerScreen({ navigation }) {
  const style={
    flex:1,
    paddingTop: Platform.OS === 'ios' ? 0 : 25
  }
  return(
    <NavigationContainer style={style}>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name="MyTabs"
                       component={MyTabs}
                       options={{ title: 'Login'}} />
        <Drawer.Screen name="Home"
                       component={Home}
                       options={{ title: 'Home' }} />
        <Drawer.Screen name="MenuStackScreen"
                       component={MenuStackScreen}
                       options={{ title: 'Menu' }} />
        <Drawer.Screen name="AboutUs"
                       component={AboutUs}
                       options={{ title: 'About Us'}} />
        <Drawer.Screen name="ContactUs"
                       component={ContactUs}
                       options={{ title: 'Contact Us'}} />
        <Drawer.Screen name="Favorites"
                       component={Favorites}
                       options={{ title: 'My Favorites'}} />
        <Drawer.Screen name="Reservation"
                       component={Reservation}
                       options={{ title: 'Make a Reservation'}} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

class Main extends Component{
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchLeaders();
  }

  render(){
    return(
      <DrawerScreen />
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);


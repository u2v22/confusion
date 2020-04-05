import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { ScrollView, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { View, Platform, Image, StyleSheet} from 'react-native';

import Menu from './MenuComponents';
import DishDetail from './DishDetailComponent';
import AboutUs from './AboutUs';
import { ContactUs } from './ContactUs';
import Home from './HomeComponent';

import { MainNavigator } from '../screens/mainScreen';
import { AboutUsNavigator } from '../screens/mainScreen';
import { ContactUsNavigator } from '../screens/mainScreen';
import { HomeNavigator } from '../screens/mainScreen';
import { MenuNavigator } from '../screens/mainScreen';

import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromotions, fetchLeaders } from '../redux/ActionCreators';


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
  fetchComments: () => dispatch(fetchComments()),
  fetchPromotions: () => dispatch(fetchPromotions()),
  fetchLeaders: () => dispatch(fetchLeaders())
});


const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={ styles.container }
                  forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={ styles.drawerHeader }>
        <View style={{ flex: 1 }}>
          <Image source={require('../assets/images/logo.png')}
                 style={ styles.drawerImage } />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={ styles.drawerHeaderText }>
            Restaurante Con Fusion
          </Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);


class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchLeaders();
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


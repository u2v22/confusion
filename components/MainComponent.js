import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Menu from './MenuComponents';
import DishDetail from './DishDetailComponent';

import { DISHES } from '../shared/dishes';

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu },
        DishDetail: { screen: DishDetail }
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
        <MenuNavigator />
      </View>
    )
  }
}

export default Main;


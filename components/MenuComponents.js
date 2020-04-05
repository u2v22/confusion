import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Constants from 'expo-constants';

import { DISHES } from '../shared/dishes';

const MenuStack = createStackNavigator();

export const MenuScreen = () => {
  <MenuStack.Navigator initialRouteName="Menu">
    <MenuStack.Screen name="Menu"
                      component={Menu}
                      options={{ title: 'Menu' }} />
    <MenuStack.Screen name="DishDetail"
                      component={DishDetail}
                      options={{ title: 'DishDetail' }} />
  </MenuStack.Navigator>
}

class Menu extends Component{
  constructor(props){
    super(props)

    this.state = {
      dishes: DISHES
    }
  }

  render(){

    const { navigation } = this.props;

    const renderMenuItem = ({item, index}) => {
      return(
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          onPress={() => navigation.navigate('DishDetail', { dishId: item.id })}
          leftAvatar={{ source: require('../assets/images/buffet.png') }}
          />
      );
    }

    return(
      <FlatList
        data={this.state.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
        />
    );
  }
}

export default Menu;

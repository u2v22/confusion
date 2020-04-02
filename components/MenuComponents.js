import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Constants from 'expo-constants';

import { DISHES } from '../shared/dishes';

class Menu extends Component{
  constructor(props){
    super(props)

    this.state = {
      dishes: DISHES
    }
  }

  static navigationOptions = {
      title: 'Menu'
  };

  render(){

    const { navigate } = this.props.navigation;

    const renderMenuItem = ({item, index}) => {
      return(
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          onPress={() => navigate('DishDetail', { dishId: item.id })}
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

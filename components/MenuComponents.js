import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
  return {
    dishes: state.dishes
  }
}

export const DishDetailScreen = () => {
  <MenuStack.Navigator>
    <MenuStack.Screen name="DishDetail"
                      component={DishDetail}
                      options={{ title: 'Dish Detail' }} />
  </MenuStack.Navigator>
}

class Menu extends Component{
  render(){
    const { navigation } = this.props;

    const renderMenuItem = ({item, index}) => {
      return(
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          hideChevron={true}
          onPress={() => navigation.navigate('DishDetail', { dishId: item.id }
          )}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
          />
      );
    }

    return(
      <FlatList
        data={this.props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
        />
    );
  }
}

export default connect(mapStateToProps)(Menu);

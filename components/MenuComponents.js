import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Constants from 'expo-constants';
import { Loading } from './LoadingComponent';

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
  constructor(props){
    super(props)
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
          onPress={() => navigation.navigate('DishDetail', { dishId: item.id }
          )}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
          />
      );
    }

    if(this.props.dishes.isLoading){
      return(
        <Loading />
      )
    }
    else if(this.props.dishes.errMsg){
      return(
        <View><Text>{this.props.dishes.errMsg}</Text></View>
      )
    }
    else{
      return(
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
          />
      );
    }
  }
}

export default connect(mapStateToProps)(Menu);

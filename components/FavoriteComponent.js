import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Constants from 'expo-constants';
import { Loading } from './LoadingComponent';
import { deleteFavorite } from '../redux/ActionCreators';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Favorites extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const { route, navigate } = this.props;

    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: 'Remove',
          type: 'delete',
          onPress: () => {
            Alert.alert(
              'Remove Favorite',
              'Are you sure you want to delete' + item.name + '?',
              [
                {
                  text: 'cancel',
                  onPress: () => console.log('not deleted'),
                  style: ' cancel'
                },
                {
                  text: 'OK',
                  onPress: () => this.props.deleteFavorite(item.id)
                }
              ],
              { cancelable: false }
            );
          }
        }
      ]
      return(
        <Swipeout right={rightButton} autoClose={true}>
          <ListItem key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('DishDetail', { dishId: item.id})}
                    leftAvatar={{ source: { uri: baseUrl + item.image }}}/>
        </Swipeout>
      )
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
        <FlatList data={this.props.dishes.dishes.filter((dish) => this.props.favorites.some(el => el === dish.id))}
                  renderItem={renderMenuItem}
                  keyExtractor={item => item.id.toString()} />
      )
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

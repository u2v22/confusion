import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

function RenderDish(props){
  const dish = props.dish;
  const style = {
    margin: 10,
    height: 300
  }

  if(dish != null){
    return(
      <Card
        title={props.name}
        image={require('../assets/images/uthappizza.png')}
        >
        <Text style={style}>
          {props.description}
        </Text>
        <Icon raised
              reverse
              name={ props.favorite ? 'heart' : 'heart-o' }
              type='font-awesome'
              color='#f50'
              onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
              />
      </Card>
    );
  } else {
    return(
      <View>
        <Text>
          Potato
        </Text>
      </View>
    );
  }
}

function RenderComments(props){

  const comments = props.comments;

  const renderCommentItem = ({ item, index}) =>{
    return(
      <View key={index} style={{ margin: 10}}>
        <Text style={{ fontSize: 14}}>
          {item.comment}
        </Text>
        <Text style={{ fontSize: 12}}>
          {item.rating} Stars
        </Text>
        <Text style={{ fontSize: 12}}>
          {`-${item.author}, ${item.date}`}
        </Text>
      </View>
    )
  }
  return(
    <Card title='Comments'>
      <FlatList data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}


class DishDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      favorites: []
    }
  }

  markFavorite(dishId){
    this.setState({ favorites: this.state.favorites.concat(dishId) })
  }

  render(){
    const { route, navigation } = this.props;
    const dishId = route.params.dishId;

    return(
        <ScrollView>
          <RenderDish dish={this.state.dishes[+dishId]}
                      favorite = {this.state.favorites.some(element => element === dishId)}
                      onPress={() => this.markFavorite(dishId)}
          />
          <RenderComments comments={this.state.comments.filter(comment => dishId === comment.dishId )} />
        </ScrollView>
    )
  }
}

export default DishDetail;

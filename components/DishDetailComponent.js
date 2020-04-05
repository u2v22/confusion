import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { ScreenContainer } from 'react-native-screens';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments
  }
}

function RenderDish(props){
  const dish = props.dish;
  const style = {
    margin: 10
  }

  if(dish != null){
    return(
      <Card
        title={dish.name}
        image={{ uri: baseUrl + dish.image}}
        >
        <Text style={style}>
          {dish.description}
        </Text>
        <Icon raised
              reverse
              name={ dish.favorite ? 'heart' : 'heart-o' }
              type='font-awesome'
              color='#f50'
              onPress={() => dish.favorite ? console.log('Already favorite') : dish.onPress()}
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

  const renderCommentItem = ({ item, index }) =>{
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
      favorites: []
    }
  }

  markFavorite(dishId){
    this.setState({ favorites: this.state.favorites.concat(dishId) })
  }

  render(){
    const { route, navigation } = this.props;
    const dishId = route.params['dishId'];

    return(
        <ScreenContainer>
          <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
                        favorite={this.state.favorites.some(element => element === dishId)}
                        onPress={() => this.markFavorite(dishId)}
            />
            <RenderComments comments={this.props.comments.comments.filter(comment => dishId === comment.dishId )} />
          </ScrollView>
        </ScreenContainer>
    )
  }
}

export default connect(mapStateToProps)(DishDetail);

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

import { DISHES } from '../shared/dishes';

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

class DishDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES
    }
  }

  static navigationOptions = {
    title: 'Dish Details'
  };

  render(){

    const dishId = this.props.navigation.getParam('dishId','');

    return(
        <RenderDish dish={this.state.dishes[+dishId]} />
    )
  }
}

export default DishDetail;

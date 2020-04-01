import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderDish(props){
  const dish = props.dish;
  const style = {
    margin: 10
  }

  if(dish != null){
    return(
      <Card
        featuredTitle={props.name}
        image={require('../assets/images/uthappizza.png')}
        >
        <Text style={style}>
          {props.description}
        </Text>
      </Card>
    );
  } else {
    return(
      <View><Text>Potato</Text></View>
    );
  }
}

function DishDetail(props){
  return(
    <RenderDish dish={props.dish} />
  )
}

export default DishDetail;

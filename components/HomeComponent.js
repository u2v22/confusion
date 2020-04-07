import React, { Component } from 'react';
import { Text, ScrollView, View, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';

import AboutUs from './AboutUs';
import { ContactUs } from './ContactUs';
import { Loading } from './LoadingComponent';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

function RenderItem(props){
  const item = props.item;

  if(props.isLoading){
    return(
      <Loading />
    )
  }
  else if(props.errMsg){
    return(
      <View><Text>{props.errMsg}</Text></View>
    )
  }
  else{
    if(item != null){
      return(
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.discription}
          image={{ uri: baseUrl + item.image }}
          >
          <Text style={{ margin: 10 }}>
            {item.description}
          </Text>
        </Card>
      )
    } else {
      return(
        <View></View>
      )
    }
  }
}

class Home extends Component {
  constructor(props){
    super(props);

    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount(){
    this.animate();
  }

  animate(){
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 8,
        duration: 8000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }


  render(){
    const xPos1 = this.animatedValue.interpolate({
      inputRange: [0, 1, 3, 5, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    })

    const xPos2 = this.animatedValue.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    })

    const xPos3 = this.animatedValue.interpolate({
      inputRange: [0, 3, 5, 7, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    })

    const style = {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    }

    return(
      <ScrollView>
        <View style={style}>
          <Animated.View style={{ width: '100%', transform: [{ translateX: xPos1 }] }}>
            <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured )[0]}
                        isLoading={this.props.dishes.isLoading}
                        errMsg={this.props.dishes.errMsg} />
          </Animated.View>
          <Animated.View style={{ width: '100%', transform: [{ translateX: xPos2 }] }}>
            <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured )[0]}
                        isLoading={this.props.promotions.isLoading}
                        errMsg={this.props.promotions.errMsg} />
          </Animated.View>
          <Animated.View style={{ width: '100%', transform: [{ translateX: xPos3 }] }}>
            <RenderItem item={this.props.leaders.leaders.filter((lead) => lead.featured )[0]}
                        isLoading={this.props.leaders.isLoading}
                        errMsg={this.props.leaders.errMsg} />
          </Animated.View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);

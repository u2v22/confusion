import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { ScreenContainer } from 'react-native-screens';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

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
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Icon raised
                reverse
                name={ props.favorite ? 'heart' : 'heart-o' }
                type='font-awesome'
                color='#f50'
                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                />
          <Icon raised
                reverse
                name={ 'pencil' }
                type='font-awesome'
                color='#f30'
                onPress={() => props.addComment()}
                />
        </View>
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
      showModal: false
    }
  }

  markFavorite(dishId){
    this.props.postFavorite(dishId);
  }

  toggleModal(){
    this.setState({ showModal: !this.state.showModal });
  }

  addCommentModal(){
    console.log('comment modal');

    this.toggleModal();
  }


  render(){
    const { route, navigation } = this.props;
    const dishId = route.params['dishId'];

    return(
        <ScrollView>
          <RenderDish dish={this.props.dishes.dishes[+dishId]}
                      favorite={this.props.favorites.some(element => element === dishId)}
                      addComment={() => this.addCommentModal()}
                      onPress={() => this.markFavorite(dishId)}
          />
          <RenderComments comments={this.props.comments.comments.filter(comment => dishId === comment.dishId )} />

          <Modal animationType={'slide'}
                 transparent={false}
                 visible={this.state.showModal}
                 onDismiss={() => {this.toggleModal()}}
                 onRequestClose={() => {this.toggleModal()}}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Add your rating</Text>
              <Text style={styles.modalText}>
                Modal for comments and ratings
              </Text>
              <Button title='Close'
                      onPress={() => {this.toggleModal()}}
                      color= '#512DA8'/>
            </View>
          </Modal>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    margin: 10,
    fontSize: 18
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);

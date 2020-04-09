import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button, Alert, PanResponder, Share } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { ScreenContainer } from 'react-native-screens';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId, author, comment, rating, date) => dispatch(postFavorite(dishId, author, comment, rating, date)),
  postComment: (dishId, author, comment, rating, date) => dispatch(postComment(dishId, author, comment, rating, date))
});

function RenderDish(props){
  const dish = props.dish;

  const style = {
    margin: 10
  }

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if(dx < -200) return true;
    else return false;
  }

  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if(dx > 200) return true;
    else return false;
  }

  const panResponder = PanResponder.create({

    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderEnd: (e, gestureState) => {
      if(recognizeDrag(gestureState)){
        Alert.alert(
          'Add to Favorites?',
          'Are you sure you wish to add ' + dish.name + ' to your favorites?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('cancelled'),
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
            }
          ],
          { cancelable: false }
        )
      }
      else if(recognizeComment){
        props.addComment();
      }
      return true;
    },
  })

  const shareDish = (title, message, url) => {
    Share.share({
      title: title,
      message: message + ': ' + url,
      url: url
    },{
      dialogTitle: 'Share ' + title
    })
  }

  if(dish != null){
    return(
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
      {...panResponder.panHandlers}>
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
            <Icon raised
                  reverse
                  name={ 'share' }
                  type='font-awesome'
                  color='#51D2A8'
                  onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                  />
          </View>
        </Card>
      </Animatable.View>
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
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title='Comments'>
        <FlatList data={comments}
                  renderItem={renderCommentItem}
                  keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}


class DishDetail extends Component{

  constructor(props){
    super(props);

    this.state = {
      showModal: false,
      author: '',
      rating: 0,
      date: new Date(),
      comment: ''
    }
  }

  markFavorite(dishId){
    this.props.postFavorite(dishId);
  }

  toggleModal(){
    this.setState({ showModal: !this.state.showModal });
  }

  addComment(dishId){
    console.log(JSON.stringify(this.state));

    this.props.postComment(dishId, this.state.author, this.state.rating, this.state.comment, this.state.date);
    this.toggleModal();
  }

  render(){
    const { route, navigation } = this.props;
    const dishId = route.params['dishId'];

    return(
        <ScrollView>
          <RenderDish dish={this.props.dishes.dishes[+dishId]}
                      favorite={this.props.favorites.some(element => element === dishId)}
                      addComment={() => this.addComment(dishId)}
                      onPress={() => this.markFavorite(dishId)}
          />
          <RenderComments comments={this.props.comments.comments.filter(comment => dishId === comment.dishId )} />

          <Modal animationType={'slide'}
                 style={{ width: '100%'}}
                 transparent={false}
                 visible={this.state.showModal}
                 onDismiss={() => {this.toggleModal()}}
                 onRequestClose={() => {this.toggleModal()}}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Add your rating</Text>
              <Rating showRating
                      name='rating'
                      onFinishRating={(value) => this.setState({ rating: value})}
                      startingValue="{0}" />
              <Input placeholder='Author'
                     name='author'
                     onChangeText={(value) => this.setState({ author: value})}
                     leftIcon={{
                        type: 'font-awesome',
                        name: 'user-o',
                        iconStyle: {
                          marginRight: 10
                        }}} />
              <Input placeholder='Comments'
                     name='comment'
                     onChangeText={(value) => this.setState({ comment: value})}
                     leftIcon={{
                        type: 'font-awesome',
                        name: 'comment-o',
                        iconStyle: {
                          marginRight: 10
                        }}} />
              <Button title='Submit'
                      onPress={() => {this.addComment(dishId)}}
                      color= '#512DA8' />
              <Button title='Close'
                      onPress={() => {this.toggleModal()}}
                      color= 'grey'/>
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

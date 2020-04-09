import React, { Component } from 'react';
import { Text, View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';


class LoginTab extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false
    }
  }
  componentDidMount(){
    SecureStore.getItemAsync('userinfo')
      .then(userdata => {
        let userinfo = JSON.parse(userdata);
        if(userdata){
          this.setState({ username: userinfo.username });
          this.setState({ password: userinfo.password });
          this.setState({ remember: true });
        }
      });
  }

  handleLogin(){
    console.log(JSON.stringify(this.state));
    if(this.state.remember){
      SecureStore.setItemAsync('userinfo', JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }))
      .catch((error) => console.log('Could not save user data!', error))
    }
    else {
      SecureStore.deleteItemAsync('userinfo')
      .catch((error) => console.log('could not delete user info'))
    }
  }

  handleRemember(){
    this.setState({ remember: !this.state.remember });
  }

  render(){
    return(
      <View style={styles.container}>
        <Input placeholder='Username'
               leftIcon={{
                 type: 'font-awesome',
                 name: 'user-o',
                 iconStyle: {
                   marginRight: 10
                 }
               }}
               onChangeText={(username) => this.setState({ username })}
               value={this.state.username}
               containerStyle={styles.formInput} />
        <Input placeholder='Password'
               leftIcon={{
                 type: 'font-awesome',
                 name: 'key',
                 iconStyle: {
                   marginRight: 10
                 }
               }}
               onChangeText={(password) => this.setState({ password })}
               value={this.state.password}
               containerStyle={styles.formInput} />
        <CheckBox title='Remember me'
                  center
                  checked={this.state.remember}
                  onPress={() => this.handleRemember()}
                  containerStyle={styles.formCheckbox} />
        <View style={styles.formButton}>
          <Button onPress={this.handleLogin()}
                    title='  Login'
                    icon={<Icon
                      name='sign-in'
                      type='font-awesome'
                      color='white'/>}
                    buttonStyle={{ backgroundColor:'#512DA8'}}/>
        </View>
      </View>
    )
  }
}

class RegisterTab extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      remember: false,
      imageUrl: baseUrl + 'images/logo.png'
    }
  }

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(cameraPermission.status === 'granted' && cameraRollPermission === 'granted'){
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4,3]
      });
      if(!capturedImage.cancelled){
        this.setState({ imageUrl: capturedImage.uri })
      }
    }
  }

  handleRegistration(){
    console.log(JSON.stringify(this.state));

    if(this.state.remember){
      SecureStore.setItemAsync('userinfo', JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email
      }))
      .catch((error) => console.log('Could not save user data!', error))
    }
  }

  render(){
    return(
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: this.state.imageUrl }}
                   loadingIndicatorSource={require('../assets/images/logo.png')}
                   style={styles.image} />
            <Button title='Camera'
                    onPress={() => this.getImageFromCamera }/>
          </View>
          <Input placeholder='Username'
                 leftIcon={{
                   type: 'font-awesome',
                   name: 'user-o',
                   iconStyle: {
                     marginRight: 10
                   }
                 }}
                 onChangeText={(username) => this.setState({ username })}
                 value={this.state.username}
                 containerStyle={styles.formInput} />
          <Input placeholder='First Name'
                 leftIcon={{
                   type: 'font-awesome',
                   name: 'user-o',
                   iconStyle: {
                     marginRight: 10
                   }
                 }}
                 onChangeText={(firstname) => this.setState({ firstname })}
                 value={this.state.firstname}
                 containerStyle={styles.formInput} />
          <Input placeholder='Last Name'
                 leftIcon={{
                   type: 'font-awesome',
                   name: 'user-o',
                   iconStyle: {
                     marginRight: 10
                   }
                 }}
                 onChangeText={(lastname) => this.setState({ lastname })}
                 value={this.state.lastname}
                 containerStyle={styles.formInput} />
          <Input placeholder='Email'
                 leftIcon={{
                   type: 'font-awesome',
                   name: 'envelope-o',
                   iconStyle: {
                     marginRight: 10
                   }
                 }}
                 onChangeText={(email) => this.setState({ email })}
                 value={this.state.email}
                 containerStyle={styles.formInput} />
          <Input placeholder='Password'
                 leftIcon={{
                   type: 'font-awesome',
                   name: 'key',
                   iconStyle: {
                     marginRight: 10
                   }
                 }}
                 onChangeText={(password) => this.setState({ password })}
                 value={this.state.password}
                 containerStyle={styles.formInput} />
          <CheckBox title='Remember me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.handleRemember()}
                    containerStyle={styles.formCheckbox} />
          <View style={styles.formButton}>
            <Button onPress={this.handleRegistration()}
                    title='  Register'
                    icon={<Icon
                      name='user-plus'
                      type='font-awesome'
                      color='white'/>}
                    buttonStyle={{ backgroundColor:'#512DA8'}}/>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  image: {
    margin: 10,
    width: 80,
    height: 60
  },
  formInput: {
    margin: 20
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null
  },
  formButton: {
    margin: 60
  }
});

export default Login;

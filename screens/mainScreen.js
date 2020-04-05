import { createDrawerNavigator } from 'react-navigation';

export const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu },
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);


export const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon name='home' type='font-awesome' size={24} color={ tintColor } />
      )
    }
  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
      drawerIcon: ({ tintColor }) => (
        <Icon name='address-card' type='font-awesome' size={24} color={ tintColor } />
      )
    }
  },
  AboutUs: {
    screen: AboutUs,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => (
        <Icon name='info-circle' type='font-awesome' size={24} color={ tintColor } />
      )
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor }) => (
        <Icon name='list' type='font-awesome' size={24} color={ tintColor } />
      )
    }
  }
}, {
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});

export const AboutUsNavigator = createStackNavigator({
  AboutUs: { screen: AboutUs },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: <Icon name='Menu'
                        size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                  />
    })
  }
);

export const ContactUsNavigator = createStackNavigator({
  ContactUs: { screen: ContactUs },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff"
      },
      headerLeft: <Icon name='Menu'
                        size={24}
                        color='white'
                        onPress={() => navigation.toggleDrawer()}
                  />
    })
  }
);

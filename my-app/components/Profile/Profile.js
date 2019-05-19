import React from 'react';
import { ScrollView, Text, View, StyleSheet, Button, AsyncStorage, ImageBackground} from 'react-native';
import TopNavigation from './ProfileNavbar';
import { createAppContainer, NavigationActions } from 'react-navigation';

const TopNavbar = createAppContainer(TopNavigation);

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        token: '',
        images: []
    };
  }
  componentDidMount(){
    this._checkToken();
  }

  _checkToken(){
    AsyncStorage.multiGet(["accessToken", "username"])
      .then(result => {
          //console.log(result[0][1]);
          //console.log(result[1][1]);
          if(result === null)
          {
            this.props.navigation.goBack();
          }
          else
          {
              this.setState({
                  name: result[1][1],
                  token: result[0][1]
              })
          }
      })
      .catch(err => {
          console.log(err)
      })
  }

  render() {
    //console.log(this.state.images);
    return (
      <TopNavbar/>
    )
  }
}

const styles = StyleSheet.create({
  position: {
    position: "absolute"
  },
  welcomeImage: {
    width: 400,
    height: 100,
    resizeMode: 'contain',
    marginLeft: -10,
  },
  imageRow: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
      width: 100,
      height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 30,
    textAlign: 'center',
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 30,
    marginLeft: 60,
    backgroundColor: '#ecf0f1'
  },
});


import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet, Button, AsyncStorage, TextInput, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class MySpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      token: ''
    };
  }
  componentDidMount(){
    AsyncStorage.multiGet(["accessToken", "username"])
      .then(result => {
          //console.log(result[0][1]);
          //console.log(result[1][1]);
          if(result === null)
          {
            //this.props.navigation.navigate('Home');
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

  removeToken(){
      let keys = ['username', 'accessToken', 'accountId', 'refreshToken'];
      AsyncStorage.multiRemove(keys, (err) => {
          console.log('successful remove');
          this.props.navigation.navigate('Home');
      });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={this.removeToken}
          >

          <Text style={styles.saveButtonText}>Logout</Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={this.deleteAccount}
          >

          <Text style={styles.saveButtonText}>Delete Account</Text>

        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 30,
    textAlign: 'center',
  },
  saveButton: {
    width: 250,
    marginLeft: 60,
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5,
    position: "relative",
    borderRadius:10
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
});


import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet, Button, Alert, Linking, WebView, AsyncStorage } from 'react-native';
//import StarLogo from './assets/images/death-star.png'

export default class Home extends React.Component {
      state = {
        user: ''
    }
    componentDidMount(){
      this.checkToken();
    }
    checkToken(){
        AsyncStorage.getItem("accessToken")
        .then(result => {
            //console.log(result)
            if(result)
            {
              this.setState({
                user: true
              })
              this.props.navigation.navigate('Space');
              
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
        });
    }

  render() {
    return (
      <View style={styles.container}>
        <Button
                title="Logout"
                onPress={()=>this.removeToken()}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
          <Image style={styles.welcomeImage}
            source={require('../assets/images/death-star.png')}
          />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Welcome to Epicture</Text>

            <Text style={styles.test}>
              Connect to Imgur, browse, upload and share your favorite picture !
            </Text>
              <Button
                title="Connect to Imgur"
                onPress={() => this.props.navigation.navigate('Login')}
              />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  test: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 30,
    marginBottom: 50,
  },
  webview: {
    width: '100%',
    height: 300,
    flex: 1
  }
});


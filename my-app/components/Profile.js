import React from 'react';
import { ScrollView, Text, View, StyleSheet, Button, AsyncStorage, TextInput, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        token: '',
        images: []
    };
  }

  _checkToken(){
    AsyncStorage.multiGet(["accessToken", "username"])
      .then(result => {
          console.log(result[0][1]);
          console.log(result[1][1]);
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

  _ImageAccount(){
    fetch('https://api.imgur.com/3/account/' + this.state.name + '/images', {
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + this.state.token,
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        //console.log(responseJson.data[0]);
        this.setState({
            images: responseJson.data[0],
        })
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        alert(JSON.stringify(error));
        console.error(error);
    });
  }

  render() {
    this._checkToken();
    this._ImageAccount();
    return (
      <View style={styles.container}>
        <Button
            title="Logout"
            onPress={()=>this.removeToken()}
        />
        <Text style={styles.getStartedText}>Hello {this.state.name}</Text>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <FlatList
            data= {this.state.images}
            keyExtractor= {(item) => item.id.toString()}
            renderItem={({item}) => 
                <Image
                    source={{ uri: item.link }}
                    style={styles.image}
                    //PlaceholderContent={<ActivityIndicator />}
                />
        }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 30,
    marginLeft: 60,
    backgroundColor: '#ecf0f1'
  },
  saveButton: {
    width: 250,
    marginLeft: 60,
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
});


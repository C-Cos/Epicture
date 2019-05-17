import React from 'react';
import { ScrollView, Text, View, StyleSheet, Button, AsyncStorage, TextInput, TouchableOpacity} from 'react-native';
import { ImagePicker, Permissions } from 'expo';

export default class MySpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      result: [],
      isLoading: false,
      image: null,
    };
  }

  _checkToken(){
    //console.log('inside checktoken');
    AsyncStorage.getItem("accessToken")
      .then(result => {
          //console.log(result)
          if(result === null)
          {
            this.props.navigation.pop(1);
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

  Search(){
    //alert(this.state.search);
    fetch('https://api.imgur.com/3/gallery/search?q=' + this.state.search, {
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Client-ID 54a2deb5d91420d",
      },
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
      //console.log('ok');
      this.setState({
        result: responseJson.data,
        isLoading: false
      })
      
      //console.log(this.state.result);
      this.props.navigation.navigate('SearchR', {
        result: this.state.result,
        loading: this.state.isLoading
        });
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        alert(JSON.stringify(error));
        console.error(error);
    });
  }

  _pickFromGallery = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    if(status === 'granted') {
      let image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: 'Images',
        aspect: [4, 3],
      }).catch(error => console.log(permissions, { error }));
      console.log(permissions, 'SUCCESS', image);
      this.props.navigation.navigate('Upload', {
        result: image
        });
    }
  };

  _pickFromCamera = async () => {
    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);

    console.log(permissions, status);
    if(status === 'granted') {
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(permissions, { error }));
      console.log(permissions, 'SUCCESS', image);
    }
  }

  render() {
    //this._checkToken();
    //console.log('render: ', (this.state.result.length > 0) ? this.state.result[0] : 'nothing');
    return (
      <View style={styles.container}>
        <Button
            title="Logout"
            onPress={()=>this.removeToken()}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>You are now on your personal space !</Text>
          </View>

            <TextInput
              onChangeText={(search) => this.setState({ search })}
              placeholder={'Type here ...'}
              style={styles.input}
              value={this.state.search}
              autoFocus = {true}
              clearTextOnFocus = {true}
            />  
            <View>
              <TouchableOpacity
                  style={styles.saveButton}
                  onPress={()=>this.Search()}
                  value={this.state.search}
                  >

                  <Text style={styles.saveButtonText}>Search</Text>

              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this._pickFromGallery}
                  value={this.state.search}
                  >

                  <Text style={styles.saveButtonText}>Upload picture</Text>

              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this._pickFromCamera}
                  value={this.state.search}
                  >

                  <Text style={styles.saveButtonText}>Take a picture</Text>

              </TouchableOpacity>
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


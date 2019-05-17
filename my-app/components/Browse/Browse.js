import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet, Button, AsyncStorage, TextInput, TouchableOpacity} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Icon} from 'react-native-elements'



export default class MySpace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      result: [],
      viral: [],
      name: '',
      token: ''
    };
  }
  componentDidMount(){
    this._checkToken();
    this._mostViral();
  }

  _checkToken(){
    AsyncStorage.multiGet(["accessToken", "username"])
      .then(result => {
          console.log(result[0][1]);
          console.log(result[1][1]);
          if(result === null)
          {
            this.props.navigation.navigate('Home');
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
        base64: true
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
        allowsEditing: true,
        mediaTypes: 'Images',
        aspect: [4, 3],
        base64: true
      }).catch(error => console.log(permissions, { error }));
      console.log(permissions, 'SUCCESS', image);
      this.props.navigation.navigate('Upload', {
        result: image
        });
    }
  }

  _mostViral(){
    fetch('https://api.imgur.com/3/gallery/top/top', {
      "method": "GET",
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
      //console.log(responseJson);
      this.setState({
        viral: responseJson.data,
      })
      
    })
    //If response is not in json then in error
    .catch((error) => {
        //Error 
        alert(JSON.stringify(error));
        console.error(error);
    });
  }

  _renderItem(item){
    //console.log(item);
    if(typeof item.images === 'object'){
        //console.log('inside');
        return (
            <Card
                title={item.title}>
                <View>
                    <Image
                        source={{ uri: item.images[0].link }}
                        style={styles.image}
                        //PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <Text style={{marginBottom: 10}}>
                    {item.images[0].description}
                </Text>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    backgroundColor='#03A9F4'
                    onPress={() => this._AddToFavorite(item.images[0].id)}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Add to favorite' />
            </Card>
        )
    }
    
}

  render() {
    return (
      <KeyboardAwareScrollView
            style={{ backgroundColor: '#fff' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}>
        <Button
            title="Logout"
            onPress={()=>this.removeToken()}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Hello {this.state.name}</Text>
            <Text style={styles.getStartedText}>Browse from Imgur or Upload your favorite image !</Text>
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
                  style={styles.searchButton}
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
            <View>
              <Text style={styles.getStartedText}>Most Viral</Text>
              <FlatList
                data= {this.state.viral}
                keyExtractor= {(item) => item.id.toString()}
                renderItem={({item}) => this._renderItem(item)}
              />
            </View>
        </ScrollView>
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
  searchButton: {
    width: 250,
    marginLeft: 60,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#2DC3CA',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
});


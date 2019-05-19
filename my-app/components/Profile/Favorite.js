import React from 'react';
import { ScrollView, Text, View, StyleSheet, Button, AsyncStorage, TextInput, TouchableOpacity, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
        };
      }

    componentDidMount(){
      AsyncStorage.multiGet(["accessToken", "username"])
      .then(result => {
          //console.log(result[0][1]);
          //console.log(result[1][1]);
          if(result === null)
          {
            this.props.navigation.navigate('Home');
          }
          else
          {
            fetch('https://api.imgur.com/3/account/NicoleZessec2/favorites', {
            "method": "GET",
            "headers": {
              "Authorization": "Bearer " + result[0][1] /* 009c835452d021690f1bc8c8484cd6ab339cf8c6" */
              },
            })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //console.log(responseJson);
                this.setState({
                    images: responseJson.data,
                })
            })
            //If response is not in json then in error
            .catch((error) => {
                //Error 
                //alert(JSON.stringify(error));
                console.error("error:" + error);
            });
          }
      })
      .catch(err => {
          console.log(err)
      })
    }

    _renderItem(item){
        //console.log("item in render: ", item);
        return (
          <View style={styles.imageRow}>
            <Image
                source={{ uri: item.link }}
                style={styles.image}
                //PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        )
      }

    render() {
        //console.log(this.state.images);
        return (
            <View style={styles.container} contentContainerStyle={styles.contentContainer}>
                <FlatList
                data= {this.state.images}
                numColumns={3}
                keyExtractor= {(item) => item.id.toString()}
                renderItem={({item}) => this._renderItem(item)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageRow: {
      flex: 1, 
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    image: {
        width: 120,
        height: 120,
        position: 'relative',
        borderRadius:10,
        display: 'flex'
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
      color: 'rgba(96,100,109, 1)',
      lineHeight: 30,
      textAlign: 'center',
    },
  });
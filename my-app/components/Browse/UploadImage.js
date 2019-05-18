import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TextInput, AsyncStorage, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {decode, encode} from 'base-64';
//import imgur from "imgur";


export default class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          desc: '',
          token: '', 
        };
      }

      componentDidMount(){
        AsyncStorage.getItem("accessToken")
        .then(result => {
            console.log(result)
            if(result === null)
            {
              this.setState({ token: result});  
              this.props.navigation.goBack();
            }
        })
        .catch(err => {
            console.log(err)
        })

      }

      Upload(image, token){
        const formData = new FormData();
        formData.append('image', image);
        formData.append("title", this.state.title);
        formData.append("description", this.state.desc);
        //POST request 
        fetch('https://api.imgur.com/3/image', {
            "method": "POST",
            "timeout": 0,
            "body": formData,
            "headers": {
                "Authorization": "Bearer "+token /* 71ca6576db1cd20c655591cb3628b52a653f823b" */,
                "Accept": 'application/json'
            },
            
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
            //console.log(responseJson);
            alert("Your Image has been Uploaded ! Check your posts in Profile.")
            this.props.navigation.goBack();

        })
        //If response is not in json then in error
        .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
        });
    }


    render() {
        const { navigation } = this.props;
        const image = navigation.getParam('result', 'No Result');
        const token = navigation.getParam('token', 'token');
        return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: '#fff' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Image
                    source={{ uri: image.uri }}
                    style={styles.image}
                    //PlaceholderContent={<ActivityIndicator />}
                />
            
                <TextInput
                    onChangeText={(title) => this.setState({ title })}
                    placeholder={'Enter a title ...'}
                    style={styles.Titleinput}
                    value={this.state.title}
                    autoFocus = {true}
                    clearTextOnFocus = {true}
                /> 
                <TextInput
                    onChangeText={(desc) => this.setState({ desc })}
                    placeholder={'Enter a description ...'}
                    multiline = {true}
                    numberOfLines = {10}
                    style={styles.Descinput}
                    value={this.state.desc}
                    autoFocus = {true}
                    clearTextOnFocus = {true}
                /> 
                <View style={styles.ButtonSection}>
                    <TouchableOpacity
                        style={styles.favorite}
                        onPress={()=>this._AddToFavorite()}
                        >

                        <Text style={styles.searchButtonText}>Add to Favorite</Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>
 
        </KeyboardAwareScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    image: {
        width: 300,
        height: 300,
        marginLeft: 40,
        marginTop: 30,
        borderRadius:10
    },
    favorite: {
        width: 150,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#007BFF',
        backgroundColor: '#fff',
        padding: 10,
        margin: 5,
        borderRadius: 10
      },
    searchButtonText: {
        color: '#007BFF',
        fontSize: 15,
        textAlign: 'center'
      },
    ButtonSection: {
        justifyContent: 'center',
        alignItems: 'center'
     },
    Titleinput: {
        width: 250,
        height: 44,
        padding: 10,
        marginTop: 10,
        marginLeft: 60,
        backgroundColor: '#ecf0f1',
        borderRadius:10
      },
    Descinput: {
        width: 300,
        height: 200,
        padding: 10,
        marginTop: 10,
        marginLeft: 40,
        backgroundColor: '#ecf0f1',
        borderRadius:10
      },
})

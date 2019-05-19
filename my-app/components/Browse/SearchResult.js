import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Card, Icon} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this._AddToFavorite = this._AddToFavorite.bind(this);
      }
    
    _AddToFavorite(id, token){
        //POST request 
        fetch('https://api.imgur.com/3/image/' + id + '/favorite', {
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + token /* 71ca6576db1cd20c655591cb3628b52a653f823b" */,
                "Accept": 'application/json'
            },
            
        })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
            console.log(responseJson);
            alert("Added to your favorite !")
            //this.props.navigation.goBack();

        })
        //If response is not in json then in error
        .catch((error) => {
            alert("Oops, Something went wrong.");
            console.error(error);
        });
    }
    _renderItem(item, token){
        //console.log(token);
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
                    <View style={styles.ButtonSection}>
                    <TouchableOpacity
                        style={styles.favorite}
                        onPress={()=>this._AddToFavorite()}
                        >

                        <Text style={styles.searchButtonText}>Add to Favorite</Text>

                    </TouchableOpacity>
                    </View>
                </Card>
            )
        }
        
    }

    render() {
        const { navigation } = this.props;
        const result = navigation.getParam('result', 'No Result');
        const token = navigation.getParam('token', "token");
        //console.log('render: ', result.length > 0 ? result[0] : 'Nothing');
        //console.log('SearchResult : ', (this.props.result) ? 'fill' : 'nothing');
        return (
        <View>
          <FlatList
            data= {result}
            keyExtractor= {(item) => item.id.toString()}
            renderItem={({item}) => this._renderItem(item, token)}
          />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
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
})
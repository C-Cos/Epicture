import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Card, Icon} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this._AddToFavorite = this._AddToFavorite.bind(this);
      }
    
    _AddToFavorite(id){
        //POST request 
        fetch('https://api.imgur.com/3/image/' + id + '/favorite', {
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer 71ca6576db1cd20c655591cb3628b52a653f823b",
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
        //alert(JSON.stringify(error));
        console.error(error);
        });
    }




    _renderItem(item){
        console.log(item);
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
        const { navigation } = this.props;
        const result = navigation.getParam('result', 'No Result');
        //const loading = navigation.getParam('loading', "loading");
        //console.log('render: ', result.length > 0 ? result[0] : 'Nothing');
        //console.log('SearchResult : ', (this.props.result) ? 'fill' : 'nothing');
        return (
        <View>
          <FlatList
            data= {result}
            keyExtractor= {(item) => item.id.toString()}
            renderItem={({item}) => this._renderItem(item)}
          />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    image: {
        width: 300,
        height: 300,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
})
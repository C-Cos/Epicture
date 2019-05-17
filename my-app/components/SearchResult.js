import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Card, Icon} from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';

export default class SearchResult extends React.Component {

    _renderItem(item){
        console.log('voila', item, item.images);
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
                        onPress={()=> alert("bouton")}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='VIEW' />
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
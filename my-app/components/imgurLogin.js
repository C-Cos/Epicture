import React from 'react';
import { WebView, AsyncStorage, View, TextInput, Text } from 'react-native';

export default class imgurLogin extends React.Component {

    onNavigationStateChange = navState => {
        //console.log(JSON.stringify(navState.url));
        if (navState.url === 'https://api.imgur.com/oauth2/authorize?client_id=54a2deb5d91420d&response_type=token')
        {
            mynew = 'https://www.getpostman.com/oauth2/callback#access_token=aa5d2f7d1ae64d5bf864e54107bdafe0a9fcf243&expires_in=315360000&token_type=bearer&refresh_token=87ced1a59c27d2e281e6eca94b35866fca5dcb34&account_username=NicoleZessec2&account_id=107686465';
            const access =  mynew.split('#')[1];
            //console.log(access);
            const newacess = access.split('=');
            //console.log(newacess);
            result = [];

            //// TOKEN
            const token = newacess[1].split('&');
            //console.log(token[0]);
            result.push(token[0]);
            ///// REFRESH TOKEN
            const refresh_token = newacess[4].split('&');
            //console.log(refresh_token[0]);
            result.push(refresh_token[0]);
            /////ACCOUNT NAME
            const account_name = newacess[5].split('&');
            //console.log(account_name[0]);
            result.push(account_name[0]);
            ////ACCOUNT ID
            const account_id = newacess[6];
            //console.log(account_id);
            result.push(account_id);
            console.log(result);

            AsyncStorage.multiSet([['username', account_name[0]],['accessToken', token[0]],['accountId', account_id],['refreshToken', refresh_token[0]]]);
            //AsyncStorage.getItem("username", (err, res) =>  {console.log(res)});
            //AsyncStorage.getItem("accessToken").then(result => {console.log(result)}).catch(err => {console.log(err)})
            this.props.navigation.navigate('Home');
        }
      };

render() {
    return (
        <WebView
            source={{
                uri: 'https://api.imgur.com/oauth2/authorize?client_id=54a2deb5d91420d&response_type=token',
            }}
            //ref = {(ref) => { this.webview = ref; }}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            thirdPartyCookiesEnabled = {false}
            startInLoadingState
            scalesPageToFit
            javaScriptEnabled
        />
    )   

    }
}
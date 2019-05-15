import React from 'react';
import { Image, ScrollView, Text, View, StyleSheet, Button, Alert, Linking, WebView } from 'react-native';
//import StarLogo from './assets/images/death-star.png'

export default class MySpace extends React.Component {

  render() {
    return (
      <View style={styles.container}>
      
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>You are now on your personal space !</Text>
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


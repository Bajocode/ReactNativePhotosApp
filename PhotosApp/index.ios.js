import React, { Component } from 'react';
import { AppRegistry, StyleSheet, NavigatorIOS } from 'react-native';
const SearchScreen = require('./SearchScreen');

class PhotosApp extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: SearchScreen,
                    title: 'Search Photo'
                }}
                style={styles.root}
            />
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
});

AppRegistry.registerComponent('PhotosApp', () => PhotosApp);

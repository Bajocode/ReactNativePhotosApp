import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator,
    Image
} from 'react-native';

class SearchScreen extends Component {
    render() {
        return (
            <TextInput
                onChangeText={(text) => console.log(text)}
            />
        );
    }
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center'
    }
})

module.exports = SearchScreen;

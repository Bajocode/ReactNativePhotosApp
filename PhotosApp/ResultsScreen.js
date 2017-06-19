import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text
} from 'react-native';


class ResultsScreen extends Component {
    render() {
        return (
            <View style={styles.root}>
                <Text>Hi</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    root: { marginTop: 64 }
});

module.exports = ResultsScreen;

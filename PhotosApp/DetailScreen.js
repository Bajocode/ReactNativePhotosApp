import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native'


class DetailScreen extends Component {
    render() {
        return (
            <Text>{this.props.photo.title}</Text>
        );
    }
}

module.exports = DetailScreen;

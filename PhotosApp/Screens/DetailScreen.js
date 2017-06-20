import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native'
import { executeFetchRequest } from '../DataManager';


class DetailScreen extends Component {
    render() {
        return (
            <Image style={styles.root}
            source={{ uri: this.props.photo.url_h ? this.props.photo.url_h : this.props.photo.url_m }}>

            </Image>
        );
    }
}

const styles = StyleSheet.create({
    root: { flex: 1, width: undefined, height: undefined }
})


module.exports = DetailScreen;

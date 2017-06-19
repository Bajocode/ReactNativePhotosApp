import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image
} from 'react-native';
const ResultsScreen = require('./ResultsScreen');

const apiKey = 'a6d819499131071f158fd740860a5a88';
const baseURLString = 'https://api.flickr.com/services/rest';


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: 'Summer' };
    }
    _handleResponse(json) {
        if (json.stat === 'ok'){
            this.props.navigator.push ({
                title: 'Search Result',
                component: ResultsScreen,
                passProps: {photos: json.photos.photo}
            })
        }
    }
    _executeFetchRequest(url) {
        fetch(url)
            .then(response => response.json())
            .then(json => this._handleResponse(json))
            .catch(error => console.log(error));
    }
    _constructURL(searchText) {
        var params = {
            api_key: apiKey,
            method: 'flickr.photos.search',
            text: searchText,
            extras: 'url_m',
            format: 'json',
            nojsoncallback: '1'
        };
        var queryString = Object.keys(params)
            .map(key => key + '=' + encodeURIComponent(params[key]))
            .join('&');
        return baseURLString + '?' + queryString
    }
    _onPressSearch() {
        var url = this._constructURL(this.state.searchText);
        this._executeFetchRequest(url);
    }
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.searchRow}>
                    <TextInput style={styles.textInput}
                        placeholder='Search by keyword'
                        onChangeText={(searchText) => this.setState({searchText})}
                    />
                    <Button
                        title="Go"
                        onPress={this._onPressSearch.bind(this)}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    root: { marginTop: 64, alignItems: 'center' },
    searchRow: { flexDirection: 'row' },
    textInput: { height: 44, flex: 4 },
    searchButton: { flex: 1 }
})


module.exports = SearchScreen;

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
import { executeFetchRequest, urlForSearchtext } from './DataManager';
const ResultsScreen = require('./ResultsScreen');


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { searchText: 'Summer' };
    }
    _onPressSearch() {
        const url = urlForSearchtext(this.state.searchText);
        executeFetchRequest(url, (photos) => {
            this.props.navigator.push ({
                title: this.state.searchText + ' Photos',
                component: ResultsScreen,
                passProps: {photos: photos}
            });
        });
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

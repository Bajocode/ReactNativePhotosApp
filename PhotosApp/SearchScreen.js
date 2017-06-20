import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image,
    ListView
} from 'react-native';
import { executeFetchRequest, urlForSearchtext, urlForInteresting } from './DataManager';
const ResultsScreen = require('./ResultsScreen');


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource(
            {rowHasChanged: (r1,r2) => r1.id !== r2.id }
        );
        this.state = {
            searchText: 'Summer',
            isLoading: true,
            dataSource: dataSource.cloneWithRows([])
        };
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

    // Lifecycle
    componentDidMount() {
        const url = urlForInteresting();
        executeFetchRequest(url, (photos) => {
            let dataSource = new ListView.DataSource(
                {rowHasChanged: (r1,r2) => r1.id !== r2.id }
            );
            this.setState({
                isLoading: false,
                dataSource: dataSource.cloneWithRows(photos)
            });
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.rowContainer}>
                <Image style={styles.rowImage}
                    source={{ uri: rowData.url_m }}>
                </Image>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.topContainer}>
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
                <View style={styles.bottomContainer}>
                    <View style={styles.listContainer}>
                        <Text style={styles.imagesTitle}>Popular Images</Text>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow.bind(this)}
                            horizontal={true}
                            automaticallyAdjustContentInsets={false}
                        />
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    root: { marginTop: 64, flex: 1 },
        topContainer: { flex: 2, alignItems:'center' },
            searchRow: { flexDirection: 'row' },
                textInput: { height: 44, flex: 4 },
                searchButton: { flex: 1 },
        bottomContainer: { flex: 2, paddingRight: 10 },
            listContainer: { flex: 1 },
                imagesTitle: {
                    fontSize: 20,
                    fontFamily: 'helvetica',
                    fontWeight: 'bold',
                    color: '#4A4A4A',
                    paddingLeft: 10,
                    paddingBottom: 10
                },
                rowContainer: {
                    flex: 5,
                    backgroundColor:'transparent',
                    paddingLeft: 10, paddingTop: 10, paddingBottom: 10
                },
                    rowImage: {
                        flex: 1,
                        height: undefined, width: 320,
                        borderRadius: 10
                    },
})


module.exports = SearchScreen;

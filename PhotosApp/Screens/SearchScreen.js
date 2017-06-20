import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image,
    ListView,
    TouchableHighlight
} from 'react-native';
import { executeFetchRequest, urlForSearchtext, urlForInteresting } from '../DataManager';
const ResultsScreen = require('./ResultsScreen');
const DetailScreen = require('./DetailScreen');

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
    _onPressRow(selectedPhoto) {
        this.props.navigator.push({
            title: photo.title,
            component: DetailScreen,
            passProps: { photo: selectedPhoto }
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
            <TouchableHighlight underlayColor='transparent'
            onPress={() => this._onPressRow(rowData)}>
                <View style={styles.rowContainer}>
                    <Image style={styles.rowImage}
                        source={{ uri: rowData.url_m }}>
                    </Image>
                </View>
            </TouchableHighlight>
        );
    }
    render() {
        return (
            <View style={styles.root}>
                <View style={styles.topContainer}>
                    <Text style={styles.screenTitle}>Search</Text>
                    <TextInput style={styles.textInput}
                        placeholder='"Anything"'
                        onChangeText={(searchText) => this.setState({searchText})}
                    />
                    <TouchableHighlight style={styles.searchButton}
                        onPress={this._onPressSearch.bind(this)}
                        underlayColor='#007AFF'>
                        <Text style={styles.buttonText}>GO</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.listContainer}>
                        <Text style={styles.imagesTitle}>Popular Images</Text>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow.bind(this)}
                            horizontal={true}
                            automaticallyAdjustContentInsets={false}
                            enableEmptySections={true}
                        />
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center' ,
    },
    topContainer: {
        margin: 10,
        borderRadius: 10,
        flex: 2,
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginBottom: 20
    },
    screenTitle: {
        fontSize: 50,
        fontFamily: 'helvetica',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#4A4A4A',
    },
    textInput: {
        fontSize: 30,
        fontFamily: 'helvetica',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#007AFF',
        marginTop: 30,
        height: 64, width: 300
    },
    searchButton: {
        marginTop: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 20,
        height: 64, width: 64
    },
    buttonText: {
        fontSize: 24,
        fontFamily: 'helvetica',
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    bottomContainer: {
        flex: 2,
        paddingRight: 10
    },
    listContainer: {
        flex: 1
    },
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

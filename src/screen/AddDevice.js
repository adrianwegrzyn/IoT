import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SQLite from 'react-native-sqlite-storage'
import { ColorPicker } from 'react-native-color-picker'

var db = SQLite.openDatabase({name: 'databaseDevice.db', createFromLocation: '~www/databaseDevice.db'});

type Props = {};
export default class Connect extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            place: '',
            command: '',
            color: ''
        }
    }
    cancelModal = () => {
        Navigation.dismissAllModals();

    };

    addDeviceToDatabase = (db) => {
        if (this.state.name === '' || this.state.place === '' || this.state.command === ''){
            ToastAndroid.show('Wypełnij wszystkie pola !', ToastAndroid.SHORT);
        }else {
            db.transaction((tx) => {
                tx.executeSql(
                    'INSERT INTO Devices (id_device, name, place, command, color) VALUES (?, ?, ?, ?, ?);',
                    ['1', this.state.name, this.state.place, this.state.command, this.state.color]);
            });
            ToastAndroid.show('Dodano urządzenie!', ToastAndroid.SHORT);
            this.cancelModal();
        }
    };


    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    style={styles.inputText}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    placeholder={'Name'}
                />
                <TextInput
                    style={styles.inputText}
                    onChangeText={(place) => this.setState({place})}
                    value={this.state.place}
                    placeholder={'Place'}
                />
                <TextInput
                    style={styles.inputText}
                    onChangeText={(command) => this.setState({command})}
                    value={this.state.command}
                    placeholder={'Command'}
                />
                <Text style={{fontSize: 20, paddingVertical: 10}}>
                    Color
                </Text>
                <ColorPicker
                    oldColor = 'green'
                    onColorSelected={color => this.state.color = color}
                    style={{flex: 1}}
                />

                <View style={styles.bottomBox}>
                    <TouchableOpacity style={styles.button} onPress={() => this.cancelModal()}>
                        <Text>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.addDeviceToDatabase(db)}>
                        <Text>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 35,
        marginHorizontal: 30,
    },
    inputText: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 10
    },
    button: {
        borderWidth: 1,
        borderColor: '#000000',
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    bottomBox: {
        height: 33,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }


});

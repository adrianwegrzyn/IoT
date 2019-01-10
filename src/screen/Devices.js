import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import SQLite from 'react-native-sqlite-storage'

var db = SQLite.openDatabase({name: 'databaseDevice.db', createFromLocation: '~www/databaseDevice.db'});

type Props = {};
export default class Devices extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            devices: [],
        }
    }

    componentDidMount(): void {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM Devices', [], (tx, results) => {
            });
        });

        this.downloadDataFromDatabase(db);
    }


    goModal = () => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'AddDevice',
                        passProps: {
                            text: 'stack with one child'
                        },
                        options: {
                            topBar: {
                                title: {
                                    text: 'New device',
                                    alignment: 'center',
                                }
                            }
                        }
                    }
                }]
            }
        });
    };

    downloadDataFromDatabase = (db) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM Devices;', [], (tx, results) => {
                var devices = [];
                for (let i = 0; i < results.rows.length; i++) {
                    devices[i] = results.rows.item(i);
                    console.log(results.rows.item(i))
                }
                this.setState({devices: devices});
            });
        });
    };

    render() {
        let rowsDevices = [];
        let row = [];
        for (let i = 0; i < this.state.devices.length; i++) {
            row.push(
                <View key={i}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: this.state.devices[i].color}]}>
                        <Text style={{
                            fontSize: 30,
                            color: '#000000',
                            textAlign: 'center'
                        }}>{this.state.devices[i].name}</Text>
                        <Text style={{fontSize: 15, textAlign: 'center'}}>{this.state.devices[i].place}</Text>
                    </TouchableOpacity>
                </View>
            );

            if (i % 2 !== 0) {
                rowsDevices.push(
                    <View style={styles.rowButton} key={i+100}>
                        {row}
                    </View>
                );
                row = [];
            }
            if (i === this.state.devices.length - 1 || this.state.devices.length === 0) {
                rowsDevices.push(
                    <View style={styles.rowButton} key={i}>
                        {row}
                        <TouchableOpacity style={styles.button} onPress={() => this.goModal()}>
                            <Text style={{fontSize: 40, color: '#000000', textAlign: 'center'}}>+</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
        if (this.state.devices.length === 0) {
            rowsDevices.push(
                <View style={styles.rowButton} key={100}>
                    <TouchableOpacity style={styles.button} onPress={() => this.goModal()}>
                        <Text style={{fontSize: 40, color: '#000000', textAlign: 'center'}}>+</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <ScrollView style={styles.container}>
                {rowsDevices}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: 150,
        height: 150,
        borderColor: '#000000',
        borderWidth: 1,
        margin: 15,
        justifyContent: 'center',
    },
    rowButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }

});

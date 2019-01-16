import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { BleManager } from 'react-native-ble-plx';

type Props = {};
export default class Connect extends Component<Props> {

    constructor(props) {
        super(props);
        this.manager = new BleManager();
    }

    checkBluetoothState() {
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }

        }, true)
    }

    sendAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log(error)
                return null;
            }
            console.log(device)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.default}>Connect screen!</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    default: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

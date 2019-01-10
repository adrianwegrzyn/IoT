import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

type Props = {};
export default class Connect extends Component<Props> {

    constructor(props) {
        super(props);
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

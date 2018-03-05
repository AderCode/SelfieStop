import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput } from "react-native";




export default class SubmissionScreen extends Component {

    static navigationOptions = {
        title: 'Submit-A-Place'
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.root}>
                    <TextInput placeholder="Address" style={styles.input} />
                    <TextInput placeholder="Description" style={styles.input} />
                    <View style={styles.btns}>
                        <View style={styles.btn}>
                            <Text>
                                Use GPS
                        </Text>
                        </View>
                        <View style={styles.btn}>
                            <Text>
                                Submit
                        </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: { backgroundColor: "white", flex: 1, flexDirection: 'column' },
    root: { flex: 1, flexDirection: 'column', alignItems: 'center' },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        width: '75%',
        margin: 10,
        padding: 5
    },
    btn: {
        height: 30,
        width: 100,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    btns: {
        flexDirection: 'row'
    }
});

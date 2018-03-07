// React & React Native Dependencies
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableNativeFeedback,
    AsyncStorage
} from 'react-native'

// Styling Dependencies
import { Button, Icon } from 'react-native-elements'


export default class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        }
    }

    componentDidMount() {

    }

    handleCheckAuth() {

    }

    handleOnInputChange() {

    }

    handleLogin() {

    }

    handleStoreAuthToken() {

    }

    handleNavigate() {

    }

    render() {
        let $emailErrMsg;
        let $passwordErrMsg;
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        ref={(el) => { this.name = el; }}
                        onChangeText={(name) => this.setState({ email })}
                        value={this.state.name}
                    />
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        ref={(el) => { this.name = el; }}
                        onChangeText={(name) => this.setState({ password })}
                        value={this.state.name}
                    />

                    <TouchableNativeFeedback
                        onPress={() => { return }}
                    >
                        <View style={styles.btnContainer}>
                            <Text style={{ fontSize: 30, color: 'white' }}>
                                Login
                                    </Text>
                        </View>
                    </TouchableNativeFeedback>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {},
    container: {},
    label: {
        width: '90%',
        alignSelf: 'center'
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7,
        width: '90%',
        margin: 10,
        padding: 5,
        alignSelf: 'center'
    },
    btnText: {
        fontSize: 30,
        color: 'white',
    },
    btnContainer: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
        backgroundColor: 'rgb(0, 142, 255)',
        borderRadius: 7,
        padding: 2,
        alignSelf: 'center'
    }
});

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

export default class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordVerify: ''
        }
    }
    render() {
        let $emailErrMsg;
        let $passwordErrMsg;
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                        ref={(el) => { this.name = el; }}
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    />
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        ref={(el) => { this.email = el; }}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry={true}
                        ref={(el) => { this.password = el; }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />

                    <Text style={styles.label}>Verify Password:</Text>
                    <TextInput
                        placeholder="Verify Password"
                        style={styles.input}
                        secureTextEntry={true}
                        ref={(el) => { this.passwordVerify = el; }}
                        onChangeText={(passwordVerify) => this.setState({ passwordVerify })}
                        value={this.state.passwordVerify}
                    />

                    <TouchableNativeFeedback
                        onPress={() => { return }}
                    >
                        <View style={styles.btnContainer}>
                            <Text style={{ fontSize: 30, color: 'white' }}>
                                Register
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
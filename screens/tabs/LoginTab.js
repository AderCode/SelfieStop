// React & React Native Dependencies
import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableNativeFeedback,
    AsyncStorage
} from 'react-native'
import Logo from '../../images/splash_logo.png'

// Styling Dependencies
import { Button, Icon } from 'react-native-elements'




export default class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailErr: false,
            passwordErr: false
        }
    }

    async handleLogin() {
        // let data = {
        //     email: this.state.email,
        //     password: this.state.password
        // }
        // let apiUrl = 'https://powerful-savannah-66747.herokuapp.com/api/auth/login'
        // let ipUrl = 'From Bruce when using local tunnel'
        // try {
            
        //     let results = await fetch({ url: apiUrl }, {
        //         body: JSON.stringify(data), // must match 'Content-Type' header
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         method: 'POST',
        //     });
        // } catch (e) {
        //     console.log(`¯l_(ツ)_/¯`)
        // }
        // await this.handleStoreAuthToken();
        // await this.handleNavigate('Home')
        this.state.email !== '' && this.state.password !== '' ? this.handleNavigate('Home') : this.setState({ emailErr: true, passwordErr: true})

    }

    async handleStoreAuthToken() {
        // Store token received in AsyncStorage
    }

    handleNavigate(screen) {
        this.props.screenProps.navigate(screen)
    }

    render() {
        let emailMsg = '*Incorrect email';
        let passMsg = '*Incorrect password';
        errMsg = (x) => {return <Text style={{color: 'red'}}>{x}</Text>}
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    <Image source={Logo} style={styles.logo} />
                    <Text style={styles.label}>Email: {this.state.emailErr ? errMsg(emailMsg) : false}</Text>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        ref={(el) => { this.email = el; }}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                    <Text style={styles.label}>Password: {this.state.passwordErr ? errMsg(passMsg) : false}</Text>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        style={styles.input}
                        ref={(el) => { this.password = el; }}
                        onChangeText={(password) => this.setState({ password })}
                    />

                    <TouchableNativeFeedback
                        onPress={() => { this.handleLogin() }}
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
    logo: {
        height: '50%',
        width: '50%',
        alignSelf: 'center'
    },
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

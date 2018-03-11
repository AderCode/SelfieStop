// React & React Native Dependencies
import React, { Component } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import Logo from '../../images/splash_logo.png'

// Styling Dependencies
import { Button, Icon } from 'react-native-elements'




export default class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'test@test.com',
            password: '',
            err: ''
        }
    }

    async handleLogin() {
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        let apiUrl = 'https://powerful-savannah-66747.herokuapp.com/api/auth/login'
        let ipUrl = 'https://smjetissah.localtunnel.me/api/auth/login'
        try {

            let results = await fetch({ url: apiUrl }, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            });
            await console.log(results)
            results.status !== 201
                ?
                await this.setState({ err: JSON.parse(results._bodyInit).message })
                :
                await this.handleStoreAuthToken(JSON.stringify(JSON.parse(results._bodyInit).token), JSON.stringify(JSON.parse(results._bodyInit).userId));
            // await console.log(await AsyncStorage.getItem('auth'))
            // await this.handleNavigate('Home')

        } catch (e) {
            console.log(`¯l_(ツ)_/¯ - "dunno, was a login error I guess. Here's what it says, so you tell me, man..." : \n`, e)
        }


        // this.state.email !== '' && this.state.password !== '' ? this.handleNavigate('Home') : this.setState({ emailErr: true, passwordErr: true})

    }

    async handleStoreAuthToken(token, userId) {
        console.log('-- handling token --\n', token)
        try {
            await AsyncStorage.setItem("auth", token)
            await AsyncStorage.setItem("userId", userId)
            // await console.log('successful token storage')
            await this.handleNavigate('Main')
        } catch (e) {
            console.log('error storing token: \n', e)
        }
    }

    async checkAsyncStorage() {
        // PRODUCTION VALUES
        let tokVal = await AsyncStorage.getItem("auth")
        let usrVal = await AsyncStorage.getItem("userId")
        await console.log(tokVal)
        await console.log(usrVal)

        // let allKeys = await AsyncStorage.getAllKeys()
        // await console.log(allKeys)

    }

    handleNavigate(screen) {
        this.props.screenProps.navigate(screen)
    }

    render() {
        console.log(this.state)
        let emailMsg = '*Incorrect email';
        let passMsg = '*Incorrect password';
        errMsg = (x) => { return <Text style={{ color: 'red' }}>{x}</Text> }
        return (
            <View style={styles.root}>
                <View style={styles.container}>

                    <Image source={Logo} style={styles.logo}  />

                    <Text style={styles.label}>Email: {this.state.err == 'email' ? errMsg(emailMsg) : false}</Text>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        ref={(el) => { this.email = el; }}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                    <Text style={styles.label}>Password: {this.state.err == 'pass' ? errMsg(passMsg) : false}</Text>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        style={styles.input}
                        ref={(el) => { this.password = el; }}
                        onChangeText={(password) => this.setState({ password })}
                    />


                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            onPress={() => { this.handleLogin() }}
                        >
                            <Icon
                                name="login"
                                type="entypo"
                                size={50}
                            />
                        </TouchableOpacity>
                    </View>


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
        backgroundColor: 'white',
        borderRadius: 7,
        borderWidth: 1,
        padding: 2,
        alignSelf: 'center'
    }
});

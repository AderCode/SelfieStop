import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import Logo from '../../images/splash_logo.png'

// Styling Dependencies
import { Button, Icon } from 'react-native-elements'

export default class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            emailValid: null,
            password: null,
            passwordVerify: null,
            passwordsMatch: true,
            requiredErr: false,
            emailErr: false
        }
    }

    resetState() {
        this.setState({
            username: null,
            email: null,
            emailValid: null,
            password: null,
            passwordVerify: null,
            passwordsMatch: true,
            requiredErr: false,
            emailErr: false
        })
    }

    async handleRegister() {
        
        this.state.passwordsMatch
            && this.state.password
            && this.state.passwordVerify
            && this.state.email
            && this.state.username
            ?
            await this.fetchRegister()
            :
            this.setState({ requiredErr: true })
    }

    handleCheckPasswords() {
        this.state.password === this.state.passwordVerify
            ?
            this.setState({ passwordsMatch: true })
            :
            this.setState({ passwordsMatch: false })
    }

    handleCheckEmail() {
        //Method to check that provided email is valid by having '@' and '.' in it.
    }

    async fetchRegister() {
        let data = {
            username: this.state.username,
            email: this.state.email.toLowercase(),
            password: this.state.password
        }
        // console.log('fetch activated')
        let apiUrl = 'https://powerful-savannah-66747.herokuapp.com/api/register'
        let ipUrl = 'https://fhtkncsjab.localtunnel.me/api/register'
        try {
            let results = await fetch({ url: apiUrl }, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            });
            results.status === 200
                ?
                this.handleNavigate('Login')
                :
                this.setState({ emailErr: true })

        } catch (e) {
            console.log(e);
            this.setState({ emailErr: true });
            return;
        }
    }

    handleNavigate(screen) {
        this.props.navigation.navigate(screen);
        this.resetState();
    }

    render() {
        let $emailErrMsg1 = "*Valid email address required";
        let $emailErrMsg2 = "*Email address already registered";
        let $passErrMsg1 = "*Password required";
        let $passErrMsg2 = "*Passwords do not match";
        let $nameErrMsg1 = "*Name required"
        errMsg = (x) => { return <Text style={{ color: 'red' }} >{x}</Text> }
        return (
            <View style={styles.root}>
                    <Image 
                    source={Logo} 
                    style={styles.logo}
                    resizeMethod="resize"
                    resizeMode="contain"
                    
                    />

                <ScrollView style={styles.scroll}>
                    <Text style={styles.label}>Username: {this.state.requiredErr ? errMsg($nameErrMsg1) : false}</Text>
                    <TextInput
                        placeholder="Username"
                        style={styles.input}
                        ref={(el) => { this.username = el; }}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                    />
                    <Text style={styles.label}>Email: {this.state.requiredErr ? errMsg($emailErrMsg1) : this.state.emailErr ? errMsg($emailErrMsg2) : false}</Text>
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        ref={(el) => { this.email = el; }}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                    <Text style={styles.label}>Password:  {this.state.requiredErr ? errMsg($passErrMsg1) : false}</Text>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry={true}
                        ref={(el) => { this.password = el; }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />

                    <Text style={styles.label}>Verify Password:  {this.state.passwordsMatch ? true : errMsg($passErrMsg2)}</Text>
                    <TextInput
                        placeholder="Verify Password"
                        style={styles.input}
                        secureTextEntry={true}
                        ref={(el) => { this.passwordVerify = el; }}
                        onChangeText={async (passwordVerify) => { await this.setState({ passwordVerify }); await this.handleCheckPasswords() }}
                        value={this.state.passwordVerify}
                    />


                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            onPress={() => this.handleRegister()}
                        >
                            <Text style={{ fontSize: 30, color: 'black' }}>
                                Register
                                    </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    root: {},
    scroll: {},
    logo: {
        height: '25%',
        width: '40%',
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
        borderWidth: 1,
        borderRadius: 7,
        padding: 2,
        alignSelf: 'center'
    }
});
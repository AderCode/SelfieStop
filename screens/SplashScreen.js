import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    AsyncStorage,
    ActivityIndicator
} from 'react-native'
import { TabNavigator } from 'react-navigation'
import SplashLogo from '../images/splash_logo.png'

import APIs from '../services/api'

//Tab Screens
import LoginTab from './tabs/LoginTab'
import RegisterTab from './tabs/RegisterTab'

const TabNavigation = TabNavigator({
    Login: { screen: LoginTab },
    Register: { screen: RegisterTab }
}, {
    lazy: 'true',
    tabBarOptions: {
        labelStyle: {
            fontSize: 11,
            color: 'black'
        },
        style: {
            backgroundColor: 'white',
            height: 50 // I didn't use this in my app, so the numbers may be off. 
        }
    }
});



export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authChecked: true, // set to false for production build
            isLoggedIn: false //false // set to false for production build
        }
    }

    async componentDidMount() {
        await this.handleCheckAuth();
    }

    async handleCheckAuth() {
        // DEV MODE //
        // this.state.isLoggedIn ? this.handleNavigate('Main') : this.setState({ authChecked: true })

        // PRODUCTION MODE //
        try {
            let token = await AsyncStorage.getItem('auth');
            token ?

            await this.handleFetchAuth(token) : false
            // this.setState({ authChecked: true})
           
        } catch (e) {
            alert(`Error fetching Token`);
            // console.log(e)
        }
    }

    async handleFetchAuth(token) {
        let data = { token }
        let apiUrl = 'https://powerful-savannah-66747.herokuapp.com/api/users/me'
        let ipUrl = 'https://smjetissah.localtunnel.me/api/users/me'
        let results;
        try {
            results = await fetch({ url: apiUrl }, {        // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
                // body: JSON.stringify(data),                 // IF SERVER HAS ISSUES RECEIVING || PARSING req.body TRY REMOVING JSON.stringify() //
                headers: {                    
                    'Authorization': `Bearer ${token}` ,             //          SINCE TOKEN IS STRINGIFIED BEFORE BEING STORED IN ASYNCSTORAGE          //
                    'content-type': 'application/json'      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
                },
                method: 'GET',
            });
            // console.log(results)
            results.status !== 200 
            ?
            this.setState({ authChecked: true })
            :
            await this.handleNavigate('Main')
        } catch (e) {
            // console.log(`¯l_(ツ)_/¯`);
            this.setState({ authChecked: true })
        }      
        // console.log(results)                                                        // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // results == results ? await this.handleNavigate('Home') : false // !!! MUST ADD VARIABLE TO CHECK RESULTS AGAINST TO VERIFY LOGGED IN OR NOT !!! //
    }                                                                  // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    handleNavigate(screen) {
        this.props.navigation.navigate(`${screen}`)
    }

    async handleRejection() {
        await AsyncStorage.multiRemove(['auth', 'userId'])
        await this.setState({ authChecked: true })
    }

    // !!! Needs to have logo and loading indicator
    handleSplash() {
        return (
            <View style={styles.root}>
                <Image source={SplashLogo} style={styles.logo} />
                <Text style={styles.label}>
                    Loading...
                </Text>
                <ActivityIndicator size='large' color="black" />
            </View>
        )
    }

    handleLogin() {
        return (
            <TabNavigation screenProps={{ navigate: this.handleNavigate.bind(this) }} />
        )
    }

    render() {
        let { authChecked, isLoggedIn } = this.state;
        return authChecked && !isLoggedIn ? this.handleLogin() : this.handleSplash()
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    logo: {
        height: '50%',
        width: '50%',
        alignSelf: 'center',
        margin: 20
    },
    label: {
        textAlign: 'center',
        margin: 20,
        fontSize: 40,
    },
    loading: {
        fontSize: 40
    }
});
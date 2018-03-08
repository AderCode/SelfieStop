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

//Tab Screens
import LoginTab from './tabs/LoginTab'
import RegisterTab from './tabs/RegisterTab'

const TabNavigation = TabNavigator({
    Login: { screen: LoginTab },
    Register: { screen: RegisterTab }
});



export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authChecked: false, // set to false for production build
            isLoggedIn: true //false // set to false for production build
        }
    }

    async componentDidMount() {
        await this.handleCheckAuth();
    }

    async handleCheckAuth() {
        // DEV MODE //
        this.state.isLoggedIn ? this.handleNavigate('Home') : this.setState({ authChecked: true })

        // PRODUCTION MODE //
        // await AsyncStorage.getItem('auth', async (err, results) => {
        //     err ? console.log(`¯l_(ツ)_/¯ AsyncStorage.getItem ERROR: `, err) : results ? await this.handleFetchAuth(results) : console.log(`¯l_(ツ)_/¯ AsyncStorage.getItem ERROR & RESULTS FAILURE!!!: so, uh, something else went wrong, but it didn't tell me anything... (x.x)`)
        // })
    }

    async handleFetchAuth(token) {
        let data = { token }
        let apiUrl = 'https://powerful-savannah-66747.herokuapp.com/api/auth'
        let ipUrl = 'From Bruce when using local tunnel'
        let results;
        try {
            results = await fetch({ url: apiUrl }, {        // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
                body: JSON.stringify(data),                 // IF SERVER HAS ISSUES RECEIVING || PARSING req.body TRY REMOVING JSON.stringify() //
                headers: {                                  //          SINCE TOKEN IS STRINGIFIED BEFORE BEING STORED IN ASYNCSTORAGE          //
                    'content-type': 'application/json'      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
                },
                method: 'POST',
            });
        } catch (e) {
            console.log(`¯l_(ツ)_/¯`);
            this.setState({ authChecked: true })
        }                                                              // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        results == results ? await this.handleNavigate('Home') : false // !!! MUST ADD VARIABLE TO CHECK RESULTS AGAINST TO VERIFY LOGGED IN OR NOT !!! //
    }                                                                  // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    handleNavigate(screen) {
        this.props.navigation.navigate(`${screen}`)
    }

    // !!! Needs to have logo and loading indicator
    handleSplash() {
        return (
            <View style={styles.root}>
                <Image source={SplashLogo} style={styles.logo} />
                <Text style={styles.label}>
                    Loading...
                </Text>
                <ActivityIndicator size='large' />
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
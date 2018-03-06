import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Button, Alert, CameraRoll, Image, Platform, TouchableNativeFeedback } from "react-native";
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import ImagePicker from 'react-native-image-picker'




import Console from '../components/Console' // For on screen console
import NavBar from '../components/NavBar'


let options = {
    title: 'Upload a Selfie',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class SubmissionScreen extends Component {
    constructor(props) {
        super(props);

        this.consoleLog.bind(this)

        this.state = {
            photos: [],
            log: 'logs appear here', // For on screen console
            imgUri: null,
            name: null,
            description: null,
            loaded: 0

        }

    }

    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
            .then(r => {
                this.setState({ photos: r.edges });
                this.consoleLog(JSON.stringify(r))
            })
            .catch((err) => {
                this.consoleLog(JSON.stringify(err))
            });
    };

    consoleLog(log) {
        this.setState({ log: `${log}` })
    }

    async fetchImages(data) {
        try {
            let apiUrl = 'https://powerful-savannah-66747.herokuapp.com/api/images'
            let ipUrl = 'https://zdkwwnlgii.localtunnel.me//api/images'
            let results = await fetch({ url: apiUrl }, {
                body: data, // must match 'Content-Type' header
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            });
            // this.setState({ log: `results = ${JSON.stringify(results)}` })
        } catch (e) {
            this.consoleLog("HomeScreen Stops Fetch Error = ", e)
        }
    }

    handleSubmit() {
        let uri = this.state.imgUri;
        let name = this.state.name;
        let description = this.state.description
        if (uri && name && description) {
            let data = {
                uri,
                name,
                description
            };
            this.fetchImages(JSON.stringify(data));
            this.reset();
            this.setState({ log: 'uploaded' })
        } else {
            this.setState({ log: 'error' })
        }
    }

    imagePicker() {
        ImagePicker.launchImageLibrary(options, (response) => {
            this.consoleLog('Response = ', response);

            if (response.didCancel) {
                this.consoleLog('User cancelled image picker');
            }
            else if (response.error) {
                this.consoleLog('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                this.consoleLog('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data...
                const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = { uri: response.uri.replace('file://', ''), isStatic: true };
                } else {
                    const source = { uri: response.uri, isStatic: true };
                }
                // this.fetchImages(JSON.stringify(source))
                // this.consoleLog(source.uri);
                this.setState({ imgUri: `${source.uri}` })
            }
        });
    }

    cam() {
        ImagePicker.launchCamera(options, (response) => {
            this.consoleLog('Response = ', response);
            this.setState({ loaded: 1 });

            if (response.didCancel) {
                this.consoleLog('User cancelled image picker');

            }
            else if (response.error) {
                this.consoleLog('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                this.consoleLog('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data...
                const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = { uri: response.uri.replace('file://', ''), isStatic: true };
                } else {
                    const source = { uri: response.uri, isStatic: true };
                }
                // this.fetchImages(JSON.stringify(source))
                this.consoleLog(source.uri);
                this.setState({ imgUri: `${source.uri}` })
            }
        });
    }

    navigate(screen) {
        this.props.navigation.navigate(screen)
    }

    reset() {
        this.setState({
            imgUri: null,
            name: null,
            description: null
        })
    }

    render() {
        let $imagePreview;
        let $msg;
        if (this.state.imgUri) {
            $imagePreview = <Image source={{ uri: this.state.imgUri }} style={{ height: '100%', width: '100%' }} />
        } else {
            $imagePreview = <Text style={{ alignSelf: 'center' }}>Take a Selfie or Upload One</Text>

        }
        if (this.state.log === 'error') {
            $msg = <Text style={{ alignSelf: 'center', color: 'red', marginBottom: 20 }}>*Image, Name, and Description are required.</Text>
        } else if (this.state.log === 'uploaded') {
            $msg = <Text style={{ alignSelf: 'center', color: 'black', marginBottom: 20 }}>Thank you for your submission!!! (^.^)</Text>
        }

        return (
                <View style={styles.container}>
                        <View style={{
                            backgroundColor: '#0084FF',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            borderColor: 'black',
                            borderBottomWidth: 2.5,
                            padding: 2,
                        }}>
                            <Text style={styles.header} style={{ alignSelf: 'center', fontSize: 40, color: 'white'}} >Submit a New Stop</Text>
                        </View>

                    <View style={styles.root}>
                        <View style={{ backgroundColor: 'white', width: '97%', height: 200, margin: 10, borderColor: 'black', borderWidth: 2, justifyContent: 'center' }}>
                            {$imagePreview}
                        </View>
                        <View style={{ width: '97%', alignSelf: 'center', borderColor: 'black', borderWidth: 2, backgroundColor: 'white' }}>
                            <TextInput
                                placeholder="Location Name"
                                style={styles.input}
                                ref={(el) => { this.name = el; }}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                            />
                            <TextInput
                                placeholder="Location Description"
                                style={styles.input}
                                ref={(el) => { this.description = el; }}
                                onChangeText={(description) => this.setState({ description })}
                                value={this.state.description}
                            />
                            <TouchableNativeFeedback
                                onPress={() => this.handleSubmit()}
                            >
                                <View style={{
                                    width: '40%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    margin: 30,
                                    backgroundColor: 'rgb(0, 132, 255)',
                                    borderColor: 'black',
                                    borderWidth: 2,
                                    borderRadius: 10,
                                    paddingTop: 2,
                                    paddingLeft: 4,
                                    paddingRight: 0,
                                    alignSelf: 'center'
                                }}

                                >



                                    <Text style={{ fontSize: 30, color: 'white' }}>
                                        Submit
                                </Text>
                                    <Icon
                                        name="file-upload"
                                        type="materialcommunityicons"
                                        size={50}
                                    />
                                </View>
                            </TouchableNativeFeedback>
                            {$msg}
                        </View>


                    </View>
                    {/* <Console log={this.state.log} /> */}


                    
                        <View style={{
                            backgroundColor: '#0084FF',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            borderColor: 'black',
                            borderTopWidth: 2.5,
                            padding: 2,
                        }}>
                            <TouchableNativeFeedback
                                onPress={() => this.navigate('Home')}
                            >
                                <Icon
                                    name="home"
                                    type="entypo"
                                    size={50}
                                />
                            </TouchableNativeFeedback>


                            <TouchableNativeFeedback
                                onPress={() => this.cam()}
                            >
                                <Icon
                                    name="add-a-photo"
                                    type="materialicons"
                                    size={50}
                                />
                            </TouchableNativeFeedback>

                            <TouchableNativeFeedback
                                onPress={() => this.imagePicker()}
                            >
                                <Icon
                                    name="folder-add"
                                    type="foundation"
                                    size={50}
                                />
                            </TouchableNativeFeedback>

                        </View>
                  
                </View>
        );
    }
}
const styles = StyleSheet.create({
    container: { backgroundColor: "grey", flex: 1, flexDirection: 'column' },
    root: { flex: 1, flexDirection: 'column', alignItems: 'center' },
    input: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: '90%',
        margin: 10,
        padding: 5,
        alignSelf: 'center'
    },
    btn: {
        backgroundColor: 'rgb(0, 59, 222)',
        height: 30,
        width: 100,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

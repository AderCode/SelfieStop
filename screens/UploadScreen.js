import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Button, Alert, CameraRoll, Image, Platform } from "react-native";
// import {Button} from 'react-native-elements'

import ImagePicker from 'react-native-image-picker'




import Console from '../components/Console' // For on screen console


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
            imgUri: '',
            name: '',
            description: ''

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
            let results = await fetch({ url: ipUrl }, {
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
        let data = {
            uri: this.state.imgUri,
            name: this.state.name,
            description: this.state.description
        };
        this.fetchImages(JSON.stringify(data))
    }

    imagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
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
                this.consoleLog(source.uri);
                this.setState({imgUri: `${source.uri}`})
            }
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.header} style={{alignSelf: 'center'}} >Submit a new Stop</Text>
                <View style={styles.root}>
                    <Image source={{uri: this.state.imgUri }} style={{height: 200, width: 200}} />
                    <View style={styles.btn}>
                            <Text
                            onPress={() => this.imagePicker()}>
                                Upload
                        </Text>
                        </View>
                    <TextInput 
                    placeholder="Name" 
                    style={styles.input} 
                    ref= {(el) => { this.name = el; }}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    />
                    <TextInput 
                    placeholder="Description" 
                    style={styles.input} 
                    ref= {(el) => { this.description = el; }}
                    onChangeText={(description) => this.setState({description})}
                    value={this.state.description}
                    />
                    
                        <View style={styles.btn}>
                            <Text
                            onPress={() => this.handleSubmit()}>
                                Submit
                        </Text>
                        

                    </View>
                </View>
                <Console log={this.state.log} />
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

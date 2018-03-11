import React, { Component } from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Button, Alert, CameraRoll, Image, Platform, TouchableNativeFeedback } from "react-native";
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import ImagePicker from 'react-native-image-picker'
import Keys from '../services/keys'
import { RNS3 } from 'react-native-aws3'



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

        this.state = {
            log: 'logs appear here',
            source: null,
            imgUrl: null,
            loaded: 0,
            name: "",
            description: "",
            lat: null,
            lng: null,
            userId: 1,
            city: 'Birmingham',
        }

    }


    async getImageLocation() {
        
        await navigator.geolocation.getCurrentPosition(res => {
            this.setState({
                    lat: res.coords.latitude,
                    lng: res.coords.longitude
            })
        },
            err => {
                console.log("geo err = ", err);
                return
            }, { enableHighAccuracy: true });

    }


    async fetchImages() {
        let { userId, name, description, city, lat, lng, imgUrl} = this.state;
        let data = {name, description, city, imgurl: imgUrl, lat, lng, userid: userId}

        console.log('we ready to fetch, heres data:', data)
        try {
            let localTunnel = "https://rxaahfxlzq.localtunnel.me/" // last updated: 3/10/18 7:00pm
            let heroku = 'https://powerful-savannah-66747.herokuapp.com'
            let results = await fetch({ url: `${heroku}api/stops` }, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
            });
            console.log(results)
        } catch (e) {
            console.log("Upload Fetch Error = ", e)
        }
    }

    async uploadImg(uri) {
        console.log('uploadImg')
        console.log
        let file = {
            uri,
            name: `${new Date().getTime()}.jpeg`,
            type: "image/jpeg"
        }

        let options = {
            keyPrefix: this.state.city.toLowerCase() + '_',
            bucket: "selfietester",
            region: "us-east-2",
            accessKey: Keys.s3.accessKey,
            secretKey: Keys.s3.secretKey,
            successActionStatus: 201
        }

      RNS3.put(file, options)
       .then(
            res => {
                if (res.status !== 201) {
                    console.log('uploadImg error: ', res)
                    //   throw new Error("Failed to upload image to S3");
                } else {
                    console.log(res.body.postResponse.location);
                   ////////////// // await SET STATE FOR data.imgUrl!!! /////////////////
                    this.setState({ imgUrl: `${res.body.postResponse.location}` })
                }
            })
            .then((res) =>
                this.fetchImages()
            )
            .catch(e => console.log(e))

    }

    async handleSubmit() {
        console.log(this.state)
        let { source, userId, url, name, description, city, lat, lng } = this.state;
        if (source && name && description && lat && lng) {
            await this.uploadImg(this.state.uri)
        } else {
            console.log("¯l_(ツ)_/¯ submission failure")
            this.setState({ log: 'error' })
        }
    }

    // imagePicker() {
    //     ImagePicker.launchImageLibrary(options, (response) => {
    //         console.log('Response = ', response);

    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         }
    //         else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         }
    //         else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         }
    //         else {
    //             // You can display the image using either data...
    //             const source = { uri: response.data, isStatic: true };

    //             // or a reference to the platform specific asset location
    //             if (Platform.OS === 'ios') {
    //                 const source = { uri: response.uri.replace('file://', ''), isStatic: true };
    //             } else {
    //                 const source = { uri: response.uri, isStatic: true };
    //             }
    //             // this.fetchImages(JSON.stringify(source))
    //             // console.log(source.uri);
    //             this.setState({ source: `${source.uri}`, uri: response.uri })
    //         }
    //     });
    // }

    cam() {
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);
            this.setState({ loaded: 1 });

            if (response.didCancel) {
                console.log('User cancelled image picker');

            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data...
                // const source = { uri: response.data, isStatic: true };

                // // or a reference to the platform specific asset location
                // if (Platform.OS === 'ios') {
                //     const source = { uri: response.uri.replace('file://', ''), isStatic: true };
                // } else {
                //     const source = { uri: response.uri, isStatic: true };
                // }
                // this.fetchImages(JSON.stringify(source))
                // console.log(source.uri);
                this.setState({ source: `${response.data}`, uri: response.uri })
                this.getImageLocation()
            }
        });
    }


    // setNestedState(obj, prop, value) {
    //     Object.defineProperty(obj, prop, { value: value });
    //     this.setState(this.state)
    // }

    navigate(screen) {
        this.props.navigation.navigate(screen)
    }

    reset() {
        this.setState({
            source: null,
            name: null,
            description: null
        })
    }

    render() {
        let $imagePreview;
        let $msg;
        if (this.state.source) {
            $imagePreview = <Image source={{ uri: `data:image/jpeg;base64,` + this.state.source }} style={{ height: '100%', width: '100%' }} />
        } else {
            $imagePreview = <Text style={{ alignSelf: 'center' }}>Take a Picture to Upload</Text>

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
                    <Text style={styles.header} style={{ alignSelf: 'center', fontSize: 40, color: 'white' }} >Submit a New Stop</Text>
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
                    {/* <TouchableNativeFeedback
                                onPress={() => this.navigate('Home')}
                            >
                                <Icon
                                    name="home"
                                    type="entypo"
                                    size={50}
                                />
                            </TouchableNativeFeedback> */}


                    <TouchableNativeFeedback
                        onPress={() => this.cam()}
                    >
                        <Icon
                            name="add-a-photo"
                            type="materialicons"
                            size={50}
                        />
                    </TouchableNativeFeedback>

                    {/* <TouchableNativeFeedback
                        onPress={() => this.imagePicker()}
                    >
                        <Icon
                            name="folder-add"
                            type="foundation"
                            size={50}
                        />
                    </TouchableNativeFeedback> */}

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

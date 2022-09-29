import {
    Text,
    TouchableOpacity,
    View,
    Image,
    PixelRatio,
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    TextInput,
    Switch,
} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';

import {Auth} from "./CheckAuth"



Text.defaultProps = {
    ...(Text.defaultProps || {}),
    allowFontScaling: false,
};

export default class Login extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            header: null,
            headerLeft: null,
            headerRight: null,
            email:"",
            psw:"",
            token:""
        }
    }

    constructor(props) {
        super(props)
        this.state={
            souvien:true
        }
    }

    onButtonPressed = () => {

    }

    render() {

        return <View style={styles.viewView}>
            <StatusBar
                animated={true}
                backgroundColor="#ffffff"
            />

            <View pointerEvents="box-none"style={{ height: 268, marginLeft: 30, }}>
                <View style={styles.headerView}>
                    <Image source={require("./images/Login/logo.png")} style={styles.logoImage}/>
                    <Text style={styles.titleText}>
                        Connectez-vous {"\n"}Pour continuer
                    </Text>
                    <View style={styles.underlineView}/>
                </View>
                <Image source={require("./images/Login/bglogo.png")} style={styles.bglogoImage}/>
            </View>

            <View style={styles.boxLoginView}>
                <View style={styles.input1View}>
                    <Image source={require("./images/Login/groupe-117.png")} style={styles.lockIconImage}/>

                        <TextInput
                            autoCorrect={false}
                            style={{
                                color: "rgb(97, 97, 106)",
                                fontSize: 13,
                                fontStyle: "normal",
                                fontWeight: "normal",
                                textAlign: "left",
                                letterSpacing: 2.16,
                                //backgroundColor: "red",
                                opacity: 0.65,
                                flex:1,
                                marginLeft:5,

                            }}
                            placeholderTextColor={'rgba(97, 97, 106,0.5)'}
                            placeholder={"exemple@gmail.com"}

                            onChangeText={(email)=>{this.setState({email})}}
                            value={this.state.email}



                        />

                </View>
                <View style={styles.input2View}>
                    <Image source={require("./images/Login/groupe-117.png")} style={styles.lockIconTwoImage}/>
                    <TextInput
                        autoCorrect={false}
                        secureTextEntry
                        style={{
                            color: "rgb(97, 97, 106)",
                            fontSize: 13,
                            fontStyle: "normal",
                            fontWeight: "normal",
                            textAlign: "left",
                            letterSpacing: 2.16,
                            //backgroundColor: "red",
                            opacity: 0.65,
                            flex:1,
                            marginLeft:5,

                        }}
                        placeholderTextColor={'rgba(97, 97, 106,0.5)'}
                        placeholder={"password"}

                        onChangeText={(psw)=>{this.setState({psw})}}
                        value={this.state.psw}

                    />
                </View>
                <View style={{ flex: 1, }}/>
                <View style={styles.boxRemembreView}>
                    <Text style={styles.souviensToiDeMoiText}>
                        Souviens-toi de moi
                    </Text>
                    <View style={{ flex: 1, }}/>
                    <Switch trackColor={{
                        true: "rgb(30, 198, 198)",
                        false: "#c1c1c1",
                    }}
                            onChange={()=>{this.setState({souvien:!this.state.souvien})}}
                            value={this.state.souvien}
                            thumbColor="white"
                    />
                </View>
            </View>

            <View style={{ flex: 1, }}/>

            <TouchableOpacity onPress={async ()=>{
                if(await Auth(this.state.email,this.state.psw,this)){
                    this.props.login(this.state.token)
                }else{
                    Toast.show("email ou mot de passe incorrect")
                }
                //this.props.login()
            }} style={styles.buttonButton}>
                <Text style={styles.buttonButtonText}>
                    Se Connecter
                </Text>
                <Image source={require("./images/Login/icon-right.png")} style={styles.buttonButtonImage}/>
            </TouchableOpacity>

        </View>
    }
}

const styles = StyleSheet.create({
    viewView: {
        backgroundColor: "white",
        width:"100%",
        height:"100%"
    },
    headerView: {
        backgroundColor: "transparent",
        position: "absolute",
        left: 0,
        width: 195,
        top: 86,
        height: 182,
        alignItems: "flex-start",
    },
    logoImage: {
        backgroundColor: "transparent",
        resizeMode: "center",
        width: 166,
        height: 55,
    },
    titleText: {
        color: "rgb(50, 50, 50)",
        fontFamily: "Poppins-Bold",
        fontSize: 22,
        fontStyle: "normal",
        fontWeight: "bold",
        textAlign: "left",
        lineHeight: 30,
        paddingTop: 1,
        backgroundColor: "transparent",
        marginLeft: 1,
        marginTop: 34,
    },
    underlineView: {
        backgroundColor: "rgb(30, 198, 198)",
        borderRadius: 3,
        width: 40,
        height: 6,
        marginLeft: 1,
        marginTop: 21,
    },
    bglogoImage: {
        resizeMode: "center",
        backgroundColor: "transparent",
        position: "absolute",
        right: 0,
        width: 159,
        top: 0,
        height: 160,
    },
    boxLoginView: {
        backgroundColor: "transparent",
        height: 171,
        marginLeft: 34,
        marginRight: 30,
        marginTop: 76,
    },
    input1View: {
        backgroundColor: "rgb(242, 242, 242)",
        borderRadius: 25.5,
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowRadius: 16,
        shadowOpacity: 1,
        height: 51,
        marginRight: 4,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    lockIconImage: {
        backgroundColor: "transparent",
        resizeMode: "center",
        alignSelf: "center",
        width: 20,
        height: 23,
        marginLeft: 24,
    },
    textText: {
        color: "rgb(97, 97, 106)",
        //fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 4.16,
        backgroundColor: "transparent",
        opacity: 0.65,
        marginLeft: 12,
        marginTop: 17,
    },
    input2View: {
        backgroundColor: "rgb(242, 242, 242)",
        borderRadius: 25.5,
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowRadius: 16,
        shadowOpacity: 1,
        height: 51,
        marginRight: 4,
        marginTop: 13,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    lockIconTwoImage: {
        backgroundColor: "transparent",
        resizeMode: "center",
        alignSelf: "center",
        width: 20,
        height: 23,
        marginLeft: 24,
    },
    textTwoText: {
        backgroundColor: "transparent",
        opacity: 0.65,
        color: "rgb(97, 97, 106)",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        letterSpacing: 4.16,
        marginLeft: 12,
        marginTop: 17,
    },
    boxRemembreView: {
        backgroundColor: "transparent",
        height: 24,
        marginLeft: 5,
        flexDirection: "row",
        alignItems: "flex-end",
    },
    souviensToiDeMoiText: {
        color: "rgb(124, 125, 126)",
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
        backgroundColor: "transparent",
        marginBottom: 5,
    },
    switchView: {
        backgroundColor: "rgb(30, 198, 198)",
        borderRadius: 12,
        width: 47,
        height: 24,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    knobView: {
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowRadius: 1,
        shadowOpacity: 1,
        width: 20,
        height: 21,
        marginRight: 3,
    },
    buttonButtonText: {
        color: "white",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "center",
    },
    buttonButtonImage: {
        resizeMode: "contain",
        marginLeft: 10,
    },
    buttonButton: {
        backgroundColor: "rgb(30, 198, 198)",
        borderRadius: 27.5,
        shadowColor: "rgb(224, 202, 194)",
        shadowRadius: 10,
        shadowOpacity: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        height: 55,
        marginLeft: 34,
        marginRight: 34,
        marginBottom: 122,
    },
})

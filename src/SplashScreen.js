import {Text, TouchableOpacity, View, Image, PixelRatio, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';



Text.defaultProps = {
    ...(Text.defaultProps || {}),
    allowFontScaling: false,
};

export default class NFCScan extends Component {

    componentDidMount(): void {
        console.log("=======")

    }

    render() {
        return(
            <View style={{
                backgroundColor:'white',
                flex: 1,
                height:"100%",width:"100%",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <LinearGradient style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}} start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['rgba(255, 255, 255, 0)', 'rgba(191, 101,10 , 0.7)']}>

                    {/*'rgba(251, 151, 16, 1)  'rgba(191, 101,1 , 1)' */}


                    <View style={{width:PixelRatio.getPixelSizeForLayoutSize(60),height:PixelRatio.getPixelSizeForLayoutSize(60),
                        backgroundColor:"#FFFFFFE1",
                        borderRadius:160,
                        // bottom:"10%",
                        position:"absolute",top:"19%",
                        alignItems:"center",justifyContent:"center"
                    }}>
                        <Image style={{resizeMode:"contain",width:"50%",height:"50%"}} source={require("./images/scanner.png")}/>
                    </View>





                    <View style={{width:"90%",height:"40%",backgroundColor:"white",position:"absolute",bottom:"10%",
                        borderRadius:10,
                        alignItems:"center",overflow:"hidden"
                    }}>
                        <View style={{width:"100%",height:"75%",backgroundColor:"#FFFFFFF0",
                            // bottom:"10%",
                            alignItems:"center",justifyContent:"center",
                        }}>
                            <Image style={{resizeMode:"contain",width:"50%",height:"50%"}} source={require("./images/nfc.png")}/>
                            <Text style={{color:"black",fontSize:20,fontWeight:"bold"}}>Approchez un tag NFC</Text>
                            <ActivityIndicator size="large" color="#FFAB15"/>
                        </View>
                        <View style={{width:"90%",height:60,backgroundColor:"white",left:"5%",position:"absolute",bottom:30,
                            borderTopWidth:1,borderBottomWidth:1,borderColor:"#000000",
                            alignItems:"center",justifyContent:"center"
                        }}>

                            <Text style={{color:"black",fontSize:17}}>« Bienvenue dans Smart Scanner »</Text>
                        </View>
                    </View>




                </LinearGradient>



            </View>

        )
    }


}

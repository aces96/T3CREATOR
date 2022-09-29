import {Text, TouchableOpacity, View, Image, PixelRatio, ActivityIndicator,StatusBar} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import Selecter from './Selecter';



Text.defaultProps = {
    ...(Text.defaultProps || {}),
    allowFontScaling: false,
};

var items=[
    { label: "L’Université Mohammed VI Polytechnique", value: "Université Mohammed VI Polytechnique" }
]

export default class NFCScan extends Component {

    constructor(){
        super();
        this.state={
            organisation:"",
            selecter:false
        }

    }

    async componentDidMount(): void {
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
                {this.state.selecter &&

                <Selecter
                    onSelect={(value,label)=>{console.log("value : ",value , " label : ",label)}}
                    items={items}
                    fermer={()=>{this.setState({selecter:false})}}
                    title={"Choisir une organisation"}
                />
                }

                <StatusBar
                    animated={true}
                   // backgroundColor="#2DBDBD"
                    translucent backgroundColor="transparent"
                     />

                <View style={{width:"100%",height:"75%",position:"absolute",top:0}}>
                    <Image style={{width:"100%",height:"100%",resizeMode:"cover"}} source={require('./images/bg4.png')}/>
                </View>
                <View style={{height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}  >





                    <View  style={{width:PixelRatio.getPixelSizeForLayoutSize(70),height:PixelRatio.getPixelSizeForLayoutSize(50),
                        //backgroundColor:"#FFFFFFE1",
                        //borderRadius:160,
                        // bottom:"10%",
                        position:"absolute",top:"5%",
                        alignItems:"center",justifyContent:"center",
                    }}>
                        <Image style={{resizeMode:"contain",width:"100%",height:"100%",backgroundColor:"transparent"}} source={require("./images/logo4.png")}/>
                    </View>







                    <View style={{width:"80%",height:"50%",backgroundColor:"white",position:"absolute",bottom:"17%",
                        borderRadius:20,
                        alignItems:"center",
                        shadowColor: "#00000072",
                        shadowOffset: {
                            width: 5,
                            height: 5,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,
                        elevation: 8,

                    }}>

                        <View style={{height:50,width:"100%",justifyContent:"center",alignItems:"center",position:"absolute",top:0}}>
                            <Text style={{color:"black",fontSize:16,textAlign:"center"}}>Organisation  {this.state.organisation}</Text>
                        </View>

                        <View
                            onPress={async ()=>{

                                /*

                                await NfcManager.requestTechnology([NfcTech.Ndef]);
                                let bytes= Ndef.encodeMessage([Ndef.textRecord('Mobile NFC')]);



                                if (bytes) {
                                    await NfcManager.ndefHandler // STEP 2
                                        .writeNdefMessage(bytes); // STEP 3
                                    console.log("Log : Done ")
                                }
                                */
                                /*

                                let resp;
                                const password = [0x1, 0x2, 0x3, 0x4];

                                let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;
                                await NfcManager.requestTechnology([NfcTech.MifareIOS,NfcTech.NfcA,NfcTech.Ndef,NfcTech.MifareClassic]);
                                resp = await cmd([0x1B,0x1,0x2,0x3,0x4]);

                                 */



                                /*

                                let resp = await NfcManager.transceive([0x2b, ...password]).then((res)=>{
                                    console.log("Donnnne")
                                    console.log("RES : ",res)
                                }).catch((e)=>{
                                    console.log("Erreur : ",e)
                                    console.log("Erreur : ",JSON.stringify(e))
                                }).finally(()=>{
                                    console.log("Fiiin : ")
                                })
                                */

                            }}
                            style={{width:"90%",height:"90%",backgroundColor:"transparent",
                            // bottom:"10%",
                            alignItems:"center",justifyContent:"center",
                                marginTop:20

                            //paddingBottom:10
                            // bottom:10
                        }}>
                            <View style={{width:"60%",height:"50%",marginBottom:20,}}>


                            <Image style={{resizeMode:"contain",width:"110%",height:"110%",marginBottom:20,position:"absolute",top:"-5%",left:"-5%"}} source={require("./images/gif/bgScanner.png")}/>
                            <Image style={{resizeMode:"contain",width:"100%",height:"100%",marginBottom:20,}} source={require("./images/gif/scanner1.gif")}/>
                            </View>
                            <Text style={{color:"#051F58",fontSize:20,fontWeight:"bold",marginBottom:15,textAlign:"center"}}>{!this.props?.permissions?"Permissions non accordées":this.props?.nfcEnabled?"Balayez le Document avec votre Téléphone":"Activer votre NFC"}</Text>
                            {false &&this.props?.nfcEnabled && this.props?.permissions &&
                                <ActivityIndicator size="large" color="#235EA1"/>
                            }
                        </View>
                        {/*<View style={{width:"90%",height:60,backgroundColor:"white",left:"5%",position:"absolute",bottom:30,*/}
                        {/*    borderTopWidth:1,borderBottomWidth:1,borderColor:"#000000",*/}
                        {/*    alignItems:"center",justifyContent:"center"*/}
                        {/*}}>*/}

                        {/*    <Text style={{color:"black",fontSize:16}}>« Bienvenue dans Smart Scanner »</Text>*/}
                        {/*</View>*/}
                    </View>


                    <View style={{width:"100%",position:"absolute",bottom:45,left:0,justifyContent:"center",alignItems:"center"}}>
                        <TouchableOpacity
                            onPress={()=>{this.setState({selecter:true})}}
                            style={{backgroundColor:"#2DBDBD",justifyContent:"center",alignItems:"center",borderRadius:15}}>
                            <Text style={{color:"white",fontSize:15,textAlign:"center",padding:10}}>Changer organisation</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:"100%",position:"absolute",bottom:15,left:0,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"black",fontSize:12}}>Copyright © 2022 SensThings</Text>
                    </View>



                </View>





            </View>

        )
    }


}

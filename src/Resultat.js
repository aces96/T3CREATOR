import {Text, TouchableOpacity, View, Image, PixelRatio, ActivityIndicator,StatusBar,BackHandler,ScrollView} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';




Text.defaultProps = {
    ...(Text.defaultProps || {}),
    allowFontScaling: false,
};




export default class Resultat extends Component {

    constructor(){
        super()

    }

    async componentDidMount(){
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


                <View style={{width:"100%",height:"100%",position:"absolute",top:0}}>
                    <Image style={{width:"100%",height:"100%",resizeMode:"cover"}} source={require('./images/bgg.png')}/>
                </View>
                <View style={{height:"100%",width:"100%",}}  >



                    <View style={{height:"20%",width:"100%",justifyContent:"center",alignItems:"center"}}>

                    <View  style={{width:PixelRatio.getPixelSizeForLayoutSize(60),height:PixelRatio.getPixelSizeForLayoutSize(50),
                        //backgroundColor:"#FFFFFFE1",
                        //borderRadius:160,
                        // bottom:"10%",
                        position:"absolute",top:"5%",
                        alignItems:"center",justifyContent:"center",
                    }}>
                        <Image style={{resizeMode:"contain",width:"100%",height:"100%",backgroundColor:"transparent"}} source={require("./images/logo4.png")}/>
                    </View>
                </View>


                    <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center",borderTopRightRadius:40,borderTopLeftRadius:40}}>


                    <View style={{width:"75%",height:"58%",backgroundColor:"white",bottom:"15%",marginTop:20,
                        borderRadius:20,
                        alignItems:"center",
                        shadowColor: "#2DBDBD92",
                        shadowOffset: {
                            width: 5,
                            height: 5,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,
                        elevation: 15,
                    }}>
                        <View
                            onPress={async ()=>{

                            }}
                            style={{width:"90%",height:"100%",
                                // bottom:"10%",
                                alignItems:"center",justifyContent:"center",
                                //paddingBottom:10
                                // bottom:10
                            }}>
                            {this.props?.encours&&
                            <View style={{width:"60%",height:"50%",marginBottom:20,}}>
                                <Image style={{resizeMode:"contain",width:"110%",height:"110%",marginBottom:20,position:"absolute",top:"-5%",left:"-5%",opacity:0.8}} source={require("./images/gif/bgScanner.png")}/>


                                <Image style={{resizeMode:"contain",width:"70%",height:"70%",marginBottom:20,top:"15%",left:"15%",opacity:0.6}} source={require("./images/gif/loader1.gif")}/>
                            </View>
                            }


                            {!this.props?.encours&&!this.props.readMode&&
                            <View style={{width:"60%",height:"50%",marginBottom:20,}}>

                                <Image style={{resizeMode:"contain",width:"110%",height:"110%",marginBottom:20,position:"absolute",top:"-5%",left:"-5%",opacity:0.8}} source={this.props?.statutType?require("./images/ico-check.png"):require("./images/icon-eror.png")}/>

                            </View>
                            }
                            {!this.props?.encours&&this.props.readMode&&
                            <ScrollView style={{width:"100%",height:this.props.readMode?"80%":"100%",marginBottom:this.props.readMode?"-6%":20,marginTop:20,backgroundColor:"white"}}>
                                {
                                    Object.keys(this.props.reponse.data).map(x => {return (
                                        <View style={{backgroundColor:"transparent",flexDirection:"row",borderBottomWidth:1,borderColor:"#2DBDBD30",padding:5,justifyContent:"center"}}>
                                        <Text style={{width:"40%",color:"black",backgroundColor:"transparent",padding:5,height:50}} > { x}</Text>
                                        <Text style={{flex:1,color:"black",height:50}} > {this.props.reponse.data[x]}</Text>
                                        </View>
                                    )})
                                }


                            </ScrollView>
                            }


                            <Text style={{color:"#051F58",fontSize:18,fontWeight:"bold",marginBottom:15,textAlign:"center"}}>{this.props?.encours?"en cours ...":this.props?.readMode?"":this.props?.statut}</Text>
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

                        <View style={{width:"100%",height:130,justifyContent:"space-around",alignItems:"center",marginTop:25}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    if(this.props.readMode){
                                        this.props.rep(1)
                                    }else{
                                        this.props.annuler()
                                    }

                                }}
                                style={{width:"100%",height:50,borderWidth:2,borderRadius:30,borderColor:"#2DBDBD",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                                <Text style={{flex:1,marginLeft:25,fontSize:17,fontWeight:"bold",color:"#2DBDBD",textAlign:"center"}}>{this.props.readMode?"Confirmer":"Rescanner"}</Text>
                                <View style={{height:"100%",aspectRatio:1,justifyContent:"center",alignItems:"center"}}>
                                    <Image source={this.props.readMode?require('./images/verif.png'):require('./images/rescanner.png')} style={{resizeMode:"contain",width:"100%"}}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    if(this.props.readMode){
                                        this.props.rep(0)
                                    }else{
                                        BackHandler.exitApp();
                                    }

                                }}
                                style={{width:"100%",height:50,borderWidth:3,borderRadius:30,backgroundColor:"#2DBDBD",borderColor:"#2DBDBD",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                                <Text style={{flex:1,marginLeft:25,fontSize:17,fontWeight:"bold",color:"white",textAlign:"center"}}>{this.props.readMode?"Annuler":"Fermer"}</Text>
                                <View style={{height:"90%",aspectRatio:1,justifyContent:"center",alignItems:"center"}}>
                                    <Image source={require('./images/fermer.png')} style={{resizeMode:"contain",width:"70%"}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>



                        <View style={{width:"100%",position:"absolute",bottom:15,left:0,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"black",fontSize:12}}>Copyright © 2022 SensThings</Text>
                    </View>
                    </View>



                </View>





            </View>

        )
    }


}

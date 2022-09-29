import {Text, TouchableOpacity, View, Image, ScrollView, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';


import Toast from 'react-native-simple-toast';

Text.defaultProps = {
    ...(Text.defaultProps || {}),
    allowFontScaling: false,
};

export default class StatutAlert1 extends Component {
    componentDidMount(): void {
       // console.log("==> ",this.props?.img)
        console.log("*********************** ")
    }

    render() {
        return(
            <View style={{
                backgroundColor:'#000000AA',
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                zIndex:9999
            }}>



                <View style={{
                    backgroundColor: '#FFFFFF', width: "90%", left: '5%', flex: 1, justifyContent: 'center',
                    alignItems: 'center', zIndex: 707, position: 'absolute', borderRadius: 15,padding:20
                }}>

                    <View style={{flex:1, width:'100%'}}>
                        <View style={{flexDirection:"row", alignItems:'center'}}>
                            <Image style={{height:30,width:30,resizeMode:"contain"}} source={require("./images/scanner.png")}/>
                            <Text style={{
                                fontSize: 18,
                                alignItems: 'center',
                                color: '#4F4F4F',
                                marginLeft:10
                            }}>Smart Scanner</Text>
                        </View>
                        <View style={{backgroundColor: "rgb(213, 212, 221)", height: 1, marginTop:10}}/>
                    </View>
                    <View style={{flex:1,flexDirection:"row",width:"100%",}}>

                        <View style={{left:0,alignItems:"center",flex:1,justifyContent:"center",
                            paddingBottom:10}}>
                            <View>
                            <Text style={{
                                fontSize: 20,
                                color: '#4F4F4F',
                                marginTop: 20,
                                //marginLeft:25,
                                textAlign:"left",
                                width:"100%"
                            }}>Informations</Text>
                            </View>

                            <View style={{width:"100%",marginTop: 10,height:180}}>
                                <Image style={{left:"5%",height:180,width:"90%",resizeMode:"contain",backgroundColor:"black"}} source={{uri:this.props?.img??require("./images/scanner.png")}}/>
                            </View>
                            {this.props?.encours &&
                            <View style={{
                                width: "100%",
                                marginTop: 5,
                                height: 90,
                                justifyContent:"center",alignItems:"center",
                                overflow: "hidden"
                            }}>

                                <ActivityIndicator size="large" color="#00ff00"/>

                            </View>
                            }
                            {!this.props?.encours &&
                            <View style={{
                                width: "100%",
                                marginTop: 5,
                                height: 80,
                                backgroundColor: "black",
                                overflow: "hidden"
                            }}>
                                <ScrollView style={{height: "100%", backgroundColor: "white", paddingRight: 5}}>


                                    <Text style={{color: "black", fontSize: 19,fontWeight:"bold",
                                       textAlign: 'center',
                                    }}><Image style={{
                                        height: 25,
                                        width: 25,
                                        margin: 5,
                                        resizeMode: "contain",
                                        marginTop: 10,
                                        overflow: "hidden",


                                    }} source={this.props.statutType?require("./images/sucessScan.png"):require("./images/icon2.png")}/> {this.props?.statut} </Text>
                                </ScrollView>
                            </View>
                            }



                       {/*     <View style={{width:"100%",left:5,marginTop: 10,}}>
                                <Text style={{
                                    fontSize: 17,
                                    color: '#4F4F4F',


                                    textAlign:"left",
                                    width:"100%"
                                }}>{"Tag ID : "+this.props?.tagID}</Text>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#4F4F4F',

                                    textAlign:"left",
                                    width:"100%"
                                }}>{"Position: {lat:"+this.props?.position?.latitude+", Lng : "+this.props?.position?.longitude}}</Text>

                                <Text style={{
                                    fontSize: 16,
                                    color: '#4F4F4F',

                                    textAlign:"left",
                                    width:"100%"
                                }}>{"Data: "+JSON.stringify(this.props.nfcData.map(x => x.text))}</Text>


                            </View>*/}






                        </View>

                    </View>
                    {/*<View style={{width:"100%",left:5,marginTop: 0,backgroundColor:"",justifyContent:"center",alignItems:"center"}}>
                        <Image source={{uri:this.props?.img??require("./images/id.png")}} style={{resizeMode:"contain",width:"50%",height:130}}/>
                    </View>*/}




                    <View style={{
                        flexDirection: 'row', height: 42,  justifyContent: 'flex-end',
                        width:"100%",

                    }}>

                        <TouchableOpacity style={{
                            backgroundColor: this.props?.encours?"rgba(53, 73, 73,0.2)":"#1875ba",
                            borderRadius: 15,
                            shadowColor: "rgba(172, 183, 194, 0.2)",
                            shadowRadius: 30,
                            shadowOpacity: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 10,
                            paddingLeft:30,
                            paddingRight:30,
                            marginLeft:10,
                        }}
                                          onPress={()=> {
                                              if(this.props?.encours){
                                                  Toast.show("En cours de traitement ...")
                                              }else{
                                                  this.props.annuler()
                                              }

                                          }}>

                            <Text style={{
                                fontSize: 17, fontWeight: 'bold', alignItems: 'center', textAlign: 'center', color: '#FFFFFF',

                            }}>Valider</Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </View>

        )
    }


}

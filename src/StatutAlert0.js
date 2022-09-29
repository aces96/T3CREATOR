import {Text, TouchableOpacity, View, Image} from 'react-native';
import React, {Component} from 'react';


export default class StatutAlert0 extends Component {


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
                    alignItems: 'center', zIndex: 707, position: 'absolute',  borderRadius: 15,padding:20
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
                        <View style={{height:"100%",backgroundColor:"white",justifyContent:"center",alignItems:"center",paddingRight:5}}>

                        <Image style={{height:45,width:45,resizeMode:"contain",marginTop:10}} source={require("./images/failedScan.png")}/>
                        </View>
                        <View style={{left:0,alignItems:"center",flex:1,justifyContent:"center",
                            paddingBottom:20}}>
                            <Text style={{
                                fontSize: 20,
                                color: '#4F4F4F',
                                marginTop: 30,
                                marginLeft:25,
                                textAlign:"left",
                                width:"100%"
                            }}>Verification échoué</Text>

                        </View>

                    </View>




                    <View style={{
                        flexDirection: 'row', height: 42,  justifyContent: 'flex-end',
                        width:"100%",marginTop:15

                    }}>

                        <TouchableOpacity style={{
                            backgroundColor: "rgb(53, 73, 194)",
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
                                          onPress={()=> {this.props.annuler()}}>

                            <Text style={{
                                fontSize: 17, fontWeight: 'bold', alignItems: 'center', textAlign: 'center', color: '#FFFFFF',

                            }}>Réessayer</Text>
                        </TouchableOpacity>


                    </View>

                </View>
            </View>

        )
    }


}

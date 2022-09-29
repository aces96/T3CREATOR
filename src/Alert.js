import {Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import React, {Component} from 'react';
import {images_64} from './images/LocalData';

export default class Alert extends Component {
    constructor() {
        super()
        this.state = {
            text:'',
            alert:'',
        }
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
                    alignItems: 'center', zIndex: 707, position: 'absolute', top: '30%', borderRadius: 15,padding:20
                }}>

                    <View style={{flex:1, width:'100%'}}>
                        <View style={{flexDirection:"row", alignItems:'center'}}>
                            <Image style={{height:40,width:40}} source={require("./images/id.png")}/>
                            <Text style={{
                                fontSize: 18,
                                alignItems: 'center',
                                color: '#4F4F4F',
                                marginLeft:10
                            }}>Nouveau ID</Text>
                        </View>
                        <View style={{backgroundColor: "rgb(213, 212, 221)", height: 1, marginTop:10}}/>
                    </View>

                    <Text style={{
                        fontSize: 16,
                        color: '#4F4F4F',
                        marginTop: 10,
                        marginLeft:10,

                        textAlign:"left",
                        width:"100%"
                    }}>Entrer votre ID</Text>

                    {this.state.alert!='' &&
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        alignItems: 'center',
                        color: '#4F4F4F',
                        marginTop: 10,
                    }}>{this.state.alert}</Text>
                    }

                    <TextInput
                        style={{
                            height: 45, width: '95%', borderColor: '#BFBFC6', borderWidth: 1.5,
                            borderRadius: 10, marginBottom:30, padding: 10, fontSize: 16,
                            backgroundColor: 'white', color: 'black', marginLeft: 20, marginRight: 20,
                            marginTop:15
                        }}
                        onChangeText={(text) => {
                            this.setState({text: text})
                        }}
                        value={this.state.text}
                        placeholder="Entrer votre ID"

                    />
                    <View style={{
                        flexDirection: 'row', height: 42, width: '95%', justifyContent: 'space-around',

                    }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            backgroundColor: "#ACA9BB",
                            borderRadius: 15,
                            shadowColor: "rgba(172, 183, 194, 0.2)",
                            shadowRadius: 30,
                            shadowOpacity: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            marginRight:10
                        }}
                                          onPress={()=> {this.props.annuler()}}
                        >
                            <Text style={{
                                fontSize: 17, fontWeight: 'bold', alignItems: 'center', textAlign: 'center', color: '#FFFFFF',
                            }}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: "rgb(53, 73, 194)",
                            borderRadius: 15,
                            shadowColor: "rgba(172, 183, 194, 0.2)",
                            shadowRadius: 30,
                            shadowOpacity: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            flex:1,
                            marginLeft:10
                        }}
                                          onPress={()=> {
                                              let data=images_64.filter(x =>{return x.name==this.state.text})
                                              if(data.length==0) {
                                                  this.setState({alert: "ID invalide"})
                                              }
                                              else {
                                                  //console.log("data filter : ",data)
                                                    this.props.valider(data[0])
                                                  this.setState({alert: ""})
                                              }
                                          }}>

                            <Text style={{
                                fontSize: 17, fontWeight: 'bold', alignItems: 'center', textAlign: 'center', color: '#FFFFFF',
                            }}>Enregistrer</Text>
                        </TouchableOpacity>


                    </View>


                </View>
            </View>

        )
    }


}

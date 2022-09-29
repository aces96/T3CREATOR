'use strict';
import React, {Component} from 'react';

import {
    Alert,
    AppRegistry,
    AsyncStorage,
    BackHandler,
    Button,
    Dimensions,
    FlatList,
    Image, ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    View,Keyboard
} from 'react-native';


var items=[{ label: "JavaScript", value: "JavaScript" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "Python", value: "Python" },
    { label: "Java", value: "Java" },
    { label: "C++", value: "C++" },
    { label: "C", value: "C" },
]

export default class Selecter extends Component {
    constructor() {
        super();
        this.state = {
            net:true,
            rate_val:0,
            comment:""
        };

    }



    componentDidMount() {
    }



    render() {


        return (
            <View style={{height:"100%",width:"100%",position:"absolute",backgroundColor:"rgba(100,100,100,0.5)",zIndex:2}}>

                <TouchableOpacity onPress={()=>{this.props.fermer()}} style={{flex:1,backgroundColor:"transparent",zIndex:2}}>


                </TouchableOpacity>
                <View style={{height:"40%",justifyContent:"flex-end"}}>
                    <TouchableOpacity onPress={()=>{this.props.fermer()}} style={{flex:1,backgroundColor:"transparent",zIndex:2}}>


                    </TouchableOpacity>
                    <View style={{backgroundColor:"white",zIndex:2,borderTopRightRadius:20,borderTopLeftRadius:20,overflow:'hidden'}}>
                        <View style={{position:"absolute",height:60,width:"100%",backgroundColor:"#2DBDBD",justifyContent:"center"}}>
                            <Text style={{fontSize:19,color:"white",padding:10,paddingLeft:20}}>{this.props.title}</Text>

                        </View>
                        <ScrollView style={{marginTop:70,width:"100%",backgroundColor:"white"}}>
                            <FlatList
                                //style={{marginTop: 1,backgroundColor:"white"}}
                                data={this.props.items}
                                keyExtractor={(item) => item.index}
                                renderItem={(data) => {
                                    return (
                                        <View
                                            elevation={0}
                                            style={{
                                                //height: 65,
                                                width: '90%',
                                                alignItems: 'flex-start',
                                                borderRadius: 6,
                                                marginTop: 1,
                                                // borderWidth:5,

                                            }}>
                                            <View style={{borderBottomWidth:.5,borderColor:"#D3DDF2",width:"100%"}}>
                                                <TouchableOpacity style={{left:15,backgroundColor:"transparent",width:"100%"}}  onPress={()=>{this.props.onSelect(data.item.value,data.item.label);this.props.fermer()}}>
                                                    <Text style={{padding:15,fontSize:17,marginLeft:20,color:"black"}}>{data.item.label}</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    );
                                }}
                            />

                        </ScrollView>



                    </View>

                </View>
            </View>
        );
    }
}


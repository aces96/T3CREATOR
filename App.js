import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  BackHandler, StatusBar, Dimensions,
} from 'react-native';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import Geolocation from 'react-native-geolocation-service';

// Pre-step, call this before any NFC operations

const ratios=["1:1", "3:2", "4:3", "11:9", "16:9", "20:9"]

import Toast from 'react-native-simple-toast';

import {RNCamera} from 'react-native-camera';
import Alert from './src/Alert';
import StatutAlert1 from './src/StatutAlert1';
import StatutAlert0 from './src/StatutAlert0';
import NFCScan from './src/NFCScan';
import SplashScreen from './src/SplashScreen';
import {CheckAuth, Valider} from './src/CheckAuth';
import Login from './src/Login';
const IMEI = require('react-native-imei');

console.disableYellowBox = true;
var nfcListener;

import DeviceInfo from 'react-native-device-info';

import NetInfo from "@react-native-community/netinfo";

import CryptoJS from "react-native-crypto-js";
import {readToken} from './src/storage';
import Resultat from './src/Resultat';
import ImagePicker from 'react-native-image-crop-picker';

const secretKey="Sens2022Things"

//FIXER L'ORIENTATION DE L'APPLICATION

export default class App extends Component {

  constructor(){
    super()

    this.state = {

      show_popup:false,
      id:'',
      show_staut1:false,
      show_staut0:false,
      score:0,
      now:false,
      front:false,
      imageSrc:'',
      imageSrcqr:'',
      disableCamera:false,
      step:2,
      nfcEnabled:true,
      permissions:false,
      tagID:'',
      position:{},
      nfcData:[],
      statut:'',
      encours:false,
      statutType:0,
      colorqr:"white",
      uuid:DeviceInfo.getUniqueId(),
      connected:true,
      waitConfirmation:false,
      loader:false,
      etat:0, // 0 : search for reading; 1 : ecriture en cours ; 2 : Ecriture Terminée
      token:"",
      readMode:false,
      reponse:{},
      image: '',
      croppedImage: '',
      croppedBarcode: '',
      type: 'Diplome'

    }
  }

  async componentDidMount(){

    //let c=this.crypt("6C30EC78")
    //this.decrypt(c)
    //this.CheckConnection()

    let token=await readToken()

    if(token!=null){
      this.setState({step:1})
      this.requestPermission()
    }


    console.log("Token is ",token)
    console.log("Token is organisation IS",token?.userData?.organizationId)
    this.setState({token})


    console.log("UUID : ",DeviceInfo.getUniqueId())
  }

  async CheckConnection(){
    var connected=true;
    await NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      connected=state.isConnected
    });
    this.setState({connected})
    return connected
  }


  crypt(txt){
    // Encrypt
    let ciphertext = CryptoJS.AES.encrypt(txt, secretKey).toString();
    console.log("Crypted Text : ",ciphertext)
    return ciphertext
  }

  decrypt(txt){
    // Decrypt
    let bytes  = CryptoJS.AES.decrypt(txt, secretKey);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("Decrypted text ",originalText); // 'my message'
    return originalText
  }

  PrepareRatio= async () => {
    const ratios = await this.camera.getSupportedRatiosAsync();
    console.log("ratios : ",ratios)
  }

  async nfcVerification(){
    let nfcEnabled=await NfcManager.isEnabled()
    console.log("=======> NFC Enabled : ",nfcEnabled)
    this.setState({nfcEnabled})

    if(!nfcEnabled) {
      nfcListener=setInterval(()=>this.waitNfc(),3000)
    }
    else{


      this.readNdef();
    }
  }
  async waitNfc(){
    let self=this
    console.log("Waiting")
    let nfcEnabled=await NfcManager.isEnabled()
    if(nfcEnabled){
      clearInterval(nfcListener)
      NfcManager.start();
      self.setState({nfcEnabled})
      self.readNdef();
    }else{
      Toast.show("Activer NFC")
    }
  }
  componentWillUnmount() {

    clearInterval(nfcListener)
  }

  requestPermission = async () => {

    try {
      const granted = await PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE

          ],
      );
      console.log("=========>",granted)

      let res=Object.values(granted)


      if(res.every(x => x=='granted'))
      {
        this.setState({permissions:true})
        Toast.show("Permissions vérifiées")

        this.nfcVerification()
        return true
      }
      else if(res.includes("never_ask_again")){
        this.setState({permissions:false})
        Toast.show("Permissions non assurées")
        return false
      }else{
        Toast.show("- Permissions non assurées -")
        setTimeout(this.requestPermission,2000)
      }


    } catch (err) {
      console.warn(err);
    }
  };

  cropper =  ()=>{
    ImagePicker.openCropper({
        path: this.state.image.uri,
        freeStyleCropEnabled: true,
        enableRotationGesture: true,
        compressImageQuality: 1,
        includeBase64: true,
        cropperToolbarTitle	: `Crop the ${this.state.type}`,
        cropperActiveWidgetColor: '#2DBDBD'
    }).then((image)=>{


        if(this.state.type === 'Diplome'){
            this.setState({croppedImage: image})

            this.setState({step: 3})
            console.log(this.state.step);
        }else if(this.state.type === 'Datamatrix'){
            this.setState({croppedBarcode: image})
            this.setState({step: 3})
            // navigation.navigate('barcodeView')
        }

    }).catch((err)=>{
        if(this.state.type === 'Diplome'){
            this.setState({step: 2})

        }else if(this.state.type === 'Datamatrix'){
            navigation.navigate('barcodeScanner')
        }
    })
}

  annuler = ()=>{
    if(this.state.type === 'Diplome'){
      this.setState({step: 2})
    }else {
      this.setState({step: 4})
    }
  }

  confimer = ()=>{
    if (this.state.type === 'Diplome') {
      this.setState({step: 4})
      
    } else if(this.state.type === 'Datamatrix'){
      this.setState({step: 5})
      this.setState({show_staut1: true})
    }
  }



  async take_picture() {
    this.setState({statutType:false})

    this.setState({colorqr:"white"})



    if (this.camera) {
      if(this.state.step==2){
        const options = { quality: 1,pauseAfterCapture:true, base64: true };
        const data = await this.camera.takePictureAsync(options);
        let base64_img="data:image/jpg;base64,"+data.base64
        this.setState({imageSrc:base64_img})
        this.setState({image: data})
        this.cropper()
        Toast.show("image capturée ...")
      }
      if(this.state.step==4){

        const options = { quality: 1, base64: true,pauseAfterCapture:true };
        const data = await this.camera.takePictureAsync(options);
        let base64_img=""+data.base64

        //console.log("-----------------------0------------------------")
        //console.log("Base 64",base64_img)
        //console.log("------------------------1-----------------------")
        this.setState({imageSrcqr:base64_img})
        this.setState({colorqr:"white"})
        this.setState({image: data})
        this.setState({type: 'Datamatrix'})
        this.cropper()

        Toast.show("image capturée ...")


        //console.log("image capturée ...2 ")

      }


      //await CheckFaceRecoService(this,base64_img,this.state.id.img)

      //this.camera.resumePreview()
      //this.camera.pausePreview()
      //this.setState({disableCamera:true})

      //this.getPosition()

    }
  }

  setStatut(statut){

    this.setState({statutType:statut.code==1})
    /*
    if(statut?.length>0 && (statut[0]==0 || statut[0]==1)){
      this.setState({statutType:statut[0]==1})
      statut=statut.slice(1)

    }

     */

    this.setState({encours:false})

    console.log("=================> ",statut)
    console.log("=================> ",statut.data)
    this.setState({reponse:statut})
    this.setState({readMode:true})
  }
  setStatut1(statut){
    if(statut?.length>0 && (statut[0]==0 || statut[0]==1)){
      this.setState({statutType:statut[0]==1})
      statut=statut.slice(1)

    }
    this.setState({statut})
    this.setState({encours:false})
    this.setState({readMode:false})
  }

  async getPosition() {
    this.setState({front:false})
    this.setState({encours:true})
    this.setState({colorqr:"white"})

    let c=await this.CheckConnection()
    if(!c){
      Toast.show("Vérifier l'état de votre connexion réseau")
      this.setState({step:0})
      return
    }

    this.setState({loader:true})

    this.setState({show_staut1:true})
    this.setState({encours:true})

    Geolocation.getCurrentPosition(
        (position) => {
          console.log("position ",position);
          console.log("position coords",position.coords);
          this.setState({show_staut1:true})
          this.setState({position:position.coords})



          CheckAuth(this.state.tagID,this.state.position,this.state.imageSrc,this.state.nfcData,this.state.uuid,this.state.imageSrcqr,this.state.token?.userData?.organizationId,this)
        },
        (error) => {
          // See error code charts below.
         // console.log("Position gps ")
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

  }
  decodeNdefRecord(record) {
    if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
      console.log("===========> *", ['text', Ndef.text.decodePayload(record.payload)])
      return ['text', Ndef.text.decodePayload(record.payload)];
    } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
      console.log("===========> ", ['uri', Ndef.uri.decodePayload(record.payload)])
      return ['uri', Ndef.uri.decodePayload(record.payload)];
    }else{
      console.log("=======*******==========>")
    }

    return ['unknown', '---']
  }
  TagDiscovered (tag) {
    console.log('Tag Discovered', tag);
    this.setState({ tag });

    let parsed = null;
    if (tag.ndefMessage && tag.ndefMessage.length > 0) {
      // ndefMessage is actually an array of NdefRecords,
      // and we can iterate through each NdefRecord, decode its payload
      // according to its TNF & type
      const ndefRecords = tag.ndefMessage;


      parsed = ndefRecords.map(this.decodeNdefRecord());
      console.log(" ********** PARSED array ********** ",ndefRecords)
      try{
        console.log(" ********** 1 ********** ",Ndef.isType(ndefRecords[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT))
      }catch (e) {
        console.log("Erreur ",e)
      }

      console.log(" ********** 2 ********** ",Ndef.isType(ndefRecords[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI))




    }
    console.log(" ********** PARSED ********** ",parsed)

    this.setState({parsed});
  }


  async parseNDEF(tag){

    let parsed = [];
    if (tag.ndefMessage && tag.ndefMessage.length > 0) {
      // ndefMessage is actually an array of NdefRecords,
      // and we can iterate through each NdefRecord, decode its payload
      // according to its TNF & type
      const ndefRecords = tag.ndefMessage;


      // parsed = ndefRecords.map(this.decodeNdefRecord());
      console.log(" ********** PARSED array ********** ",ndefRecords)

      console.log(" ********** PARSED array ********** ",ndefRecords)
      try{
        console.log(" ********** 1 ********** ",Ndef.isType(ndefRecords[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT))
      }catch (e) {
        console.log("Erreur ",e)
      }

      console.log(" ********** 2 ********** ",Ndef.isType(ndefRecords[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI))

      console.log(" ********** 3 ********** ",Ndef.text.decodePayload(ndefRecords[0].payload))


      for(let i=0;i<ndefRecords.length;i++){

        let text=null;
        let type=null;
        if(Ndef.isType(ndefRecords[i], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)){type="text";text=Ndef.text.decodePayload(ndefRecords[i].payload)}
        else if(Ndef.isType(ndefRecords[i], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)){type="uri";text=Ndef.uri.decodePayload(ndefRecords[i].payload)}

        if(text && text!=null){
          parsed.push({text:text,type:type})
        }

        console.log("****===> ",ndefRecords.length)

      }


    }
    console.log(" ********** DATA PARSED ********** ",parsed)

    this.setState({nfcData:parsed})

  }

  async  readNdef() {

    console.log("NFC :  Start Scan")
    Toast.show("Scan en cours")
    this.setState({nfcData:[]})

    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
      //console.log('Tag found ===> ', JSON.stringify(tag));
      //console.log('Tag found ===> ', tag.ndefMessage[0].payload );
      //console.log('Tag found ===> ', tag.ndefMessage[0].payload.toString());
      //console.log('Tag found ===> ', String.fromCharCode(tag.ndefMessage[0].payload));
      //this.TagDiscovered(tag)
      this.parseNDEF(tag)


        NfcManager.start

      this.setState({tagID:tag.id})

      Toast.show("Ecriture en cours")
      let w=await this.writeNfc(this.crypt(tag.id))
      if(w){
        Toast.show("écriture succés")
      }
      else{
        Toast.show("écriture échouée")
        await NfcManager.cancelTechnologyRequest();
        this.readNdef()
        return
      }


      this.setState({step:2})

      //this.setState({now:false});
    } catch (ex) {
      console.warn('Oops!', ex);

     !


      await NfcManager.cancelTechnologyRequest();
      await NfcManager.start();
      this.readNdef()


      // this.setState({now:false});

    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
      console.log("NFC :  Fin Scan")
      //this.setState({now:false});
      //this.setState({disableCamera:false})
    }
    console.log("NFC :  End")

    //this.setState({show_staut1:true})
  }

  rescanNFC() {
    this.setState({step:1})
    this.setState({now:false})
    this.readNdef()
  }

  async scan(){
    let pic=await this.take_picture()
    let nfc=await this.readNdef()
    let pos=await this.getPosition()

    console.log("**************")
    console.log("Pos : ",pos, " - ", " nfc : ",nfc , " - pic : ",pic )
    console.log("**************")
  }

  async writeNfc(txt){
    var stat=false
    //await NfcManager.requestTechnology([NfcTech.Ndef]);
    let bytes= Ndef.encodeMessage([Ndef.textRecord(txt)]);

    if (bytes) {
      await NfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
      Toast.show("Message écrit avec succès")
      stat=true
    }
    return stat
  }

  render() {
    return (

        <SafeAreaView style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
          <StatusBar
              animated={true}
              // backgroundColor="#2DBDBD"
              translucent backgroundColor="transparent"
          />

          <Image source={require("./src/images/bgg.png")} style={{position:"absolute",height:"100%",width:"100%"}} />

          { this.state.step==0 &&

          <Login
              login={async (token)=>{
                let v=await this.CheckConnection()
                console.log(" v ==> ",v)
                if(!v){Toast.show("Vérifier l'état de votre connexion réseau")}
                else {
                  this.setState({step:1});
                  this.setState({token})
                  this.requestPermission()
                }
              }}

          />
          }

        {this.state.step == 5 &&
            <View style={{top: 0, position: "absolute", width: "100%", height: "100%", zIndex: 100}}>
              <Resultat
                  statutType={this.state.statutType}
                  score={this.state.score}
                  img={this.state.imageSrc}
                  tagID={this.state.tagID}
                  position={this.state.position}
                  nfcData={this.state.nfcData}
                  statut={this.state.statut}
                  encours={this.state.encours}
                  readMode={this.state.readMode}
                  reponse={this.state.reponse}
                  //nfcData={this.state.nfcData}
                  annuler={() => {
                    this.setState({show_staut1: false})
                    this.rescanNFC()
                    this.setState({loader:false})
                  }}

                  rep={async (code)=>{await Valider(code,this.state.reponse,this)}}

              />
            </View>
            }
          
          {this.state.step === 3 &&
                <View style={{height: '100%'.height,width: Dimensions.get('window').width, backgroundColor: 'black'}}>
                        <View style={{height: '90%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                        style={{ aspectRatio: this.state.type == 'Diplome' ? this.state.croppedImage.cropRect.width / this.state.croppedImage.cropRect.height : this.state.croppedBarcode.cropRect.width / this.state.croppedBarcode.cropRect.height , width: Dimensions.get('window').width, height: undefined}}
                        source={{ uri: this.state.type == 'Diplome' ? this.state.croppedImage.path : this.state.croppedBarcode.path }}
                        resizeMode= 'contain'
                        />
                        </View>
            
                  <View style={{height: '10%', width:'100%',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10, backgroundColor: 'rgba(45,189,189,0.15)'}}>
                    <TouchableOpacity onPress={()=> this.annuler()} style={{width:"40%",height:50,borderWidth:3,borderRadius:30,backgroundColor:"white",borderColor:"#2DBDBD",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                        <Text style={{flex:1,marginLeft:25,fontSize:19,fontWeight:"bold",color:"#2DBDBD",textAlign:"center"}}>Cancel</Text>
                      {/* <View style={{height:"100%",aspectRatio:1,justifyContent:"center",alignItems:"center"}}>
                        <Image source={fermerIcon} style={{resizeMode:"contain",width:"100%"}}/>
                      </View> */}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={()=> this.confimer()}
                      style={{width:"40%",height:50,borderWidth:3,borderRadius:30,backgroundColor:"#2DBDBD",borderColor:"#2DBDBD",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                      <Text style={{flex:1,marginLeft:25,fontSize:19,fontWeight:"bold",color:"white",textAlign:"center"}}>Validate</Text>
                      {/* <View style={{height:"90%",aspectRatio:1,justifyContent:"center",alignItems:"center"}}>
                        <Image source={loginIcon} style={{resizeMode:"contain",width:"70%"}}/>
                      </View> */}
                    </TouchableOpacity>
                  </View>
            
                </View>
              }

          {this.state.step==1&&

          <NFCScan permissions={this.state.permissions} nfcEnabled={this.state.nfcEnabled} />


          }

          {(this.state.step==2 || this.state.step==4) &&

          <SafeAreaView style={{justifyContent:'center', width:"100%"}}>

            <View style={{height:"10%",width:"100%",justifyContent:"center",alignItems:"center"}}>

              <Text style={{color:"white",fontSize:22,textAlign:"center",fontWeight:"bold",marginTop:"5%"}}> {this.state.step==2?"Scanner le diplome":"Scanner la matrice de donnée"} </Text>

            </View>

            {this.state.disableCamera&&
            <View style={{height:"90%",width:"100%",backgroundColor:"black"}}>
              <Image source={{uri:this.state.step==2?this.state.imageSrc:this.state.imageSrcqr}} style={{width:"100%",height:"100%",resizeMode: "cover"}} />
            </View>

            }

          {!this.state.disableCamera&&
            <View style={{justifyContent:"center",alignItems:"center",width: "100%", height:"90%",borderTopLeftRadius:40,borderTopRightRadius:40,overflow:"hidden"}}>
              < RNCamera
                  ref={async ref => {
                    this.camera = ref;
                }}
                  onCameraReady={this.PrepareRatio}

                  autoFocusPointOfInterest={{x: 0.5, y: 0.5}}

                  onTap={(x,y)=>{console.log("----> ",x ," - ",y," ]")}}

                  focusDepth={1}
                  ratio={this.state.step==2?"4:3":"1:1"}

                  onBarCodeRead={(data)=>{
                    if(this.state.colorqr=="white" && this.state.step==4){
                      this.setState({colorqr:"#00ff00"})
                      Toast.show(""+data.data+"")
                      //this.take_picture()
                    }
                    console.log("==> qr readed ",data)
                    console.log("==> qr readed ",data.bounds.origin)

                  }}

                  autoFocus={RNCamera.Constants.AutoFocus.on}

                  captureAudio={false}

                  zoom={this.state.step==2?0:0.3}

                  flashMode={this.state.front?RNCamera.Constants.FlashMode.torch:RNCamera.Constants.FlashMode.off}

                  //type={this.state.front?RNCamera.Constants.Type.front:RNCamera.Constants.Type.back}
                  type={RNCamera.Constants.Type.back}


                  androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',

                  }}
                  style={{position:"absolute",top:0,left:0,width: "100%", height:"100%"}}
              >

                <View style={{width:20,height:20,backgroundColor:"white",top:671,left:433}}/>

              </RNCamera>

              {this.state.step==4&&
              <View style={{width:"90%",aspectRatio: 1,backgroundColor:"transparent",borderColor:"white",borderWidth:0,borderRadius:5}}>
                <View style={{top:0,left:0,position:"absolute",width:"30%",aspectRatio: 1,backgroundColor:"transparent",borderColor:this.state.colorqr,borderTopWidth:5,borderLeftWidth:5,borderRadius:5}}>

                </View>
                <View style={{bottom:0,left:0,position:"absolute",width:"30%",aspectRatio: 1,backgroundColor:"transparent",borderBottomWidth:5,borderLeftWidth:5,borderColor:this.state.colorqr,borderRadius:5}}>

                </View>
                <View style={{top:0,right:0,position:"absolute",width:"30%",aspectRatio: 1,backgroundColor:"transparent",borderColor:this.state.colorqr,borderTopWidth:5,borderRightWidth:5,borderRadius:5}}>

                </View><View style={{bottom:0,right:0,position:"absolute",width:"30%",aspectRatio: 1,backgroundColor:"transparent",borderColor:this.state.colorqr,borderBottomWidth:5,borderRightWidth:5,borderRadius:5}}>
              </View>
              </View>}
              {this.state.step==2&&
              <View style={{width:"90%",height:"75%",backgroundColor:"transparent",borderColor:"white",borderWidth:0,borderRadius:5,marginTop:"-15%"}}>
                <View style={{top:0,left:0,position:"absolute",width:"30%",aspectRatio: 1,backgroundColor:"transparent",borderColor:this.state.colorqr,borderTopWidth:5,borderLeftWidth:5,borderRadius:5}}>

                </View>
                <View style={{bottom:0,left:0,position:"absolute",width:"30%",aspectRatio: 1,backgroundColor:"transparent",borderBottomWidth:5,borderLeftWidth:5,borderColor:this.state.colorqr,borderRadius:5}}>

                </View>
                <View style={{top:0,right:0,position:"absolute",width:"30%",aspectRatio: 1,backgroundColor:"transparent",borderColor:this.state.colorqr,borderTopWidth:5,borderRightWidth:5,borderRadius:5}}>

                </View><View style={{bottom:0,right:0,position:"absolute",width:"30%",aspectRatio: 1,backgroundColor:"transparent",borderColor:this.state.colorqr,borderBottomWidth:5,borderRightWidth:5,borderRadius:5}}>

              </View>


              </View>}
            </View>

            }






            {this.state.show_staut0 &&
            <View style={{top: 0, position: "absolute", width: "100%", height: "100%", zIndex: 100}}>
              <StatutAlert0
                  score={this.state.score}
                  annuler={() => {
                    this.setState({show_staut0: false})
                  }}/>
            </View>
            }



            <View style={{flex:1,flexDirection:"row",justifyContent:"space-around",position:"absolute",width:"100%",bottom:0,backgroundColor:"rgba(170,170,170,0.3)",height:!this.state.show_staut1?90:0,alignItems:"center",overflow:"hidden"}}>

              {!this.state.now && !this.state.loader &&
              <TouchableOpacity
                  onPress={() => {
                    this.setState({front: !this.state.front})
                  }}
                  style={{
                    padding: 5,
                    backgroundColor: 'rgba(200,200,200,0.7)',
                    borderRadius: 70,
                    alignItems: "center",
                    width: 70,
                    height: 70,
                    justifyContent: "center"
                  }}>
                <Image
                    style={{width: "60%", height: "60%"}}
                    source={require('./src/images/flash.png')}
                />
              </TouchableOpacity>
              }


              {this.state.loader&&
              <ActivityIndicator size="large" color="#00ff00"/>
              }

            {this.state.now&& !this.state.loader &&
              <View style={{justifyContent:"space-around",alignItems:"center",flexDirection:"row",width:"100%"}}>


                <TouchableOpacity  onPress={() => {
                  this.setState({now:false})
                  this.setState({disableCamera:false})
                  this.camera.resumePreview()
                }}
                  style={{width:"40%",height:50,borderWidth:2,borderRadius:30,borderColor:"#2DBDBD",justifyContent:"center",alignItems:"center",flexDirection:"row"
                  ,backgroundColor:"white"
                }}>
                  <Text style={{flex:1,marginLeft:25,fontSize:17,fontWeight:"bold",color:"#2DBDBD",textAlign:"center"}}>Annuler</Text>
                  <View style={{height:"100%",aspectRatio:1,justifyContent:"center",alignItems:"center"}}>
                    <Image source={require('./src/images/fermer.png')} style={{resizeMode:"contain",width:"100%"}}/>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => {
                      if(this.state.step==2) {
                        this.setState({step:3})
                      }else if(this.state.step==3) {
                        this.getPosition()
                      }

                      this.setState({now:false})
                      this.setState({disableCamera:false})
                      this.camera.resumePreview()

                    }}
                    style={{width:"40%",height:50,borderWidth:3,borderRadius:30,backgroundColor:"#2DBDBD",borderColor:"#2DBDBD",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                  <Text style={{flex:1,marginLeft:25,fontSize:17,fontWeight:"bold",color:"white",textAlign:"center"}}>Confirmer</Text>
                  <View style={{height:"90%",aspectRatio:1,justifyContent:"center",alignItems:"center"}}>
                    <Image source={require('./src/images/Login/icon-right.png')} style={{resizeMode:"contain",width:"70%"}}/>
                  </View>
                </TouchableOpacity>

              </View>
              }


              {!this.state.now && !this.state.loader &&
              <TouchableOpacity
                  onPress={()=>{this.take_picture();}}
                  style={{width:"40%",height:50,borderWidth:3,borderRadius:30,backgroundColor:"#2DBDBD",borderColor:"#2DBDBD",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                <Text style={{flex:1,marginLeft:25,fontSize:17,fontWeight:"bold",color:"white",textAlign:"center"}}>Capturer</Text>
                <View style={{height:"90%",aspectRatio:1,justifyContent:"center",alignItems:"center"}}>
                  <Image source={require('./src/images/Login/icon-right.png')} style={{resizeMode:"contain",width:"70%"}}/>
                </View>
              </TouchableOpacity>
              }

            </View>
          </SafeAreaView>
          }

        </SafeAreaView>

        //       <TouchableOpacity style={{padding: 20, margin: 20, backgroundColor: "#050505"}} onPress={this.readNdef}>
        //         <Text>Scan a Tag</Text>
        // </TouchableOpacity>
        //
        // <TouchableOpacity style={{padding: 20, margin: 20, backgroundColor: "#050505"}} onPress={this.getPosition}>
        // <Text>Get Position</Text>
        // </TouchableOpacity>

    );
  }


}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


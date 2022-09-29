import {readToken, saveToken} from './storage';

const axios = require('axios').default;

const link="http://192.168.137.1/api/v1/createdip"
const link2="http://192.168.137.1/api/v1/validdip"

import Toast from 'react-native-simple-toast';

export const CheckAuth=  async function (metagid,position,image,nfcData,uuid,imageSrcqr,organizationId,self) {
    Toast.show("Verification en cours ...")
    console.log("Verification en cours ...")
    self.setState({now:false})
    self.setState({encours:true})

    let data={metagid: metagid,position:position,image:JSON.stringify(image.slice(22)),nfcData:nfcData,uuid:uuid,imageqr:imageSrcqr,organizationId:organizationId}
    await axios.post(link, data,{timeout:5000,validateStatus: function (status) {
            return status >= 200 && status < 300 || status==500
        }})
        .then(function (response) {
            try {

                //console.log("response ",response)
                //console.log("response.data ",response?.data)
               // let status=response.status
                if(response.status==500){
                    Toast.show("Une erreur est survenue, verifier votre connexion")
                    console.log("Connexion echouée 1 response?.data : 1")
                    self.setStatut1("Connexion échouée")
                    return
                }else{
                    self.setStatut(response?.data)
                    console.log("response?.data : ",response?.data)

                    console.log("type of response?.data : ",typeof response?.data)

                    console.log("response?.data  code : ",response?.data.code)
                    console.log("response?.data  Data : ",response?.data.data)
                    console.log("response?.data  Year : ",response?.data.data.Year)




                }
                /*
                let res = response.data
                let status=response.status
                if(status==500){
                    Toast.show("Auth not detected")
                    return
                }

                 */




                /*
                let x = /'/gi;
                let res2 = res.replace(x, '"')
                res2 = JSON.parse(res2)

                let score = res2.pair_1.similarity_percentage_score.toFixed(2);
                self.setState({score})
                if (score > 0.5) {
                    self.setState({show_staut1: true})
                } else {
                    self.setState({show_staut0: true})
                }

                 */
            }catch(Exception){
                console.log("erreur = ", Exception);
            }

        })
        .catch(function (error) {
            Toast.show("Une erreur est survenue, verifier votre connexion")
            self.setStatut1("Connexion échouée")
            //return
            console.log(error);
            console.log("erreur = ", error.toString());
           Toast.show("Une erreur est survenue, verifier votre connexion")
        })
        .then(function () {
            // always executed
        });
}

export const Auth=  async (email,password,self)=>
{
    var auth=false
    let link="http://app.sensthings.io/api/v1/ua/auth/login"
    //let data={"email":"ua@t3.com","password":"123"}
    let data={email:email,password:password}
    console.log("data recu : ",data)


     await axios.post(link, data,{timeout:5000,validateStatus: function (status) {
            return status >= 200 && status < 300 || status==500
        }})
        .then(async function (response) {
            try {

                //console.log("response ",response)
                //console.log("response.data ",response?.data)
                // let status=response.status
                if(response.status==500){
                    Toast.show("Une erreur est survenue, verifier votre connexion")
                    self.setStatut("Connexion échouée")
                    return auth
                }else{
                    let data=response?.data?.data
                    console.log("Data ",data)
                    auth=true
                    self.setState({token:response?.data?.data})
                    await saveToken(JSON.stringify(response?.data?.data))
                    return auth

                    //if(response?.data?.data?.accessToken?.length>0){}

                }

            }catch(Exception){
                console.log("erreur = ", Exception);
            }

        })
        .catch(function (error) {
            console.log("error", error)
            Toast.show("Une erreur est survenue, verifier votre connexion")

        })
        .then(function () {
            // always executed
        });
    return auth
}



export const Valider=  async function (code,data1,self) {
    Toast.show("Verification en cours ...")
    console.log("Verification en cours ...")
    self.setState({now:false})
    self.setState({encours:true})

    console.log("CODE à envoyer : ",code)
    let data={code:code,data:data1}
    await axios.post(link2, data,{timeout:5000,validateStatus: function (status) {
            return status >= 200 && status < 300 || status==500
        }})
        .then(function (response) {
            try {

                //console.log("response ",response)
                //console.log("response.data ",response?.data)
                // let status=response.status
                if(response.status==500){
                    Toast.show("Une erreur est survenue, verifier votre connexion")
                    self.setStatut("Connexion échouée")
                    return
                }else{
                    self.setStatut1(response?.data)
                    console.log("response?.data : ",response?.data)
                }

            }catch(Exception){
                console.log("erreur = ", Exception);
            }

        })
        .catch(function (error) {
            Toast.show("Une erreur est survenue, verifier votre connexion")
            self.setStatut("Connexion échouée")
            return
            console.log(error);
            console.log("erreur = ", error.toString());
            Toast.show("Une erreur est survenue, verifier votre connexion")
        })
        .then(function () {
            // always executed
        });
}

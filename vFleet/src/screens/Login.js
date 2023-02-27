import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View ,Button,TextInput,Image, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { errormessage } from '../common/formcss';

const login = ({navigation}) => {
  const [fdata, setFdata] =useState({
    email: '',
    password: ''
  })
  const [errormsg, setErrormsg] = useState(null);


  const Sendtobackend = () => {
    // console.log(fdata);
    if(fdata.email=="" || fdata.password =="") {
      setErrormsg("All fields are required");
      return;
    }
    else {
      fetch('http://10.0.2.2:3000/signin', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(fdata)
      })
        .then(res => res.json()).then(
          data => {
            // console.log(data);
            if(data.error) {
              setErrormsg(data.error);
            }
            else{
              alert('logged in successfully');
              navigation.navigate('homepage');
            }
          }
        )
    }




  }
  return (
     <View style={styles.container}>
        <Image style={{marginBottom:40, width:200,height:200}} source = {require("../../assets/logo1.png")}/>
        <Text style={{marginBottom:20,fontSize:22}}>Admin Portal</Text>

        {
          errormsg ? <Text style={errormessage}>{errormsg}</Text>:null
        }
  <View style={styles.inputView}>
  <TextInput style={styles.TextInput} placeholder="email"placeholderTextColor="#003f5c"
    
    onPressIn={() => setErrormsg(null)}
    onChangeText={(Text) => setFdata({ ...fdata, email: Text})}
  />
      </View>
      <View style={styles.inputView}>
  <TextInput style={styles.TextInput} placeholder="Password"placeholderTextColor="#003f5c" secureTextEntry={true}
      onPressIn={() => setErrormsg(null)}
      onChangeText={(Text) => setFdata({ ...fdata, password: Text})}
  />
      </View>
      <TouchableOpacity>
  <Text style={{height:30,marginBottom:30}}>Forgot Password?</Text>
</TouchableOpacity>
   <TouchableOpacity
   onPress={() => Sendtobackend()}
    style={styles.loginBtn}>
  <Text style={styles.loginText}>LOGIN</Text>
</TouchableOpacity>
</View>
  )
}

export default login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
   borderWidth:2,
   borderRadius: 30,
   width: "70%",
   height: 45,
   marginBottom: 20,
   alignItems: "center",
 },
  TextInput: {
   height: 50,
   flex: 1,
   padding: 10,
   marginLeft: 20,
 },
 loginBtn:
 {
   width:"80%",
   borderRadius:25,
   height:50,
   alignItems:"center",
   justifyContent:"center",
   marginTop:1,
   marginBottom:5,
   backgroundColor:"lightblue",
 }
});





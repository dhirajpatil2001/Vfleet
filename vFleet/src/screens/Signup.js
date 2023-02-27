import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import pattern from '../../assets/pattern.png'
import logo from '../../assets/logo1.png'
import { button1 } from '../common/button'
import { errormessage, formgroup, head1, head2, input, input1, label, link, link2 } from '../common/formcss'

const Signup = () => {

  const [fdata, setFdata] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [errormsg, setErrormsg] =useState(null);
  const Sendtobackend= () => {
    // console.log(fdata);
    if(fdata.username == '' ||
        fdata.email == '' ||
        fdata.password == '' ){
          setErrormsg('All fields required');
          return;
        }
        else{
          fetch('http://10.0.2.2.:3000/signup',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(fdata)
          })
            .then(res => res.json()).then(
              data => {
                // console.log(data);
                if(data.error){
                  setErrormsg(data.error);
                }
                else{
                  alert('account created successfully');
                  // navigation.navigate('login')
                }
              }
            )
        }

  }

  return (
     <View style={styles.container}>
        <Image style={{marginBottom:40, width:200,height:200}} source = {require("../../assets/logo1.png")}/>
        <Text style={{marginBottom:20,fontSize:22}}>signup</Text>
        {
          errormsg ? <Text style={errormessage}>{errormsg}</Text>:null
        }
  <View style={styles.inputView}>
  <TextInput style={styles.TextInput} placeholder="Username"placeholderTextColor="#003f5c"
    onPressIn={() => setErrormsg(null)}
    onChangeText={(text) => setFdata({ ...fdata, username: text})}
  />
      </View>
      <View style={styles.inputView}>
  <TextInput style={styles.TextInput} placeholder="email"placeholderTextColor="#003f5c"
    onPressIn={() => setErrormsg(null)}
    onChangeText={(text) => setFdata({ ...fdata, email: text})}
  />
      </View>
      <View style={styles.inputView}>
  <TextInput style={styles.TextInput} placeholder="Password"placeholderTextColor="#003f5c" secureTextEntry={true}
    onPressIn={() => setErrormsg(null)}
    onChangeText={(text) => setFdata({ ...fdata, password: text})}
  />
      </View>

      {/* <Text style={button1}
       onPress={() =>{
          Sendtobackend();
      }}
      >SIGNUP</Text> */}
      
      {/* <TouchableOpacity>
  <Text style={{height:30,marginBottom:30}}>Forgot Password?</Text>
</TouchableOpacity> */}
   <TouchableOpacity 
      onPress={() =>{
        Sendtobackend();
      }}
      style={styles.loginBtn}>
      <Text style={styles.loginText}
      
      >SIGNUP</Text>
</TouchableOpacity>
</View>
  )
}

export default Signup

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

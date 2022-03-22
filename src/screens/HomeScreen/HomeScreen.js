import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles';
import { firebase } from '../../firebase/config';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, addDoc, setDoc } from "firebase/firestore"; 

import { getFirestore } from "firebase/firestore"



export default function HomeScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const db = getFirestore(firebase);


    

  

    const onRegisterPress = () => {

        console.log('hello');
        const docRef = addDoc(collection(db, "test"), {
            name: fullName,
            email_address: email
            })
            console.log("Document written with ID: ", docRef.id);

    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image source={require('/Users/varunpatel/Desktop/blackboxapp/assets/Black-Box-Collective-White.png')} 
                style={styles.image}
                resizeMode='contain'/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Quote')}>
                    <Text style={styles.buttonTitle}>GO TO QUOTE PAGE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Local Plug Contact')}>
                    <Text style={styles.buttonTitle}>LOCAL PLUG</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Travel Planning')}>
                    <Text style={styles.buttonTitle}>TRAVEL PLANNING</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Quote')}>
                    <Text style={styles.buttonTitle}>OUR LINKS</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
            <View style={styles.copyrightField}>
                <Text style={styles.copyrightText}> {'\u00A9'} Black Box Collective 2022</Text>
            </View>
        </View>
    )
}
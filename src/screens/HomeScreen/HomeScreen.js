import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles';
import { firebase } from '../../firebase/config';
import 'firebase/compat/firestore';
import { collection, addDoc, setDoc } from "firebase/firestore"; 

import { getFirestore } from "firebase/firestore"
import { Linking } from 'react-native';





export default function HomeScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')
    const db = getFirestore(firebase);


    

  


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image source={require('../../../assets/Black-Box-Collective-White.png')}
                style={styles.image}
                resizeMode='contain'/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Quote')}>
                    <Text style={styles.buttonTitle}>GET A QUOTE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Local Plug Contact')}>
                    <Text style={styles.buttonTitle}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Travel Planning')}>
                    <Text style={styles.buttonTitle}>LOCAL PLUG</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Linking.openURL('https://discord.com/invite/r5W5tbgauF')}>
                    <Text style={styles.buttonTitle}>DISCORD</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Linking.openURL('https://linktr.ee/blackboxcollective')}>
                    <Text style={styles.buttonTitle}>OUR LINKS</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
            <View style={styles.copyrightField}>
                <Text style={styles.copyrightText}> Black Box Collective 2022</Text>
            </View>
        </View>
    )
}
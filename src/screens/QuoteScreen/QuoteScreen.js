import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, addDoc, setDoc } from "firebase/firestore"; 
import ValidationComponent from 'react-native-form-validator';
import { useValidation } from 'react-native-form-validator';
import {Picker} from '@react-native-picker/picker';

//import useScript from 'hooks/useScript';





import { getFirestore } from "firebase/firestore"
import { DeprecatedAccessibilityRoles } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewAccessibility';

export default function QuoteScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')

    const [depAirport, setdepAirPort] = useState('')
    const [phone, setPhone] = useState('')
    const [numPassengers, setnumPassengers] = useState('')
    const [retAirport, setretAirPort] = useState('')
    const [passWeight, setpassWeight] = useState('')
    const [bagWeight, setbagWeight] = useState('')
    const [extraInfo, setextraInfo] = useState('')
    const [retdate, setretDate] = useState('')
    const [depTime, setdepTime] = useState('')
    const [retTime, setretTime] = useState('')
    const [flightType, setflightType] = useState('')


    const db = getFirestore(firebase);


    // const airportnav = props => {
    //     useScript("https://cdn.jsdelivr.net/npm/airport-autocomplete-js@latest/dist/index.browser.min.js");
    // }



    const checkTextInput = () => {

        if (!fullName.trim()) {
            alert('Fill out all required fields before submitting');
            return false;
          }
        
        if (!email.trim()) {
            alert('Fill out all required fields before submitting');
            return false;
        }

        return true;
    }

    const { validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: { email, fullName, date},
      });


  

    const onRegisterPress = () => {

        if (validate({
            fullName: { minlength: 3, maxlength: 7, required: true },
            email: { email: true, required: true},
            date: { date: 'MM-DD-YYYY',required: true }}    
            ))
        {

        
        const docRef = addDoc(collection(db, "test"), {
            name: fullName,
            email_address: email
            })
            console.log("Document written with ID: ", docRef.id);
        navigation.navigate('Home');
        alert("Successfully submitted!");

        }
    }
        
    return ( 


        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {isFieldInError('fullName') &&
                    getErrorsInField('fullName').map(errorMessage => (
                    <Text>{errorMessage}</Text>
                    ))}
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {isFieldInError('email') &&
                    getErrorsInField('email').map(errorMessage => (
                    <Text>{errorMessage}</Text>
                    ))}
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='mm/dd/yyyy'
                    onChangeText={(text) => setDate(text)}
                    value={date}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {isFieldInError('date') &&
                    getErrorsInField('date').map(errorMessage => (
                    <Text>{errorMessage}</Text>
                    ))}
                <TextInput
                    id='airport'
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Airport'
                    onChangeText={(text) => setdepAirPort(text)}
                    value={depAirport}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Picker
                    selectedValue={flightType}
                    onValueChange={(itemValue, itemIndex) =>
                        setflightType(itemValue)
                    }>
                    <Picker.Item label="One Way" value="One Way" />
                    <Picker.Item label="Round Trip (Day Return)" value="Round Trip Day Return" />
                    <Picker.Item label="Round Trip (Stop Over)" value="Round Trip Stop Over" />
                </Picker>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>

    );
}


import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View,Platform, Button,Pressables, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';
import 'firebase/compat/firestore';
import { collection, addDoc, setDoc } from "firebase/firestore"; 
import ValidationComponent from 'react-native-form-validator';
import { useValidation } from 'react-native-form-validator';
//import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { getFirestore } from "firebase/firestore"
import RadioButtonRN from 'radio-buttons-react-native';
import CheckBox from '@react-native-community/checkbox';
import AddGuest from './addGuest';

export default function TravelPlanning({navigation}) {
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [bday, setBday] = useState(new Date())
    const [street, setStreet] = useState('')
    const [state, setState] = useState('')
    const [postal, setPostal] = useState('')

    //const [myText, setMyText] = useState("");

    const db = getFirestore(firebase);
    const [restaurants, setRestaurants] = useState(false);
    const [nightlife, setNightlife] = useState(false);
    const [lodging, setLodging] = useState(false);
    const [connections, setConnections] = useState(false);


    
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     myText=setMyText(bday.toDateString());
    //   }, [bday]);
    


    

    const onChangeGuest1Bday = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setBday(currentDate);
        setTimeout()
      };



    const { validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: { name},
      });

    const onTravelPlanningSubmitPress = () => {

        if (validate({
            name: { maxlength: 7, required: true },
            //date: { date: 'MM-DD-YYYY',required: true }}    
        }))
        {

        
        const docRef = addDoc(collection(db, "localPlugContact"), {
            first_name: name,
            time_created: new Date(),
            email_address: email,
            discord_address:discord,
            city_name:city,
            phone_number:phone,
            extra_info:addlInfo,
            some_restaurants:restaurants,
            some_lodging:lodging,
            some_connections:connections,
            some_nightlife:nightlife,
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
                    placeholderTextColor="#aaaaaa"
                    placeholder='Guest 1 Full Name'
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Street Address'
                    onChangeText={(text) => setStreet(text)}
                    value={street}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='City'
                    onChangeText={(text) => setCity(text)}
                    value={city}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='State'
                    onChangeText={(text) => setState(text)}
                    value={state}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='ZIP Code'
                    onChangeText={(text) => setPostal(text)}
                    value={postal}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {/* <Text onChange={useEffect(() => {
        // Update the document title using the browser API
        myText=setMyText(bday.toDateString());
      }, [bday])}>
                    {myText}
                </Text> */}
                <DateTimePicker
                style={styles.input}
                testID="Guest1BdayPicker"
                value={bday}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={() => onChangeGuest1Bday}
                />
                <AddGuest></AddGuest>
                

                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLocalPlugRegisterPress()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>

    );

}

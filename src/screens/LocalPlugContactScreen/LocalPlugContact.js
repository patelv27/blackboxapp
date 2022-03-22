import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View,Platform, Button,Pressables, Pressable } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles';
import { firebase } from '../../firebase/config';
import 'firebase/compat/firestore';
import { collection, addDoc, setDoc } from "firebase/firestore"; 
import ValidationComponent from 'react-native-form-validator';
import { useValidation } from 'react-native-form-validator';
//import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
//import DropDownPicker from 'react-native-dropdown-picker';
import { getFirestore } from "firebase/firestore"
import RadioButtonRN from 'radio-buttons-react-native';
import CheckBox from '@react-native-community/checkbox';

export default function LocalPlugContact({navigation}) {
    const [city, setCity] = useState('')
    //const [tripExtras,setTripExtras] = useState('')
    const [addlInfo,setaddlInfo] = useState('')
    const [phone,setPhone] = useState('')
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [discord,setDiscord] = useState('')


    const db = getFirestore(firebase);
    const [restaurants, setRestaurants] = useState(false);
    const [nightlife, setNightlife] = useState(false);
    const [lodging, setLodging] = useState(false);
    const [connections, setConnections] = useState(false);

    const { validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: { email, name,discord,city,phone, addlInfo,restaurants,nightlife,connections,lodging},
      });

    const onLocalPlugRegisterPress = () => {

        if (validate({
            name: { maxlength: 7, required: true },
            email: { email: true, required: true},
            discord: {required: true},
            phone: {required: true}     
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
                <Image source={require('/Users/varunpatel/Desktop/blackboxapp/assets/Black-Box-Collective-White.png')} 
                style={styles.image}
                resizeMode='contain'/>
               <Text style={styles.textField}>Full Name:</Text>
              
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Name'
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.textField}>City:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='City'
                    onChangeText={(text) => setCity(text)}
                    value={city}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.textField}>Discord:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Discord'
                    onChangeText={(text) => setDiscord(text)}
                    value={discord}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.selectContainer}>
                <Text style={styles.textField}>Select Benefits You Can Provide:</Text>
                    <TouchableOpacity
                            onPress={() => setRestaurants(!restaurants)}
                            style={[styles.button, { backgroundColor: restaurants ? "#D1BD78" : "transparent" }]}>
                            <Text style={styles.textFieldAlt}>Restaurants/Reservations</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                            onPress={() => setNightlife(!nightlife)}
                            style={[styles.button, { backgroundColor: nightlife ? "#D1BD78" : "transparent" }]}>
                            <Text style={styles.textFieldAlt}>Nightlife/Bottle Service</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                            onPress={() => setConnections(!connections)}
                            style={[styles.button, { backgroundColor: connections ? "#D1BD78": "transparent" }]}>
                            <Text style={styles.textFieldAlt}>Connections/Local Plugs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() => setLodging(!lodging)}
                            style={[styles.button, { backgroundColor: lodging ? "#D1BD78" : "transparent" }]}>
                            <Text style={styles.textFieldAlt}>Lodging/Shared Work Spaces</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textField}>Email:</Text>
                 <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Email'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.textField}>Phone:</Text>
                 <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Phone'
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.textField}>Extra Info:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Extra Info'
                    onChangeText={(text) => setaddlInfo(text)}
                    value={addlInfo}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLocalPlugRegisterPress()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>

    );

}

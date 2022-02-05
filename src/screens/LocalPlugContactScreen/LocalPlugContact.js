import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View,Platform, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';
import 'firebase/compat/firestore';
import { collection, addDoc, setDoc } from "firebase/firestore"; 
import ValidationComponent from 'react-native-form-validator';
import { useValidation } from 'react-native-form-validator';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { getFirestore } from "firebase/firestore"
import RadioButtonRN from 'radio-buttons-react-native';
import CheckBox from '@react-native-community/checkbox';

export default function LocalPlugContact({navigation}) {
    const [city, setCity] = useState('')
    const [tripExtras,setTripExtras] = useState('')
    const [addlInfo,setaddlInfo] = useState('')
    const [phone,setPhone] = useState('')
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [discord,setDiscord] = useState('')


    const [toggleCheckBox, setToggleCheckBox] = useState(false)


    const data = [
        {
          label: 'Restaurants/Reservations'
         },
         {
          label: 'Nightlife/Bottle Service'
         },
         {
            label: 'Connections/Local Plugs'
        },
        {
            label: 'Lodging/Shared Work Space'
        },
        {
            label: 'Other-please Note in Additional Info'
        },
        ];




    return ( 


        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
               
               <CheckBox
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
  />
              
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Name'
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <RadioButtonRN
                    data={data}
                    selectedBtn={(e) => console.log(e)}
                    />
                 <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Email'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                 <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Phone'
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
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
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>

    );

}

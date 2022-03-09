import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View,Platform, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles';
import { firebase } from '../../firebase/config';
import 'firebase/compat/firestore';
import { collection, addDoc, setDoc } from "firebase/firestore"; 
import ValidationComponent from 'react-native-form-validator';
import { useValidation } from 'react-native-form-validator';
import DateTimePicker from '@react-native-community/datetimepicker';
//import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from 'react-native-picker-select';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListItem } from 'native-base';
import { getDistance } from 'geolib';

import { getFirestore } from "firebase/firestore"



export default function DisplayQuote({route,navigation}) {
    const onHomePress = () => {
        navigation.navigate('Home');

    }


    return ( 


        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}>

            <Image source={require('/Users/varunpatel/Desktop/blackboxapp/assets/Black-Box-Collective.png')} 
                style={styles.image}
                resizeMode='contain'/>



            <Text style={styles.quoteText}>Your estimated flight quote is:</Text>
            <Text style={styles.quoteValue}>$ {Math.floor(route.params.high_estimate / 10) * 10}</Text>

            <Text style={styles.quoteText}>From: {route.params.depart_city}</Text>
            <Text style={styles.quoteText}>To: {route.params.arr_city}</Text>
            <Text style={styles.quoteText}>In a: {route.params.plane_type}</Text>
            <Text style={styles.quoteText}>On: {route.params.departure_Date}</Text>
            <Text style={styles.quoteText}>Returning On: {route.params.return_Date}</Text>

            <TouchableOpacity
                    style={styles.button}
                    onPress={() => onHomePress()}>
                    <Text style={styles.buttonTitle}>Home</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>

        </View>
    )
}


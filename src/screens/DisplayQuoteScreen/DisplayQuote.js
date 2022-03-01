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



            <Text style={styles.center}>Your quote range is between:</Text>
            <Text style={styles.center}>"High": {route.params.high_estimate}</Text>
            <Text style={styles.center}>"Low":{route.params.low_estimate}</Text>
            <Text style={styles.center}>"Approximate Distance" (km):{route.params.city_distance/1000}</Text>

            <TouchableOpacity
                    style={styles.button}
                    onPress={() => onHomePress()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>

        </View>
    )
}


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
import {GOOGLE_API_KEY} from "@env";
import {useTailwind} from 'tailwind-rn';




import { getFirestore } from "firebase/firestore"
//import env from 'react-native-dotenv';

export default function QuoteScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState(new Date())
    const [distance,setDistance] = useState(null)

    const [pets, setPets] = useState('')
    const [aircraftType, setAirCraftType] = useState('')
    const [depAirport, setdepAirPort] = useState('')
    const [phone, setPhone] = useState('')
    const [numPassengers, setnumPassengers] = useState('')
    const [retAirport, setretAirPort] = useState('')
    const [passWeight, setpassWeight] = useState('')
    const [bagWeight, setbagWeight] = useState('')
    const [extraInfo, setextraInfo] = useState('')
    const [retDate, setRetDate] = useState(new Date())
    

    const [depCity, setDepCity] = useState({lat:"", lng:""})
    useEffect(() => {
        console.log(depCity)
      }, [depCity])

    const [retCity, setRetCity] = useState({lat:"", lng:""})
    useEffect(() => {
        console.log(retCity)
      }, [retCity])
    const [reason, setReason] = useState('')
    const [flightType, setflightType] = useState('')

    const tailwind = useTailwind();
    //for datetimepicker:
    const [mode, setMode] = useState('datetime');
    const [show, setShow] = useState(false);

    const onChangeDepDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setTimeout()
      };

    const onChangeRetDate = (event, selectedDate) => {
    const currentDate = selectedDate || retDate;
    setShow(Platform.OS === 'ios');
    setRetDate(currentDate);
    setTimeout()
    };

    const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    };

    const showDepDatepicker = () => {
        showMode('datetime');
        };

    const showRetDatepicker = () => {
        showMode('datetime');
        };

    const db = getFirestore(firebase);


   



    const { validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: { email, fullName, date, phone, numPassengers, flightType, aircraftType, depCity, retCity,reason},
      });


    const high = (getDistance(depCity,retCity))/400000*4900;
    const low = (getDistance(depCity,retCity))/400000*3100;

    const onRegisterPress = () => {

        if (validate({
            fullName: { minlength: 3, maxlength: 7, required: true },
            email: { email: true, required: true},
            date: {required:true},
            retDate: {required:true},
            phone: {required:true},
            numPassengers: {required:true},
            flightType: {required:true},
            aircraftType: {required:true},
            depCity: {required:true},
            retCity: {required:true},
            

        }))
        {

        
        const docRef = addDoc(collection(db, "test"), {
            name: fullName,
            email_address: email,
            departure_date:date,
            phone_num:phone,
            departure_city:depCity,
            departure_date: date,
            flight_type:flightType,
            passenger_weight:passWeight,
            bag_weight:bagWeight,
            num_passengers:numPassengers,
            extra_info:extraInfo,
            return_date:retDate,
            arrival_city:retCity,
            aircraft_type:aircraftType,
            pet_info:pets,
            flight_reason:reason,
            })

        setDistance(getDistance(depCity,retCity))
            console.log("Document written with ID: ", docRef.id);
        navigation.navigate('DisplayQuote',{
            high_estimate: high,
            low_estimate: low,
            city_distance:distance
          });
        alert("Successfully submitted!");

        }
    }
        
    return ( 


        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}>
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
                    placeholder='Phone Number'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {isFieldInError('phone') &&
                    getErrorsInField('phpne').map(errorMessage => (
                    <Text>{errorMessage}</Text>
                    ))}
                <Text style={tailwind('text-yellow-200 text-lg left-8')}>Pick Departure Date and Time:</Text>
                <DateTimePicker
                style={styles.datetime}
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={() => onChangeDepDate}
                />
                <RNPickerSelect
                    placeholder={{ label: "Type of Aircraft", value: "Choose Item" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setAirCraftType(itemValue)}
                    items={[
                        { label:"Light Jet (Max 6 Passengers)", value:"Light Jet" },
                        { label:"Medium Jet (Max 8 Passengers)", value:"Medium Jet" },
                        { label: "Heavy Jet (Max 8 Pass", value: 'Heavy Jet' },
                    ]}
                />
                <RNPickerSelect
                    placeholder={{ label: "Purpose of Trip", value: "Choose Item" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setReason(itemValue)}
                    items={[
                        { label:"Pleasure", value:"Pleasure" },
                        { label:"Business", value:"Business" },
                        { label: "Bereavement", value: "Bereavement" },
                        { label: "Medical", value: "Medical" }
                    ]}
                />
                <RNPickerSelect
                    placeholder={{ label: "Number of Passengers", value: "0" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setnumPassengers(itemValue)}
                    items={[
                        { label:"1", value:"1" },
                        { label:"2", value:"2" },
                        { label: "3", value: "3" },
                        { label: "4", value: "4" },
                        { label: "5", value: "5" },
                        { label: "6", value: "6" },
                        { label: "7", value: "7" },
                        { label: "8", value: "8" }
                    ]}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Total Passenger Weight (lbs)'
                    onChangeText={(text) => setpassWeight(text)}
                    value={passWeight}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <SafeAreaView>
                <ListItem>
                <GooglePlacesAutocomplete
                value={depCity}
                styles={{
                    textInput: {
                        height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 15,
                        marginRight: 15,
                        paddingLeft: 16}
                  }}
                placeholder='Departure City'
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setDepCity((details?.geometry?.location));
                }}
                query={{
                    key: `${GOOGLE_API_KEY}`,
                    language: 'en',
                }}
                onFail={error => console.error(error)}

                />

                
                </ListItem>
                <ListItem>
                    <GooglePlacesAutocomplete
                    value={retCity}
                    styles={{
                        textInput: {
                            height: 48,
                            borderRadius: 5,
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            marginTop: 10,
                            marginBottom: 10,
                            marginLeft: 15,
                            marginRight: 15,
                            paddingLeft: 16}
                      }}
                    placeholder='Arrival City'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        setRetCity((details?.geometry?.location));
                    }}
                    query={{
                        key: `${GOOGLE_API_KEY}`,
                        language: 'en',
                    }}
                    onFail={error => console.error(error)}

                    />
                </ListItem>

                </SafeAreaView>

                <RNPickerSelect
                    placeholder={{ label: "Type of Flight", value: "Choose Item" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setflightType(itemValue)}
                    items={[
                        { label:"One Way", value:"One Way" },
                        { label:"Round Trip (Day Return)", value:"Round Trip Day Return" },
                        { label: "Round Trip (Stop Over)", value: 'Round Trip Stop Over' },
                    ]}
                />
                <Text style={styles.textField}>Pick Arrival Date and Time:</Text>
                <DateTimePicker
                style={styles.datetime}
                display="spinner"
                testID="returndateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={() => onChangeRetDate}
                />
                <TextInput
                    style={[styles.input, {height:100}]}
                    multiline={true}
                    placeholder='Number of Pets–Include Type and Weight'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setPets(text)}
                    value={pets}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={[styles.input, {height:100}]}
                    multiline={true}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Bag Types and Weight'
                    onChangeText={(text) => setbagWeight(text)}
                    value={bagWeight}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Extra Info'
                    onChangeText={(text) => setextraInfo(text)}
                    value={extraInfo}
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


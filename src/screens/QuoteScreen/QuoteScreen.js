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
import {GOOGLE_API_KEY} from "@env";
import {useTailwind} from 'tailwind-rn';
import DateTimePickerModal from "react-native-modal-datetime-picker";





import { getFirestore } from "firebase/firestore"


export default function QuoteScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [depDate, setDate] = useState(new Date())
    const [distance,setDistance] = useState(null)

    const [pets, setPets] = useState('')
    const [aircraftType, setAirCraftType] = useState('')
    
    const [phone, setPhone] = useState('')
    const [numPassengers, setnumPassengers] = useState('')
    const [passWeight, setpassWeight] = useState('')
    const [bagWeight, setbagWeight] = useState('')
    const [extraInfo, setextraInfo] = useState('')
    const [retDate, setRetDate] = useState(new Date())
    const [high,setHigh] = useState("")
    const [low, setLow] = useState("")
    const [depCityName, setDepCityName] = useState("")
    const [retCityName, setRetCityName] = useState("")

    const [depCity, setDepCity] = useState({lat:"", lng:""})


    const [retCity, setRetCity] = useState({lat:"", lng:""})
    const [reason, setReason] = useState('')
    const [flightType, setflightType] = useState('')
    

    // const tailwind = useTailwind();
    
    const [isDepDatePickerVisible, setDepDatePickerVisibility] = useState(false);
    const [isRetDatePickerVisible, setRetDatePickerVisibility] = useState(false);

    const showDepDatePicker = () => {
        setDepDatePickerVisibility(true);
    };

    const hideDepDatePicker = () => {
        setDepDatePickerVisibility(false);
    };

    const handleDepConfirm = (depDate) => {
        //console.warn("A depDate has been picked: ", depDate);
        setDate(depDate);
        
        hideDepDatePicker();
    };

    const showRetDatePicker = () => {
        setRetDatePickerVisibility(true);
    };

    const hideRetDatePicker = () => {
        setRetDatePickerVisibility(false);
    };

    const handleRetConfirm = (retDate) => {
        //console.warn("A retDate has been picked: ", retDate);
        setRetDate(retDate);
        
        hideRetDatePicker();
    };
    const db = getFirestore(firebase);

    

   
    useEffect(() => {
        if (aircraftType && depCity && retCity && flightType) {
            setHigh(flightType['cost']*getDistance(depCity,retCity)/740298*aircraftType['hourly']+aircraftType['daily']);
            //setLow(getDistance(depCity,retCity)/740298*aircraftType['hourly']+aircraftType['daily']);
        }

      },[aircraftType,depCity,retCity,flightType]);


    const { validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: { email, fullName, depDate, phone, numPassengers, flightType, aircraftType, depCityName, retCityName,reason},
      });


    const onRegisterPress = () => {
        try {
            if (validate({
                fullName: { required: true },
                email: { email: true, required: true },
                depDate: { required: true },
                phone: { required: true },
                numPassengers: { required: true },
                flightType: { required: true },
                aircraftType: { required: true },
                depCityName: { required: true },
                retCityName: { required: true },


            })) {


                const docRef = addDoc(collection(db, "quote"), {
                    name: fullName,
                    email_address: email,
                    departure_date: depDate,
                    phone_num: phone,
                    departure_city: depCityName,
                    departure_date: depDate.toString(),
                    flight_type: flightType['type'],
                    passenger_weight: passWeight,
                    bag_weight: bagWeight,
                    num_passengers: numPassengers,
                    extra_info: extraInfo,
                    return_date: retDate.toString(),
                    arrival_city: retCityName,
                    aircraft_type: aircraftType,
                    pet_info: pets,
                    flight_reason: reason,
                })

                setDistance(getDistance(depCity, retCity))
                console.log("Document written with ID: ", docRef.id);

                navigation.navigate('Display Quote', {
                    high_estimate: high,
                    low_estimate: low,
                    city_distance: distance,
                    depart_city: depCityName,
                    arr_city: retCityName,
                    plane_type: aircraftType['type'],
                    departure_Date: depDate.toDateString(),
                    return_Date: retDate.toDateString(),


                });
                alert("Successfully submitted!");

                    }
                }
        catch (e) {
            alert("Error occurred with submitting. Make sure you fill all fields out before submitting!")
        }}
        
    return ( 


        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}>
                <Image source={require('../../../assets/Black-Box-Collective-White.png')} 
                style={styles.image}
                resizeMode='contain'/>
                <Text style={styles.textField}>Full Name:</Text>
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
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.textField}>Email:</Text>
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
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.textField}>Phone Number:</Text>
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
                    getErrorsInField('phone').map(errorMessage => (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.textField}>Pick Departure Date and Time:</Text>
                <TouchableOpacity
                title="Show Departure Date Picker" 
                onPress={showDepDatePicker}
                style={styles.input}
                 >
                    <Text style={styles.inputText}>{depDate.toString()}</Text></TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDepDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleDepConfirm}
                    onCancel={hideDepDatePicker}
                    minimumDate={new Date()}
                />
                {isFieldInError('depDate') &&
                    getErrorsInField('depDate').map(errorMessage => (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.textField}>Pick Type of Aircraft:</Text>
                <RNPickerSelect
                    placeholder={{ label: "Type of Aircraft", value: "" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16,
                        backgroundColor: "#F1F1F1",}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setAirCraftType(itemValue)}
                    items={[
                        { label:"Light Jet (Max 6 Passengers)", value:{'daily':6000, 'hourly':3100, 'type':"Light Jet"} },
                        { label:"Medium Jet (Max 8 Passengers)", value:{'daily':8500, 'hourly':3500, 'type':"Medium Jet"} },
                        { label: "Heavy Jet (Max 8 Pass", value: {'daily':11000, 'hourly':4900, 'type':"Heavy Jet"} },
                    ]}
                />
                {isFieldInError('aircraftType') &&
                    getErrorsInField('aircraftType').map(errorMessage => (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.textField}>Purpose of Trip:</Text>
                <RNPickerSelect
                    placeholder={{ label: "Purpose of Trip", value: "" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16,
                        backgroundColor: "#F1F1F1",}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setReason(itemValue)}
                    items={[
                        { label:"Pleasure", value:"Pleasure" },
                        { label:"Business", value:"Business" },
                        { label: "Bereavement", value: "Bereavement" },
                        { label: "Medical", value: "Medical" }
                    ]}
                />
                <Text style={styles.textField}>Number of Passengers:</Text>
                <RNPickerSelect
                    placeholder={{ label: "Number of Passengers", value: "" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16,
                        backgroundColor: "#F1F1F1",}}}
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
                {isFieldInError('numPassengers') &&
                    getErrorsInField('numPassengers').map(errorMessage => (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.textField}>Total Passenger Weight:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Total Passenger Weight (lbs)'
                    onChangeText={(text) => setpassWeight(text)}
                    value={passWeight}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.textField}>Departure City:</Text>
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
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16,
                        backgroundColor: "#F1F1F1",}
                  }}
                placeholder='Departure City'
                textInputProps={{
                    placeholderTextColor: '#a1a1a1',
                    returnKeyType: "search"
                  }}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setDepCity((details?.geometry?.location));
                    setDepCityName(details.name)
                }}
                query={{
                    key: `${GOOGLE_API_KEY}`,
                    language: 'en',
                }}
                onFail={error => console.error(error)}
                />
                {isFieldInError('depCityName') &&
                    getErrorsInField('depCityName').map(errorMessage => (
                    <Text style={styles.errorMessage}>This field is required</Text>
                    ))}
                <Text style={styles.textField}>Arrival City:</Text>
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
                            marginLeft: 30,
                            marginRight: 30,
                            paddingLeft: 16,
                            backgroundColor: "#F1F1F1",}
                      }}
                    placeholder="Arrival City"
                    textInputProps={{
                        placeholderTextColor: '#a1a1a1',
                        returnKeyType: "search"
                      }}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        setRetCity((details?.geometry?.location));
                        setRetCityName(details.name)
                    }}
                    query={{
                        key: `${GOOGLE_API_KEY}`,
                        language: 'en',
                    }}
                    onFail={error => console.error(error)}

                    />
                {isFieldInError('retCityName') &&
                    getErrorsInField('retCityName').map(errorMessage => (
                    <Text style={styles.errorMessage}>This field is required</Text>
                    ))}
                <Text style={styles.textField}>Type of Flight:</Text>
                <RNPickerSelect
                    placeholder={{ label: "Type of Flight", value: "" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16,
                        backgroundColor: "#F1F1F1",}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setflightType(itemValue)}
                    items={[
                        { label:"One Way", value: {'type':'One Way','cost':1, 'isVisible':false} },
                        { label:"Round Trip", value: {'type':'Round Trip','cost':2, 'isVisible':true} },
                        //{ label: "Round Trip (Stop Over)", value: 3 },
                    ]}
                />
                {isFieldInError('flightType') &&
                    getErrorsInField('flightType').map(errorMessage => (
                    <Text style={styles.errorMessage}> {errorMessage}</Text>
                    ))}

                {flightType['isVisible'] && 
                <Text style={styles.textField}>Pick Return Date and Time:</Text>
                    }
                {flightType['isVisible'] && 
                <TouchableOpacity
                title="Show Departure Date Picker" 
                onPress={showRetDatePicker}
                style={styles.input}
                 >
                
                    <Text style={styles.inputText}>{retDate.toString()}</Text></TouchableOpacity>}
                <DateTimePickerModal
                    isVisible={isRetDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleRetConfirm}
                    onCancel={hideRetDatePicker}
                    minimumDate={new Date()}
                />
                {isFieldInError('retDate') &&
                    getErrorsInField('retDate').map(errorMessage => (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ))}
                <Text style={styles.textField}>Pets (if applicable):</Text>
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
                <Text style={styles.textField}>Bag Type and Weight (if applicable):</Text>
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
                <Text style={styles.textField}>Additional Info:</Text>
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


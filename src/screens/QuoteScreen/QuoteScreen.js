import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,Platform, Button, FlatList,KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles';
import { firebase } from '../../firebase/config';
import 'firebase/compat/firestore';
import { collection, addDoc, setDoc } from "firebase/firestore"; 
import { useValidation } from 'react-native-form-validator';
import RNPickerSelect from 'react-native-picker-select';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getDistance } from 'geolib';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import {process.env.GOOGLE_API_KEY} from "@env";





import { getFirestore } from "firebase/firestore"
import { ScrollView } from 'react-native-gesture-handler';


export default function QuoteScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [depDate, setDate] = useState(new Date())
    const [distance,setDistance] = useState(null)
    const [aircraftType, setAirCraftType] = useState('') 
    const [numPassengers, setnumPassengers] = useState('')
    const [retDate, setRetDate] = useState(new Date())
    const [high,setHigh] = useState("")
    const [low, setLow] = useState("")
    const [depCityName, setDepCityName] = useState("")
    const [retCityName, setRetCityName] = useState("")
    const [depCity, setDepCity] = useState({lat:"", lng:""})
    const [retCity, setRetCity] = useState({lat:"", lng:""})
    const [reason, setReason] = useState('')
    const [flightType, setflightType] = useState('')
    const [flightTypeValue, setFlightTypeValue] = useState("")
    const [isDepDatePickerVisible, setDepDatePickerVisibility] = useState(false);
    const [isRetDatePickerVisible, setRetDatePickerVisibility] = useState(false);

    const showDepDatePicker = () => {
        setDepDatePickerVisibility(true);
    };

    const hideDepDatePicker = () => {
        setDepDatePickerVisibility(false);
    };

    const handleDepConfirm = (depDate) => {
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
        setRetDate(retDate);
        
        hideRetDatePicker();
    };
    const db = getFirestore(firebase);

    

   
    useEffect(() => {
        if (aircraftType && depCity && retCity && flightType) {
            setHigh(flightType['cost']*getDistance(depCity,retCity)/740298*aircraftType['hourly']+.3*aircraftType['hourly']+flightType['dailyRate']*aircraftType['daily']);
        }

      },[aircraftType,depCity,retCity,flightType]);


    const { validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: { email, fullName, depDate, numPassengers, flightType, aircraftType, depCityName, retCityName},
      });


    const onRegisterPress = () => {
        try {
            if (validate({
                email: { email: true, required: true },
                flightType: { required: true },
                aircraftType: { required: true },
                depCityName: { required: true },
                retCityName: { required: true },


            })) {


                const docRef = addDoc(collection(db, "quote"), {
                    email_address: email,
                    departure_city: depCityName,
                    flight_type: flightType['type'],
                    arrival_city: retCityName,
                    aircraft_type: aircraftType,
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
                });
                alert("Successfully submitted!");

                    }
                }
        catch (e) {
            alert("Error occurred with submitting. Make sure you fill all fields out before submitting!")
        }}
        
    return ( 


        <KeyboardAvoidingView
         style={styles.container}
         behavior="height"
         keyboardVerticalOffset="100">
            <FlatList
                style={{ flex: 1, width: '100%' }}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps="always"
                ListHeaderComponent={
                <>
                <Image source={require('../../../assets/Black-Box-Collective-White.png')} 
                style={styles.image}
                resizeMode='contain'/>
                <Text style={styles.textField}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {isFieldInError('email') &&
                    getErrorsInField('email').map(errorMessage => (
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
                        backgroundColor: "#F1F1F1"},
                    inputAndroid:{height: 48,
                        color:'black',
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16,
                        backgroundColor: "#F1F1F1"}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setAirCraftType(itemValue)}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        { label:"Light Jet (Max 6 Passengers)", value:{'daily':6000, 'hourly':3100, 'type':"Light Jet"} },
                        { label:"Medium Jet (Max 8 Passengers)", value:{'daily':8500, 'hourly':3500, 'type':"Medium Jet"} },
                        { label: "Heavy Jet (Max 10 Passengers)", value: {'daily':11000, 'hourly':4900, 'type':"Heavy Jet"} },
                    ]}
                />

                {isFieldInError('aircraftType') &&
                    getErrorsInField('aircraftType').map(errorMessage => (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ))}
                
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
                    key: `${process.env.GOOGLE_API_KEY}`,
                    language: 'en',
                }}
                onFail={error => console.error(error)}
                />
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
                        key: `${process.env.GOOGLE_API_KEY}`,
                        language: 'en',
                    }}
                    onFail={error => console.error(error)}

                    />
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
                        backgroundColor: "#F1F1F1",},
                        inputAndroid:{height: 48,
                            borderRadius: 5,
                            color:'black',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            marginTop: 10,
                            marginBottom: 10,
                            marginLeft: 30,
                            marginRight: 30,
                            paddingLeft: 16,
                            backgroundColor: "#F1F1F1"}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setflightType(itemValue)}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        { label:"One Way", value: {'type':'One Way','cost':1,'dailyRate':1, 'isVisible':false} },
                        { label:"Round Trip (Same Day)", value: {'type':'Round Trip (Same Day)','cost':2,'dailyRate':1, 'isVisible':false} },
                        { label:"Round Trip (Stop Over)", value: {'type':'Round Trip (Stop Over)','cost':2,'dailyRate':2, 'isVisible':false} },
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
                title="Show Return Date Picker" 
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
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
                
                </>}></FlatList>
            </KeyboardAvoidingView>
       

    );
}


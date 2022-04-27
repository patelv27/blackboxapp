import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,Platform, Button,Pressables, Pressable,FlatList,KeyboardAvoidingView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles';
import { firebase } from '../../firebase/config';
import 'firebase/compat/firestore';
import { collection, addDoc, setDoc } from "firebase/firestore"; 
import { useValidation } from 'react-native-form-validator';
import { getFirestore } from "firebase/firestore"
import AddGuest from './addGuest';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from 'react-native-gesture-handler';
//import {process.env.GOOGLE_API_KEY} from "@env";

export default function TravelPlanning({navigation}) {
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [bday, setBday] = useState(new Date())
    const [street, setStreet] = useState('')
    const [state, setState] = useState('')
    const [budget, setBudget] = useState('')
    const [postal, setPostal] = useState('')
    const [passport,setPassport] = useState('')
    const [departureCityName,setDepartureCityName] = useState('')
    const [arrivalCityName,setArrivalCityName] = useState('')
    const [luggage,setLuggage] = useState('')
    const [pets,setPets] = useState('')
    const [addlTravellers,setAddlTravellers] = useState('')
    const [hotel,setHotel] = useState('')
    const [resort,setResort] = useState('')
    const [depDate,setDepDate] = useState(new Date())
    const [retDate,setRetDate] = useState(new Date())
    const [flightType, setflightType] = useState('')
    const [flights, setFlights] = useState(false);
    const [needHotel, setNeedHotel] = useState(false);
    const [excursions, setExcursions] = useState(false);
    const [cruises, setCruises] = useState(false);
    const [rental, setRental] = useState(false);

    const db = getFirestore(firebase);
    


    
   

    const [isDepDatePickerVisible, setDepDatePickerVisibility] = useState(false);
    const [isRetDatePickerVisible, setRetDatePickerVisibility] = useState(false);
    const [isBdayPickerVisible, setBdayPickerVisibility] = useState(false);

    const showDepDatePicker = () => {
        setDepDatePickerVisibility(true);
    };

    const hideDepDatePicker = () => {
        setDepDatePickerVisibility(false);
    };

    const handleDepConfirm = (depDate) => {
        setDepDate(depDate);
        
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


    const showBdayDatePicker = () => {
        setBdayPickerVisibility(true);
    };

    const hideBdayPicker = () => {
        setBdayPickerVisibility(false);
    };

    const handleBdayConfirm = (bdayDate) => {
        setBday(bdayDate);
        
        hideBdayPicker();
    };



    const { validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: { name,departureCityName,arrivalCityName,depDate,addlTravellers,budget,flightType},
      });

    const onTravelPlanningSubmitPress = () => {

        if (validate({
            name: { required: true },
            departureCityName: { required: true },
            arrivalCityName: { required: true },
            depDate: { required: true },
            addlTravellers: { required: true },
            budget: { required: true },
            flightType: {required:true}

            
        }))
        {

        
        const docRef = addDoc(collection(db, "travelPlanning"), {
            full_name: name,
            time_created: new Date(),
            city_address: city,
            birthday: bday,
            street_address: street,
            state_address: state,
            postal_code:postal,
            budget_amt:budget,
            hasPassport: passport,
            departure_city: departureCityName,
            arrival_city: arrivalCityName,
            luggage_info: luggage,
            pet_info: pets,
            additional_travellers:addlTravellers,
            hotel_type: hotel,
            want_resort: resort,
            need_flights: flights,
            need_hotel:needHotel,
            need_excursions:excursions,
            need_cruises:cruises,
            need_rental:rental,
            flight_type:flightType['type']


            
            
            })
        navigation.navigate('Home');
        alert("Successfully submitted!");

        }
    }

    return ( 


         <KeyboardAvoidingView
         style={styles.container}
         behavior="height"
         keyboardVerticalOffset="100">
            {/* <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                nestedScrollEnabled={false}
                keyboardShouldPersistTaps="always"> */}
            <FlatList
                style={{ flex: 1, width: '100%' }}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps="always"
                ListHeaderComponent={
                <>
                 <Image source={require('../../../assets/Black-Box-Collective-White.png')} 
                style={styles.image}
                resizeMode='contain'/>


               <Text style={styles.textField}>Full Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Full Name'
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {isFieldInError('name') &&
                    getErrorsInField('name').map(errorMessage => (
                    <Text style={styles.errorMessage}>This field is required</Text>
                    ))}
                <Text style={styles.textField}>Street Address:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Street Address'
                    onChangeText={(text) => setStreet(text)}
                    value={street}
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
                <Text style={styles.textField}>State:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='State'
                    onChangeText={(text) => setState(text)}
                    value={state}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.textField}>Zip Code:</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='ZIP Code'
                    keyboardType="numeric"
                    onChangeText={(text) => setPostal(text)}
                    value={postal}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                
                <Text style={styles.textField}>Date of Birth:</Text>
                <TouchableOpacity
                title="Show Birth Date Picker" 
                onPress={showBdayDatePicker}
                style={styles.input}
                 >
                    <Text style={styles.inputText}>{bday.toDateString()}</Text></TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isBdayPickerVisible}
                    mode="date"
                    onConfirm={handleBdayConfirm}
                    onCancel={hideBdayPicker}
                    maximumDate={new Date()}
                />
                <Text style={styles.textField}>Passport Status:</Text>
                <RNPickerSelect
                    value={passport}
                    placeholder={{ label: "Has Passport?", value: "" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16},
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
                        setPassport(itemValue)}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        { label:"Yes", value:"Yes" },
                        { label:"No", value:"No" },
                        { label: "In the process", value: "In the process" },
                    ]}
                />
                <Text style={styles.textField}>Departure City:</Text>
                <GooglePlacesAutocomplete
                value={departureCityName}
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
                    setDepartureCityName(details.name)
                }}
                query={{
                    key: `${process.env.GOOGLE_API_KEY}`,
                    language: 'en',
                }}
                onFail={error => console.error(error)}
                />
                {isFieldInError('departureCityName') &&
                    getErrorsInField('departureCityName').map(errorMessage => (
                    <Text style={styles.errorMessage}>This field is required</Text>
                    ))}
                <Text style={styles.textField}>Arrival City:</Text>
                <GooglePlacesAutocomplete
                    value={arrivalCityName}
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
                        setArrivalCityName(details.name)
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
                        setflightType(itemValue)}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        { label:"One Way", value: {'type':'One Way','cost':1, 'isVisible':false} },
                        { label:"Round Trip", value: {'type':'Round Trip','cost':2, 'isVisible':true} },
                        //{ label: "Round Trip (Stop Over)", value: 3 },
                    ]}
                />
                
                <Text style={styles.textField}>Pick Departure Date:</Text>
                <TouchableOpacity
                title="Show Departure Date Picker" 
                onPress={showDepDatePicker}
                style={styles.input}
                value={depDate}
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
                {flightType['isVisible'] && 
                 <Text style={styles.textField}>Pick Return Date:</Text>}
                {flightType['isVisible'] && 
                 <TouchableOpacity
                title="Show Return Date Picker" 
                onPress={showRetDatePicker}
                style={styles.input}
                value={retDate}
                 >
                    <Text style={styles.inputText}>{retDate.toString()}</Text></TouchableOpacity>}
                <DateTimePickerModal
                    isVisible={isRetDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleRetConfirm}
                    onCancel={hideRetDatePicker}
                    minimumDate={new Date()}
                />
                <View style={styles.selectContainer}>
                    <Text style={styles.textField}>Select Desired Amenities:</Text>
                    <TouchableOpacity
                            onPress={() => setNeedHotel(!needHotel)}
                            style={[styles.button, { backgroundColor: needHotel ? "#D1BD78" : "transparent" }]}>
                            <Text style={styles.textFieldAlt}>Hotel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() => setCruises(!cruises)}
                            style={[styles.button, { backgroundColor: cruises ? "#D1BD78" : "transparent" }]}>
                            <Text style={styles.textFieldAlt}>Cruises</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() => setRental(!rental)}
                            style={[styles.button, { backgroundColor: rental ? "#D1BD78" : "transparent" }]}>
                            <Text style={styles.textFieldAlt}>Rental Car</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() => setExcursions(!excursions)}
                            style={[styles.button, { backgroundColor: excursions ? "#D1BD78" : "transparent" }]}>
                            <Text style={styles.textFieldAlt}>Excursions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={() => setFlights(!flights)}
                            style={[styles.button, { backgroundColor: flights ? "#D1BD78" : "transparent" }]}>
                            <Text style={styles.textFieldAlt}>Connecting Flights</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textField}>Additional Guests:</Text>
                <RNPickerSelect
                    placeholder={{ label: "Additional Passengers", value: "" }}
                    value={addlTravellers}
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
                        setAddlTravellers(itemValue)}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        { label:"None", value:"0" },
                        { label:"1", value:"1" },
                        { label:"2", value:"2" },
                        { label: "3", value: "3" },
                        { label: "4", value: "4" },
                        { label: "5", value: "5" },
                        { label: "6", value: "6" },
                        { label: "7", value: "7" }
                    ]}
                />
                {isFieldInError('addlTravellers') &&
                    getErrorsInField('addlTravellers').map(errorMessage => (
                    <Text style={styles.errorMessage}>This field is required</Text>
                    ))}
                <Text style={styles.textField}>Estimated Budget:</Text>
                <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder='Estimated Budget'
                keyboardType="numeric"
                onChangeText={(text) => setBudget(text)}
                value={budget}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                />
                {isFieldInError('budget') &&
                    getErrorsInField('budget').map(errorMessage => (
                    <Text style={styles.errorMessage}>This field is required</Text>
                    ))}
                <Text style={styles.textField}>Pick Hotel Type:</Text>
                <RNPickerSelect
                    value={hotel}
                    placeholder={{ label: "Choose Hotel Type", value: "Choose Item" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16},
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
                        setHotel(itemValue)}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        { label:"5 Star", value:"5 Star" },
                        { label:"4 Star", value:"4 Star" },
                        { label: "3 Star", value: "3 Star" },
                    ]}
                />
                <Text style={styles.textField}>Pet Info (if applicable):</Text>
                <TextInput
                    style={[styles.input, {height:100}]}
                    multiline={true}
                    blurOnSubmit={true}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Pets–What Type, How Many, and Weight for Each'
                    onChangeText={(text) => setPets(text)}
                    value={pets}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.textField}>Luggage Info (if applicable):</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    blurOnSubmit={true}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Luggage Types and Weight?'
                    onChangeText={(text) => setLuggage(text)}
                    value={luggage}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.textField}>Prefer All-Inclusive Resort:</Text>
                <RNPickerSelect
                    value={resort}
                    placeholder={{ label: "All inclusive resort", value: "Choose Item" }}
                    style={
                    {inputIOS:{height: 48,
                        borderRadius: 5,
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        marginTop: 10,
                        marginBottom: 10,
                        marginLeft: 30,
                        marginRight: 30,
                        paddingLeft: 16},
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
                        setResort(itemValue)}
                    useNativeAndroidPickerStyle={false}
                    items={[
                        { label:"Yes", value:"yes" },
                        { label:"No", value:"no" },
                        { label: "No Preference", value: "no preference" },
                    ]}
                />
                

                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onTravelPlanningSubmitPress()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
                </>}></FlatList>
        </KeyboardAvoidingView>

    );

}

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
//import DropDownPicker from 'react-native-dropdown-picker';
import { getFirestore } from "firebase/firestore"
import RadioButtonRN from 'radio-buttons-react-native';
import CheckBox from '@react-native-community/checkbox';
import AddGuest from './addGuest';
import RNPickerSelect from 'react-native-picker-select';

export default function TravelPlanning({navigation}) {
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [bday, setBday] = useState(new Date())
    const [street, setStreet] = useState('')
    const [state, setState] = useState('')
    const [budget, setBudget] = useState('')
    const [postal, setPostal] = useState('')
    const [passport,setPassport] = useState('')
    const [departureCity,setDepartureCity] = useState('')
    const [arrivalCity,setArrivalCity] = useState('')
    const [luggage,setLuggage] = useState('')
    const [pets,setPets] = useState('')
    const [addlTravellers,setAddlTravellers] = useState('')
    const [hotel,setHotel] = useState('')
    const [resort,setResort] = useState('')
    const [depDate,setDepDate] = useState(new Date())
    const [retDate,setRetDate] = useState(new Date())

    const [flights, setFlights] = useState(false);
    const [needHotel, setNeedHotel] = useState(false);
    const [excursions, setExcursions] = useState(false);
    const [cruises, setCruises] = useState(false);
    const [rental, setRental] = useState(false);
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

      const [mode, setMode] = useState('date');
  
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



    const { validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: { name},
      });

    const onTravelPlanningSubmitPress = () => {

        if (validate({
            name: { maxlength: 7, required: true },
            //date: { date: 'MM-DD-YYYY',required: true }}    
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
            departure_city: departureCity,
            arrival_city: arrivalCity,
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
                <Text style={styles.textField}>Guest Birthday:</Text>
                <DateTimePicker
                testID="Guest1BdayPicker"
                value={bday}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={() => onChangeGuest1Bday}
                />
                <RNPickerSelect
                    value={passport}
                    placeholder={{ label: "Has Passport?", value: "Choose Item" }}
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
                        setPassport(itemValue)}
                    items={[
                        { label:"Yes", value:"Yes" },
                        { label:"No", value:"No" },
                        { label: "In the process", value: "In the process" },
                    ]}
                />
                 <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Departure City'
                    onChangeText={(text) => setDepartureCity(text)}
                    value={departureCity}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                 <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Arrival City'
                    onChangeText={(text) => setArrivalCity(text)}
                    value={arrivalCity}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={styles.textField}>Pick Departure Date:</Text>
                <DateTimePicker
                style={styles.dateField}
                testID="dateTimePicker"
                value={depDate}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={() => onChangeDepDate}
                />
                 <Text style={styles.textField}>Pick Return Date:</Text>
                <DateTimePicker
                style={styles.dateField}
                testID="dateTimePicker"
                value={retDate}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={() => onChangeRetDate}
                />
                <TouchableOpacity
                        onPress={() => setNeedHotel(!needHotel)}
                        style={[styles.button, { backgroundColor: needHotel ? "red" : "transparent" }]}>
                        <Text>Hotel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={() => setCruises(!cruises)}
                        style={[styles.button, { backgroundColor: cruises ? "red" : "transparent" }]}>
                        <Text>Cruises</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={() => setRental(!rental)}
                        style={[styles.button, { backgroundColor: rental ? "red" : "transparent" }]}>
                        <Text>Rental Car</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={() => setExcursions(!excursions)}
                        style={[styles.button, { backgroundColor: excursions ? "red" : "transparent" }]}>
                        <Text>Excursions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={() => setFlights(!flights)}
                        style={[styles.button, { backgroundColor: flights ? "red" : "transparent" }]}>
                        <Text>Connecting Flights</Text>
                </TouchableOpacity>
                <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder='Additional Guests'
                onChangeText={(text) => setAddlTravellers(text)}
                value={addlTravellers}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                />
                <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder='Estimated Budget'
                onChangeText={(text) => setBudget(text)}
                value={budget}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                />
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
                        paddingLeft: 16}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setHotel(itemValue)}
                    items={[
                        { label:"5 Star", value:"5 Star" },
                        { label:"4 Star", value:"4 Star" },
                        { label: "3 Star", value: "3 Star" },
                    ]}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Pets–What Type, How Many, and Weight for Each'
                    onChangeText={(text) => setPets(text)}
                    value={pets}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Luggage Types and Weight?'
                    onChangeText={(text) => setLuggage(text)}
                    value={luggage}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
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
                        paddingLeft: 16}}}
                    onValueChange={(itemValue, itemIndex) =>
                        setResort(itemValue)}
                    items={[
                        { label:"Yes", value:"yes" },
                        { label:"No", value:"no" },
                        { label: "No Preference", value: "no preference" },
                    ]}
                />
                <AddGuest></AddGuest>
                

                
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onTravelPlanningSubmitPress()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>

    );

}

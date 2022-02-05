import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View,Platform, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, addDoc, setDoc } from "firebase/firestore"; 
import ValidationComponent from 'react-native-form-validator';
import { useValidation } from 'react-native-form-validator';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
//import useScript from 'hooks/useScript';
import DropDownPicker from 'react-native-dropdown-picker';
import Autocomplete from 'react-native-autocomplete-input';
import Papa from 'papaparse';
import Airports from '/Users/varunpatel/Desktop/blackboxapp/airport_names.json';


import { getFirestore } from "firebase/firestore"
import { DeprecatedAccessibilityRoles } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewAccessibility';

export default function QuoteScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState(new Date())
    const [query, setQuery] = useState('')

    

    const [depAirport, setdepAirPort] = useState('')
    const [phone, setPhone] = useState('')
    const [numPassengers, setnumPassengers] = useState('')
    const [retAirport, setretAirPort] = useState('')
    const [passWeight, setpassWeight] = useState('')
    const [bagWeight, setbagWeight] = useState('')
    const [extraInfo, setextraInfo] = useState('')
    const [retDate, setRetDate] = useState(new Date())
    
    const [flightType, setflightType] = useState('')


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'One Way', value: 'one way'},
        {label: 'Return Trip (Day Return)', value: 'return trip day return'},
        {label: 'Return Trip (Stop Over)', value: 'return trip stop over'}

    ]);

    const [filteredFilms, setFilteredFilms] = useState([]);
    const [films, setFilms] = useState([]);


    

    var data = [];
    for(var i in Airports) {
        data.push(Airports[i]);
    }
    //console.log(Airports);
    //for datetimepicker:
    const [mode, setMode] = useState('date');
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

    const showDatepicker = () => {
    showMode('date');
    };

    const showTimepicker = () => {
    showMode('time');

    };


    const db = getFirestore(firebase);


    const findFilm = (query) => {
        // Method called every time when we change the value of the input
        if (query) {
          // Making a case insensitive regular expression
          const regex = new RegExp(`${query.trim()}`, 'i');
          // Setting the filtered film array according the query
          setFilteredFilms(
              films.filter((film) => film.title.search(regex) >= 0)
          );
        } else {
          // If the query is null then return blank
          setFilteredFilms([]);
        }
      };




    const { validate, isFieldInError, getErrorsInField, getErrorMessages} = useValidation({
        state: { email, fullName, date},
      });


    const pickerRef = useRef();

    function pickerOpen() {
    pickerRef.current.focus();
    }
    
    function pickerClose() {
    pickerRef.current.blur();
    }

  

    const onRegisterPress = () => {

        if (validate({
            fullName: { minlength: 3, maxlength: 7, required: true },
            email: { email: true, required: true}
            //date: { date: 'MM-DD-YYYY',required: true }}    
        }))
        {

        
        const docRef = addDoc(collection(db, "test"), {
            name: fullName,
            email_address: email,
            departure_date:date,
            phone_num:phone,
            departure_airport:depAirport,
            departure_date: date,
            flight_type:flightType,
            passenger_weight:passWeight,
            bag_weight:bagWeight,
            num_passengers:numPassengers,
            extra_info:extraInfo,
            return_date:retDate,
            return_airport:retAirport,
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
                <View>
                    <View>
                        <Button onPress={showDatepicker} title="Departure date picker!" />
                        
                    </View>
                    <View>
                        <Button onPress={showTimepicker} title="Departure time picker!" />
                    </View>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={() => onChangeDepDate}
                        />
                    )}
                </View>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Number of Passengers'
                    onChangeText={(text) => setnumPassengers(text)}
                    value={numPassengers}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Passenger Weight'
                    onChangeText={(text) => setpassWeight(text)}
                    value={passWeight}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Bag Weight'
                    onChangeText={(text) => setbagWeight(text)}
                    value={bagWeight}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            <View>
            <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.container}
                //data to show in suggestion
                data={data}
                //default value if you want to set something in input
                defaultValue={
                 "None"
                }
                // onchange of the text changing the state of the query
                // which will trigger the findFilm method
                // to show the suggestions
                onChangeText={(text) => findFilm(text)}
                placeholder="Enter the film title"
                renderItem={({item}) => (
                  //you can change the view you want to show in suggestions
                  <TouchableOpacity
                      onPress={() => {
                      setQuery(item);
                      }}>
                      <Text>
                          {item.title}
                      </Text>
                  </TouchableOpacity>
                  )}
                />
            </View>
                <TextInput
                    id='airport'
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Departure Airport'
                    onChangeText={(text) => setdepAirPort(text)}
                    value={depAirport}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Picker
                    ref={pickerRef}
                    itemStyle={styles.picker}
                    selectedValue={flightType}
                    onValueChange={(itemValue, itemIndex) =>
                        setflightType(itemValue)

                    }>
                    <Picker.Item label="One Way" value="One Way" />
                    <Picker.Item label="Round Trip (Day Return)" value="Round Trip Day Return" />
                    <Picker.Item label="Round Trip (Stop Over)" value="Round Trip Stop Over" />
                </Picker> 
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    placeholder='Return Airport'
                    onChangeText={(text) => setretAirPort(text)}
                    value={retAirport}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View>
                    <View>
                        <Button onPress={showDatepicker} title="Return date picker!" />
                    </View>
                    <View>
                        <Button onPress={showTimepicker} title="Return time picker!" />
                    </View>
                    {show && (
                        <DateTimePicker
                        testID="returnDateTimePicker"
                        value={retDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={() => onChangeRetDate}
                        />
                    )}
                </View>
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


import React, { Component, useEffect, useState } from 'react'
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
import 'airport-autocomplete-js';
//import AirportInput from "airport-autocomplete-js";
import Fuse from 'fuse.js'
//import AirportStuff from './components';
import { WebView } from 'react-native-webview';


// AirportStuff.AirportInput('autocomplete-airport-1');
import { getFirestore } from "firebase/firestore"
import { DeprecatedAccessibilityRoles } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedViewAccessibility';

// class AirportStuff extends Component {
//     constructor(props){
//         super(props);
//         this.airport = new AirportInput();
//       }
// }
// export default class AirportInfo extends React {
//     constructor(props) {
//         super(props);
//         this.airportInfo = AirportInput("autocomplete-airport-1");
//       }
// }
export default function QuoteScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState(new Date())

    //AirportStuff('autocomplete-airport-1');
    

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


    const runFirst = `
    setTimeout(function() { window.alert('hi')) }, 2000);
    true;
    `;


    const html = `
      <html>
      <head></head>
      <body>
      <div class="col span_1_of_5" style="text-align: center">
      <input type="text" id="autocomplete-airport-1" class="inp" placeholder="Flight from" onchange="checkDistance(this)">
      <span class="border"></span>
        <script src="https://cdn.jsdelivr.net/npm/airport-autocomplete-js@latest/dist/index.browser.min.js"></script>
        <script>
          setTimeout(function () {
            window.ReactNativeWebView.postMessage("Hello!")
          }, 2000)
          AirportInput('autocomplete-airport-1')
          
        </script>
        <script src="https://cdn.jsdelivr.net/npm/airport-autocomplete-js@latest/dist/index.browser.min.js"></script>

        
      </body>
      </html>
    `;

    // setTimeout(() => {
    //      this.webref.injectJavaScript(runFirst);
    //    }, 100);

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

    const air = (parameter) => { return { parameter: parameter } }


    const codeStr = `
    <script type="text/javascript" src="./components.js"></script> 
    <div id='airport-autocomplete>
        <div class="form-group">
            <label class="control-label">Enter an Airport</label>
            <input id="autocomplete" type="text" />
        </div>                
  </div>
`

    //const here= new AirportInput('autocomplete-airport-1');
    const db = getFirestore(firebase);


    // const airportnav = props => {
    //     useScript("https://cdn.jsdelivr.net/npm/airport-autocomplete-js@latest/dist/index.browser.min.js");
    // }




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

   //<div style={styles.input} dangerouslySetInnerHTML={{ __html: codeStr }}>

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

                
                <WebView 
                    style={styles.input} 
                    source={{html}}
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    injectedJavaScript={runFirst}
                    onMessage={(event) => {
                        alert(event.nativeEvent.data);
                      }}
                    >
                </WebView>  
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
                    <View style={styles.container}>
                        <Button onPress={showDatepicker} title="Departure date picker!" />
                        
                    </View>
                    <View style={styles.container}>
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


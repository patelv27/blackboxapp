import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,Platform, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles';
import 'firebase/compat/firestore';



export default function DisplayQuote({route,navigation}) {

    const [coins, setCoins] = useState("");
    const [dollars, setDollars] = useState(false);

    
    const onHomePress = () => {
        navigation.navigate('Home');

    }


    const switchDollars = () => {
        console.log('dollar value changed from',dollars)
        setDollars(!dollars);

    }

    const loadData = async () => {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD"
        );
        const data = await res.json();
        var coinValue = parseInt(data['ethereum']['usd'])
        setCoins(coinValue);
      };
    
    useEffect(() => {
    loadData();
    });

    

    return ( 


        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"
                nestedScrollEnabled={true}>

            <Image source={require('../../../assets/Black-Box-Collective-White.png')} 
                style={styles.image}
                resizeMode='contain'/>



            <Text style={styles.quoteText}>Your estimated flight quote is:</Text>
            {!dollars &&
            <Text style={styles.quoteValue}>{Math.round(route.params.high_estimate*100/coins)/100} ETH</Text>
            }
            {!dollars &&
            <Text style={styles.quoteValue}>{Math.round(route.params.high_estimate*100/(6*coins))/100} ETH per Seat</Text>
            }
            {dollars && 
            <Text style={styles.quoteValue}>${Math.round(route.params.high_estimate)}</Text>
            }
            {dollars &&
            <Text style={styles.quoteValue}>${Math.round(route.params.high_estimate*100/(6))/100} per Seat</Text>
            }


            <Text style={styles.quoteText}>From: {route.params.depart_city}</Text>
            <Text style={styles.quoteText}>To: {route.params.arr_city}</Text>
            <Text style={styles.quoteText}>In a: {route.params.plane_type}</Text>
            <Text style={styles.quoteText}>Departing On: {route.params.departure_Date}</Text>


            <TouchableOpacity
                style={styles.button}
                onPress={() => switchDollars()}>
                {dollars &&
                <Text style={styles.buttonTitle}>Switch to ETH</Text>
                }
                {!dollars &&
                <Text style={styles.buttonTitle}>Switch to USD</Text>
                }

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => onHomePress()}>
                <Text style={styles.buttonTitle}>Home</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>

    </View>
    )
}


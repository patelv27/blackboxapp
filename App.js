

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, QuoteScreen,LocalPlugContact,TravelPlanning,DisplayQuote } from './src/screens'
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
 

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(true)
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          { user ? (
            <><Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Quote" component={QuoteScreen} />
            <Stack.Screen name="Display Quote" component={DisplayQuote} />
            <Stack.Screen name="Local Plug Contact" component={LocalPlugContact} />
            <Stack.Screen name="Travel Planning" component={TravelPlanning} /></>
            
          ) : (
            <>
              <Stack.Screen name="Sign In" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}



import React, { Component } from 'react';
import { AppRegistry, View, Text, Button, TextInput} from 'react-native';
import styles from './styles';

export default class AddGuest extends Component {

  constructor(props){
    super(props);
    this.state = {
      textInput : [],
      secondName : "",
      secondCity: "",
      secondState: "",
      secondAddress:"",
      secondZip:""
    }
  }
  addTextInput = (key) => {
    let textInput = this.state.textInput;
    textInput.push(<TextInput style={styles.input} 
        key={key} 
        value={this.secondName} 
        underlineColorAndroid="transparent"
        autoCapitalize="none" 
        placeholderTextColor="#aaaaaa"
        placeholder='Guest 2 Full Name' 
        onChangeText={(text) => this.setState({secondName:text})}>
        </TextInput>);
    textInput.push(<TextInput style={styles.input} 
       
        value={this.secondAddress} 
        underlineColorAndroid="transparent"
        autoCapitalize="none" 
        placeholderTextColor="#aaaaaa"
        placeholder='Guest 2 Address' 
        onChangeText={(text) => this.setState({secondAdress:text})}>
        </TextInput>);
    textInput.push(<TextInput style={styles.input} 

        value={this.secondCity} 
        underlineColorAndroid="transparent"
        autoCapitalize="none" 
        placeholderTextColor="#aaaaaa"
        placeholder='Guest 2 City' 
        onChangeText={(text) => this.setState({secondCity:text})}>
        </TextInput>);
    textInput.push(<TextInput style={styles.input} 

        value={this.secondState} 
        underlineColorAndroid="transparent"
        autoCapitalize="none" 
        placeholderTextColor="#aaaaaa"
        placeholder='Guest 2 State' 
        onChangeText={(text) => this.setState({secondState:text})}>
        </TextInput>);
    textInput.push(<TextInput style={styles.input} 

        value={this.secondZip} 
        underlineColorAndroid="transparent"
        autoCapitalize="none" 
        placeholderTextColor="#aaaaaa"
        placeholder='Guest 2 Zip' 
        onChangeText={(text) => this.setState({secondZip:text})}>
        </TextInput>);
    
    this.setState({ textInput })
  }
  render(){
    return(
      <View>
        <Button title='Add Guest' onPress={() => this.addTextInput(this.state.textInput.length)} />
        {this.state.textInput.map((value, index) => {
          return value
        })}
      </View>
    )
  }
}
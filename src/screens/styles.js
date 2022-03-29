import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        marginBottom:50,
        justifyContent:'center'
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    buttonTitle: {
        color: 'black',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom:50,
        backgroundColor:'black'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#F1F1F1',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    picker: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        backgroundColor: '#D1BD7825',
    },
    button: {
        backgroundColor: '#D1BD78',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    textField: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft:30,
        marginBottom:3,
        fontWeight:'600',
        color:"#D1BD78",
        //fontFamily:'poppins',
        fontSize:16
        
    },
    textFieldAlt: {
        //flex: 1,
        //alignItems: 'flex-start',
        //paddingLeft:30,
        fontWeight:'600',
        color:"#FFFFFF",
        //fontFamily:'poppins',
        //fontSize:16
        
    },
    datetime:{
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        backgroundColor: "#F1F1F1",
    },
    errorMessage:{
        height: 30,
        fontSize:13,
        textAlign:'center',
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        color:'#FFFFFF'
    },
    selectContainer: {
        margin:10
    },
    image: {
        width: 200,
        height:200,
        alignSelf:'center'
    },
    copyrightField: {
        marginTop:'auto'
        
    },
    copyrightText:{
        fontWeight:'600',
        color:"#D1BD78",
    },
    quoteValue: {
        color:"#FFFFFF",
        fontSize:28,
        alignSelf:'center'

    },
    quoteText: {
        flex: 1,
        alignSelf: 'center',
        marginBottom:3,
        fontWeight:'600',
        color:"#D1BD78",
        //fontFamily:'poppins',
        fontSize:16
    },
    inputText: {
        paddingTop:18,
        paddingLeft:0

    }
})

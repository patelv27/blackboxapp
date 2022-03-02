import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom:50,
    },
    title: {

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
        backgroundColor:'white'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#D1BD7825',
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
        //fontFamily:'poppins',
        fontSize:16
        
    },
    datetime:{
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        backgroundColor: '#D1BD7825',
    },
    errorMessage:{
        height: 30,
        fontSize:13,
        textAlign:'center',
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
    }
})
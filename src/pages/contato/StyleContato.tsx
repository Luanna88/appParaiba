import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        top:10,
        flex:1,
        backgroundColor: "white",
        padding:20,
        paddingTop:70,
        margin: 15,
        borderWidth:3,
        borderColor: '#F0EAC7', 
        borderRadius:50,
        marginBottom:15,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 15, height: 15 },
                shadowOpacity: 0.06, 
                shadowRadius: 2,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    barra01: {
        backgroundColor: 'white',
        paddingVertical: Platform.OS === 'ios' ? 35 : 38,
    },
    header: {
        alignSelf:'center',
        fontSize:  18,
        marginBottom: 20,
        marginTop:10,
        fontFamily:'LoveYaLikeASister_400Regular',
    },
    subheader: {
        fontSize: 14,
        marginBottom: 20,
        fontFamily:'LoveYaLikeASister_400Regular',
    },
    label: {
        top:-3,
        fontSize: 14,
        marginBottom: 10,
        fontFamily:'SpecialElite_400Regular'
    },
    label2: {
        top:15,
        fontSize: 14,
        marginBottom: 10,
        fontFamily:'SpecialElite_400Regular',
        right:250
    },
    input: {
        alignSelf:'center',
        width: 280,
        height: 35,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius:20,
        paddingHorizontal: 15,
        marginBottom: 33,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        fontFamily:'SpecialElite_400Regular'
    },
    textarea: {
        height: 80,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
     checkbox: {
        margin: 8,
        top:-1
    },
    telefoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    telefoneIcon: {
        marginRight: 10,
        top:10,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default styles;
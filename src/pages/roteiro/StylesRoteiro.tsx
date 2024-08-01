import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    barra02: {
        backgroundColor: 'white',
        marginTop: 0,
        paddingVertical: Platform.OS === 'ios' ? 3 : 10,
    },
    itemContainer: {
        alignItems: 'center',
        marginVertical: 30,
        left: 10,
    },
    image: {
        width: 110,
        height: 110,
        right: 3,
        marginRight:16,
        borderRadius: 10,
        marginBottom: -20,
    },
    text: {
        fontSize: 15,
        top: 30,
        right:9 ,
        textAlign: 'center',
        fontFamily: 'SpecialElite_400Regular',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:8
    },
    modalContent: {
        width: '75%',
        padding: 40,
        backgroundColor: 'white',
        borderRadius: 70,
        alignItems: 'center',
        borderWidth:3,
        borderColor: '#F0EAC7', 
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
    modalTitle: {
        fontSize: 25,
        marginBottom: 10,
        fontFamily:'LoveYaLikeASister_400Regular'
    },
    modalInfo: {
        fontSize: 13,
        marginBottom: 20,
        fontFamily:'LoveYaLikeASister_400Regular',
        textAlign:'justify'
    },
    buttonsContainner: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        top:13
    },
    modalButtons: {
        justifyContent: 'space-around',
        width: '100%',
    },
    question: {
        fontSize: 16,
        marginBottom: 10,
        textAlign:'center',
        textDecorationLine:'underline',
        fontFamily:'LoveYaLikeASister_400Regular',
    },
    button: {
        backgroundColor: 'transparent', 
        paddingHorizontal: 20, 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: '#696969', 
        marginHorizontal: 10, 
        paddingVertical: 10, 
      },
    buttonText: {
        fontSize: 16, 
        fontFamily:'LoveYaLikeASister_400Regular'
    },
    closeButton: {
        position: 'absolute',
        top: 45,
        right: 50,
        padding: 10,
        backgroundColor: '#F0EAC7',
        borderRadius: 20,
      },
      closeButtonText: {
        color: '#696969', 
        fontSize: 18,
        fontFamily: 'SpecialElite_400Regular',
      },
      
});

export default styles;

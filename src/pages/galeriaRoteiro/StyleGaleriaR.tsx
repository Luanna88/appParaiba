import { StyleSheet ,Platform} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "white",
        padding:20,
        paddingTop:73,
        margin: 15,
        borderWidth:3,
        borderColor: '#F0EAC7', 
        borderRadius:50,
        marginBottom:6,
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
    imageRow: {
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:15
    },
    imageContainer: {
        alignItems:'center'
    },
    image: {
        top:15,
        width:135,
        height:125,
        resizeMode:'cover',
        borderRadius:35,
        marginRight:10,
        marginLeft:10
    },
    imageText: {
        textAlign:'center',
        top:25,
        fontSize:14,
        fontFamily:'SpecialElite_400Regular',
        marginBottom:15
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 39,
        alignItems: 'center',
        borderWidth:3,
        borderColor: '#F0EAC7', 
        borderRadius:50,
        margin:50
    },
    locationName: {
        borderWidth: 3,
        width: 190,
        height: 80,
        borderColor: '#F0EAC7',
        borderRadius:20,
        fontSize: 16,
        textAlign: 'center',
        fontFamily:'LoveYaLikeASister_400Regular',
        marginBottom: 20,
        top: -10,
        paddingVertical:7, 
    },
    locationHistory: {
        top:-13,
        fontSize:14,
        fontFamily:'LoveYaLikeASister_400Regular',
        textAlign:'justify'
    },
    carimboTitle: {
        top:10,
        fontFamily:'LoveYaLikeASister_400Regular',
        fontSize:15,
        textDecorationLine:'underline'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        top:23
    },
    button: {
        backgroundColor: 'transparent', 
        paddingHorizontal: 20,
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: '#696969', 
        marginHorizontal: 25, 
        paddingVertical:2, 
        marginTop:5,
    },
    buttonText: {
        fontSize: 16, 
        fontFamily:'LoveYaLikeASister_400Regular'
    },
    buttonTouchable: {
        backgroundColor: '#2576BA',
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 45,
        right: 50,
        padding: 10,
        backgroundColor: '#F0EAC7',
        borderRadius: 20,
        color: '#696969', 
    },
    closeButtonText: {
        color: '#696969', 
        fontSize: 18,
        fontFamily: 'SpecialElite_400Regular',
      },
      scanAgainContainer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    scanText: {
        color: '#fff', 
        fontSize: 18,
        fontFamily: 'SpecialElite_400Regular',
        textDecorationLine:'underline'
    }
});

export default styles;
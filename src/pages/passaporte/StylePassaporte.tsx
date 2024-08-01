import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    carimboContainer: {
        top:30,
        width:150,
        padding:5,
        margin:5,
        borderWidth:2.5 ,
        borderColor:'#F0EAC7',
        marginVertical:20,
        marginHorizontal:10,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:8,
        elevation:5,
        right:-5 
    },
    url: {
        width:100,
        height:100,
        borderRadius:5
    },
    text: {
        textAlign:'center',
        marginTop:9,
        fontSize:14,
        fontFamily:'SpecialElite_400Regular'
    },
    container: {
        top:10,
        flex:1,
        backgroundColor: "white",
        padding:10,
        paddingTop:70,
        margin: 10,
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
    barra01:{
        backgroundColor:'white',
        marginTop:0,
        paddingVertical: Platform.OS === 'ios' ? 20 : 10
    },
    carimboRowContainer: {
        justifyContent:'center',
        paddingVertical:10
    },
    galleryTitle: {
        top:20,
        fontSize:18,
        marginBottom:5,
        padding:10,
        width:155,
        borderRadius:5,
        fontFamily:'LoveYaLikeASister_400Regular',
        textAlign:'center',
        borderWidth: 3,
        borderColor: '#F0EAC7',
        alignSelf:'center'
       
    },
    modalView: {
        margin:70,
        borderColor:'white',
        borderRadius:6,
        padding:10,
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset: {
            width: 0,
            height: 2,
            },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
    },
    textClose: {
        color: '#696969',
        textAlign: "center",
        fontFamily:'SpecialElite_400Regular',
    },

});

export default styles;
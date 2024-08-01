import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        justifyContent:'flex-end'
    },
    barra01: {
        backgroundColor:'white',
        paddingVertical:Platform.OS === 'ios' ? 35 :30
    },
    logoContainer: {
        justifyContent:'center',
        alignItems:'center',
        marginBottom:-10,
        marginTop:5
    },
    logo: {
        alignSelf:'center',
        marginTop:-5,
        width:190,
        height:57,
        top:3,
        paddingBottom:5
    },
    logoLinha: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal: 10,
        paddingVertical:10,
        borderBottomWidth:1,
        borderBottomColor: '#ccc'
    },
    titleRoteiro: {
        borderWidth:2,
        borderColor:'#F0EAC7',
        borderRadius:50,
        padding:6,
        width:170,
        alignSelf:'center',
        textAlign:'center',
        fontFamily:'SpecialElite_400Regular',
        fontSize:16,
    },
    titleRotas: {
        borderWidth:2,
        borderColor:'#F0EAC7',
        borderRadius:50,
        padding:6,
        width:120,
        alignSelf:'center',
        textAlign:'center',
        fontFamily:'LoveYaLikeASister_400Regular',
        fontSize:16,
    },
    element: {
        padding: 6,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
    imagem01: {
        top:15,
        width: 70,  
        height: 29, 
        left:90,
        zIndex:1 
    },
    imagem02: {
        top:-20,
        width: 53,  
        height: 22, 
        left:155,
        zIndex:1 
    },
    imagem03: {
        top:-7,
        width: 42,  
        height: 18, 
        left:145,
        zIndex:1 
    },
    imagem04: {
        top:-59,
        width: 80,  
        height: 74, 
        right:145,
        zIndex:1 
    },
    quoteText: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 3,
        alignSelf:'center',
        top:-79,
        fontFamily:'LoveYaLikeASister_400Regular',
    },
    autorText: {
        fontSize: 10,
        textAlign: 'left',
        marginVertical: 0.5,
        alignSelf:'flex-end',
        top:-79,
        fontFamily:'LoveYaLikeASister_400Regular',
    },
    mapContainer: {
        width:390,
        height:250,
        marginTop:32,
        alignSelf:'center', 
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
      },
      iconButton: {
        alignItems: 'center',
      },
      textBar: {
        fontFamily:'SpecialElite_400Regular',
        fontSize:13,
        top:5  
      },
      closeModalButton: {
        position:'absolute',
        right: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        top:50,
        backgroundColor: '#F0EAC7',
        borderRadius: 20,
        color: '#696969', 
      },
      closeModalText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'SpecialElite_400Regular',
      }, 
      closeModalButton2: {
        position:'absolute',
        right: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        top:50,
        backgroundColor: '#F0EAC7',
        borderRadius: 20,
        color: '#696969', 
      },
      
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
    text: {
        textAlign:'center',
        marginTop:9,
        fontSize:14,
        fontFamily:'SpecialElite_400Regular'
    },
    url: {
        width:100,
        height:100,
        borderRadius:5
    },
    modalView2: {
        flex:1,
        backgroundColor: "white",
        padding:60,
        paddingTop:70,
        margin: 70,
        borderWidth:3,
        borderColor: '#F0EAC7', 
        borderRadius:50,
        marginBottom:195,
        marginTop:270,
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
    
});

export default styles;
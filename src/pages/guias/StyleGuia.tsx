import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      
      input: {
        alignSelf:'center',
        width: 280,
        height: 35,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        fontFamily:'SpecialElite_400Regular'
      },
      
      title: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily:'LoveYaLikeASister_400Regular',
        alignSelf:'center'
      },
      
      avatar: {
        alignSelf:'center',
        width:135,
        height: 135,
        borderRadius: 10,
        marginBottom:10,
      },
      
      barra01: {
        backgroundColor: 'white',
        paddingVertical: Platform.OS === 'ios' ? 25 : 1,
      },
      
      logo: { 
        alignSelf:'center',
        marginTop: 10,    
        width:15, 
        height: 20, 
        top:10,
      },
      
      logoutButton: {
        justifyContent: 'center',
        alignItems: 'center',
        right:5,
        top:20,
        marginRight:40 ,
      },
      
      barra02:{
        backgroundColor: 'white',
        marginTop: 0,
        paddingVertical: Platform.OS === 'ios' ? 20 : 14
      },
      
      logolinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 40,
        borderBottomWidth: 10,
        borderBottomColor: '#ccc',
      },
});

export default styles;
import { StyleSheet, Platform} from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    top:70,
    borderWidth:3,
    borderColor: '#F0EAC7',
    borderRadius: 10,
    marginBottom: 10,
    margin:-14,
    padding:7,
    paddingVertical:23,
    alignItems:'baseline'
},

cardText: {
  fontSize:  15,
  marginBottom: 10,
  fontFamily:'SpecialElite_400Regular'
},

socialMediaContainer: {
  marginTop:  10,
  flexDirection: 'row',
  alignItems: 'center',
},
      
socialMediaIcons: {
  flexDirection: 'row',
  alignItems: 'center',
},

socialMediaIcon: {
  marginRight: 15,
},

avatar: {
  alignSelf:'center',
  width:100,
  height: 99,
  borderRadius: 30,
  marginBottom: 10,
},

});

export default styles;


import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
},
avatar: {
    width: 125,
    height: 135,
    borderRadius: 30,
    marginBottom: 20,
},
text: {
    fontSize: 18,
    marginVertical: 5,
    fontFamily:'SpecialElite_400Regular'
},
label: {
    fontSize: 14,
    color: '#696969',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontFamily:'SpecialElite_400Regular',
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 10,
  }
 
});

export default styles;

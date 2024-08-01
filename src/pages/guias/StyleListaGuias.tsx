import { StyleSheet,Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    top:10,
    flex:1,
    backgroundColor: "white",
    padding:4,
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
  searchBar: {
    top:30,
    height: 40,
    width: '88%',
    alignSelf: 'center',
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 20,
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 1,
  },
  guiaCardWrapper: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    width: '38%',
  },
  });

  export default styles;
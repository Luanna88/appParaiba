import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
      },
      info: {
        fontSize: 18,
        marginBottom: 10,
      },
});
export default styles;
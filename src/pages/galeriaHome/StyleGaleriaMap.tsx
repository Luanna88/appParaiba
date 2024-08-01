import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        top: 30,
        width: '127%',
        height: '115%',
        backgroundColor: 'white',
        borderRadius: 70,
        alignItems: 'center',
        paddingBottom:60,
        borderWidth: 3,
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
    subTitle: {
        top: 20,
        fontSize: 17,
        fontFamily: 'LoveYaLikeASister_400Regular',
        textAlign: 'center',
        marginVertical: 10,
        borderWidth: 3,
        borderColor: '#F0EAC7',
        borderRadius: 20,
        width: 195
    },
    url: {
        top: 22,
        width: 100,
        height: 90,
        borderRadius: 10,
        alignSelf: 'center',
        elevation: 0.5,
        shadowRadius: 0.6
    },
    addPhoto: {
        fontSize: 14,
        color: '#696969',
        fontFamily: 'SpecialElite_400Regular'
    },
    barra01: {
        marginTop: 0,
        paddingVertical: Platform.OS === 'ios' ? 3 : 10,
    },
    photoWrapper: {
        margin: 8,
        alignItems: 'center',
    },
    photo: {
        width: 110,
        height: 110,
        borderRadius: 20,
    },
    modalView: {
        margin: 5,
        padding: 4,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 12,
        shadowRadius: 6,
        elevation: 4
    },
    fullImage: {
        width: 350,
        height: 350,
        resizeMode: 'contain',
        top:250
    },
    closeButton: {
        position: 'absolute',
        top: 230,
        right: -10,
        padding: 30,
        width: 100
    },
    watermark: {
        position: 'absolute',
        bottom: 10,
        right: 100,
        width: 180,
        height: 40,
        opacity: 0.6,
        resizeMode: 'contain',
        top:550, 
    },
    modalView2: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0.2,
        },
        shadowOpacity: 2.5,
        shadowRadius: 4,
        elevation: 5
      },
      
});

export default styles;

import React from 'react';
import { View, Text, TouchableOpacity, Linking, Image, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../guias/StyleCardGuia';

const GuiaCard: React.FC<{ userData: any }> = ({ userData }) => {
  const handleSocialMediaPress = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const handlePhoneCallPress = () => {
    if (userData?.telefone) {
      Linking.openURL(`tel:${userData.telefone}`);
    }
  };

  const handleWhatsAppPress = () => {
    if (userData?.telefone) {
      Linking.openURL(`whatsapp://send?phone=${userData.telefone}`);
    }
  };

  const handleEmailPress = () => {
    if (userData?.email) {
      Linking.openURL(`mailto:${userData.email}`);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {userData?.guiaavatar ? (
        <Image source={{ uri: userData.guiaavatar }} style={styles.avatar} />
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <FontAwesome name="user-circle-o" size={Dimensions.get('window').width * 0.14} color="#F0EAC7" />
        </View>
      )}
      {userData?.nome && <Text style={styles.cardText}>{userData.nome}</Text>}
      <Text style={styles.cardText}>{userData?.cidade || 'Cidade não disponível'}</Text>
      <Text style={styles.cardText}>{userData?.cadastur || 'Cadastur não disponível'}</Text>


      <View style={styles.socialMediaContainer}>
        <View style={styles.socialMediaIcons}>
          {userData?.instagram && (
            <TouchableOpacity onPress={() => handleSocialMediaPress(userData.instagram)}>
              <FontAwesome name='instagram' size={22} color='#E1306C' style={styles.socialMediaIcon} />
            </TouchableOpacity>
          )}
          {userData?.facebook && (
            <TouchableOpacity onPress={() => handleSocialMediaPress(userData.facebook)}>
              <FontAwesome name='facebook' size={22} color='#3b5998' style={styles.socialMediaIcon} />
            </TouchableOpacity>
          )}
          {userData?.telefone && (
            <>
              <TouchableOpacity onPress={handleWhatsAppPress}>
                <FontAwesome name='whatsapp' size={22} color='#23B17F' style={styles.socialMediaIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePhoneCallPress}>
                <MaterialIcons name='phone-in-talk' size={22} color='#8A0505' style={styles.socialMediaIcon} />
              </TouchableOpacity>
            </>
          )}
          {userData?.email && (
            <TouchableOpacity onPress={handleEmailPress}>
              <FontAwesome name='envelope-o' size={22} color='#924D8F' style={styles.socialMediaIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default GuiaCard;

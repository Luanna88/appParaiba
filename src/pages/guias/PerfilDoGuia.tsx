import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../guias/StylePerfilGuia';
import firebaseService from '../../services/firebaseService';
import { auth } from '../../../firebase.config';

const UserProfile: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { userId } = route.params as { userId: string };
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await firebaseService.findOne('Guias', userId);
                setUserData(userDoc);
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleDeleteProfile = async () => {
        try {
            setLoading(true);
            await firebaseService.delete(userId, 'Guias');
            const user = auth.currentUser;
            if (user) {
                await user.delete();
            }
            Alert.alert('Sucesso', 'Perfil excluído com sucesso.');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao excluir perfil:', error);
            Alert.alert('Erro', 'Não foi possível excluir o perfil.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!userData) {
        return <Text>Erro ao carregar dados do usuário</Text>;
    }

    const handleSocialMediaPress = (url: string) => {
        if (url) {
            Linking.openURL(url);
        }
    };

    const handlePhoneCallPress = () => {
        if (userData && userData.telefone) {
            Linking.openURL(`tel:${userData.telefone}`);
        } 
    };

    const handleWhatsAppPress = () => {
        if (userData && userData.telefone) {
            Linking.openURL(`whatsapp://send?phone=${userData.telefone}`);
        }
    };

    const handleEmailPress = () => {
        if (userData && userData.email) {
            Linking.openURL(`mailto:${userData.email}`);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {userData?.guiaavatar && (
                <Image source={{ uri: userData.guiaavatar }} style={styles.avatar} />
            )}
            {userData?.nome && <Text style={styles.label}>{userData.nome}</Text>}
            {userData?.cidade && <Text style={styles.label}>{userData.cidade}</Text>}
            {userData?.cadastur && <Text style={styles.label}>Cadastur: {userData.cadastur}</Text>}
            <View style={styles.socialMediaContainer}>
                {userData?.instagram && (
                    <TouchableOpacity onPress={() => handleSocialMediaPress(userData.instagram)}>
                        <FontAwesome name='instagram' size={25} color='#E1306C' />
                    </TouchableOpacity>
                )}
                {userData?.facebook && (
                    <TouchableOpacity onPress={() => handleSocialMediaPress(userData.facebook)}>
                        <FontAwesome name='facebook' size={25} color='#3b5998' />
                    </TouchableOpacity>
                )}
                {userData?.email && (
                    <TouchableOpacity onPress={handleEmailPress}>
                        <FontAwesome name='envelope-o' size={25} color='#924D8F' />
                    </TouchableOpacity>
                )}
                {userData?.telefone && (
                    <TouchableOpacity onPress={handlePhoneCallPress}>
                        <MaterialIcons name='phone-in-talk' size={25} color='#8A0505' />
                    </TouchableOpacity>
                )}
                {userData?.telefone && (
                    <TouchableOpacity onPress={handleWhatsAppPress}>
                        <FontAwesome name='whatsapp' size={25} color='#23B17F' />
                    </TouchableOpacity>
                )}
            </View>
            <View style={{marginTop: 55}}>
                <Button title="Excluir Perfil" onPress={handleDeleteProfile} color="#FF0000" />
            </View>
        </ScrollView>
    );
};

export default UserProfile;

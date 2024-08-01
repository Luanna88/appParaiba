import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Alert, Pressable, Modal, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../galeriaHome/StyleGaleriaMap";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebaseService from "../../services/firebaseService";

interface GaleriaGaleriaMapaProps {
    stamp: any
};

const GaleriaMapa: React.FC<GaleriaGaleriaMapaProps> = ({ stamp }) => {
    const [fotos, setFotos] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    useEffect(() => {
        const loadStoredPhotos = async () => {
            try {
                const storedPhotos = await AsyncStorage.getItem(`storedPhotos_${stamp.id}`);
                if (storedPhotos) {
                    setFotos(JSON.parse(storedPhotos));
                }
            } catch (error: any) {
                console.error('Erro ao carregar fotos no AsyncStorage', error.message);
            }
        };
        loadStoredPhotos();
    }, [stamp]);

    const savePhotosToStorage = async (updatedPhotos: any[], stamp: any) => {
        try {
            await AsyncStorage.setItem(`storedPhotos_${stamp.id}`, JSON.stringify(updatedPhotos));
        } catch (error: any) {
            console.error('Erro ao salvar fotos no AsyncStorage:', error.message);
        }
    };

    const handleSelecionarFoto = async (stamp: any) => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('Permissão negada para acessar a galeria de mídia');
            }
    
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const updatedPhotos: any = [...fotos];
                for (const asset of result.assets) {
                    const savedPhoto = await firebaseService.save({ uri: asset.uri, stampId: stamp.id }, 'GaleriaDeFotos');
                    updatedPhotos.push({ ...asset, id: savedPhoto.id, stampId: stamp.id });
                }
                setFotos(updatedPhotos);
                savePhotosToStorage(updatedPhotos, stamp);
            }
    
        } catch (error: any) {
            console.error('Erro ao selecionar foto:', error.message);
            Alert.alert('Erro', 'Não foi possível selecionar a foto.');
        }
    };
    const handleTirarFoto = async (stamp: any) => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('Permissão negada para acessar a câmera');
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const updatedPhotos: any = [...fotos];
                for (const asset of result.assets) {
                    const savedPhoto = await firebaseService.save({
                        uri: asset.uri,
                        stampId: stamp.id
                    }, 'GaleriaDeFotos');
                    updatedPhotos.push({ ...asset, id: savedPhoto.id, stampId: stamp.id });
                }
                setFotos(updatedPhotos);
                savePhotosToStorage(updatedPhotos, stamp);
            }

        } catch (error: any) {
            console.error('Erro ao tirar foto:', error.message);
            Alert.alert('Erro', 'Não foi possível tirar a foto.');
        }

    };

    const handleAdicionarFotos = () => {
        Alert.alert(
            'Adicionar Fotos',
            'Escolha uma opção:',
            [
                {
                    text: 'Selecionar da Galeria',
                    onPress: () => handleSelecionarFoto(stamp),
                },
                {
                    text: 'Tirar uma Nova Foto',
                    onPress: () => handleTirarFoto(stamp),
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    const handleDeleteFoto = async (photoId: string) => {
        try {
            // Deleta a foto do Firebase
            await firebaseService.delete(photoId, "GaleriaDeFotos");
    
            // Atualiza a lista local de fotos
            const updatedFotos = fotos.filter((foto) => foto.id !== photoId);
            setFotos(updatedFotos);
    
            // Atualiza o AsyncStorage
            savePhotosToStorage(updatedFotos, stamp);
        } catch (error: any) {
            console.error("Erro ao deletar foto:", error.message);
        }
    };

    const handleImagePress = (image: any) => {
        setSelectedImage(image);
        setIsModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.subTitle}>{stamp.nome}</Text>
                <Image source={{ uri: stamp.url }} style={styles.url} />

                <Pressable onPress={handleAdicionarFotos} style={({ pressed }) => ({ backgroundColor: pressed ? '#FEFBD5' : '#F0EAC7', top:30, height: 32, width: 155, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 40, marginTop: 5, elevation: 0.2 })}>
                    <Text style={styles.addPhoto}> ADICIONAR FOTOS </Text>
                </Pressable>
            </View>
            <ScrollView style={styles.barra01}>
                <View style={{flexDirection: 'row',flexWrap: 'wrap',  justifyContent: 'center', }}>
                    {fotos.map((foto: any, index: any) => (
                        <View key={index} style={styles.photoWrapper}>
                            <Pressable onPress={() => handleImagePress(foto)} >
                                <Image source={{ uri: foto.uri }} style={styles.photo}/>
                            </Pressable>
                            <Pressable onPress={() => handleDeleteFoto(foto.id)} style={({ pressed }) => ({ position: 'absolute', top: 10, right: 14, opacity: pressed ? 0.7 : 1 })}>
                                <Ionicons name='trash' size={20} color="#F0EAC7" />
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setIsModalVisible(false)} animationType="fade">
                <View style={styles.modalView}>
                    {selectedImage && (
                        <>
                            <Image source={{ uri: selectedImage.uri }} style={styles.fullImage} />
                            <Image source={require('../../../assets/img/logo/logobranco.png')} style={ styles.watermark} resizeMode='contain' />
                        </>
                    )}
                    <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                        <MaterialCommunityIcons name='progress-close' size={40} color="#F0EAC7" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );

};

export default GaleriaMapa;

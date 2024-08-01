import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, FlatList, Modal, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebaseService from "../../services/firebaseService";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./StylePassaporte";
import GaleriaFotos from "../galeriaPassaporte/GaleriaFotos";

const PassaporteVirtual: React.FC = () => {
    const route = useRoute();
    const cidade: any = route.params || {};
    const [stamps, setStamps] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStamp, setSelectedStamp] = useState<any[]>([]);
    const numColumns = 2;

    useEffect(() => {
        const fetchStamps = async () => {
            try {
                const stampData = await firebaseService.findAll("ConfirmVisitInfo");
                setStamps(stampData);
            } catch (error) {
                console.error("Error fetching carimbos:", error);
            }
        };

        fetchStamps();
    }, []);

    const handleDeleteStamp = async (stampId: string) => {
        try {
            // Recupera todas as fotos associadas ao carimbo
            const fotos = await firebaseService.findAll("GaleriaDeFotos");
            const fotosToDelete = fotos.filter((foto: any) => foto.stampId === stampId);
    
            // Deleta todas as fotos associadas ao carimbo
            for (const foto of fotosToDelete) {
                await firebaseService.delete(foto.id, "GaleriaDeFotos");
            }
    
            // Deleta o carimbo
            await firebaseService.delete(stampId, "ConfirmVisitInfo");
            setStamps((prevStamps) => prevStamps.filter((stamp) => stamp.id !== stampId));
        } catch (error) {
            console.error("Error deleting stamp:", error);
        }
    };

    const handleStampPress = (stamp: any) => {
        setSelectedStamp(stamp);
        setModalVisible(true);
    };

    const renderStampItem = ({ item }: { item: any }) => (
        <View style={styles.carimboContainer}>
            <TouchableOpacity onPress={() =>  handleStampPress(item)}>
                <Image source={{ uri: item.url }} style={styles.url} />
            </TouchableOpacity>
    
            <Text style={styles.text}>{item.cidade}</Text>
            <Text style={styles.text}>{item.nome}</Text>
            <Text style={styles.text}>Data: {item.data}</Text>
            <Text style={styles.text}>Hora: {item.hora}</Text>
    
            <View style={{ marginTop: 4 }} />
            <TouchableOpacity onPress={() => handleDeleteStamp(item.id)}>
                <Ionicons name="trash-outline" size={22} color='#E83F33' />
            </TouchableOpacity>
        </View>
    );
    return (
        <SafeAreaView style={[styles.container, styles.barra01]}>
            <FlatList data= {stamps} renderItem={renderStampItem } keyExtractor={(item, index) => index.toString()} contentContainerStyle={styles.carimboRowContainer} numColumns={numColumns} ListHeaderComponent={() => (
                <>
                <Text style={styles.galleryTitle}>Meus Cartões</Text>
                </>
            )}
            />
            {selectedStamp && (
                <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <View style={[styles.modalView,  { justifyContent: 'center', alignItems: 'center', top: '1%', flex: 1 }]}>
                        <GaleriaFotos stamp={selectedStamp}/>
                        <View>
                            <Pressable onPress={() => setModalVisible(false)} style={({pressed}) => ({ backgroundColor: pressed ? '#FEFBD5' : '#F0EAC7', width:80,height:30,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:6,top:-22, marginBottom:20,elevation:0.1})}>
                                <Text style={styles.textClose}> FECHAR </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    );
};

export default PassaporteVirtual;
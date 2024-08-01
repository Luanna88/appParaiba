import React, { useEffect, useRef, useState } from "react";
import { Animated, Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View, Pressable } from "react-native";
import MapView, { Marker, Region } from 'react-native-maps';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./StylesHome";
import firebaseService from "../../services/firebaseService";
import Roteiro from "../roteiro/Roteiro";
import PassaporteVirtual from "../passaporte/PassaporteVirtual";
import Contato from "../contato/Contato";
import ListaGuiasScreen from "../guias/ListaDeGuias";
import GaleriaMapa from "../galeriaHome/GaleriaMap";

const initialRegion: Region = {
  latitude: -7.2307,
  longitude: -35.8811,
  latitudeDelta: 5,
  longitudeDelta: 1,
};

interface Stamp {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  cidade: string;
  nome: string;
  data: string;
  hora: string;
  url: string;
  qrCode: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);
  const isFocused = useIsFocused();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isPassportModalVisible, setPassportModalVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisible] = useState(false);
  const [isListGuidesModalVisible, setListGuidesModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/IeHx1YgZGLg?autoplay=1&loop=1&playlist=IeHx1YgZGLg');
  const shadowAnim = useRef(new Animated.Value(0)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current; 
  const translateXAnim1 = useRef(new Animated.Value(0)).current;
  const translateXAnim2 = useRef(new Animated.Value(0)).current;
  const translateXAnim3 = useRef(new Animated.Value(0)).current;
  const [stampCoordinates, setStampCoordinates] = useState<Stamp[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState<Stamp | null>(null);
  const [isGalleryVisible, setGalleryVisible] = useState(false);
  const [showTouristMarkers, setShowTouristMarkers] = useState<boolean>(false);

  const handleRegionChangeComplete = (region: Region) => {
    const zoom = Math.round(Math.log2(360 / region.longitudeDelta)) + 2;
    setShowTouristMarkers(zoom > 9);
  };

  const fetchStamps = async () => {
    try {
      const stampData = await firebaseService.findAll("ConfirmVisitInfo");
      const coordinates: Stamp[] = stampData.map((carimbo: any) => ({
        id: carimbo.id,
        latitude: parseFloat(carimbo.latitude) || 0,
        longitude: parseFloat(carimbo.longitude) || 0,
        title: carimbo.nome,
        cidade: carimbo.cidade,
        nome: carimbo.nome,
        data: carimbo.data,
        hora: carimbo.hora,
        url: carimbo.url,
        qrCode: carimbo.qrCode,
      }));
      setStampCoordinates(coordinates);
    } catch (error) {
      console.error("Error fetching carimbo coordinates:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchStamps();
      if (mapRef.current) {
        mapRef.current.animateToRegion(initialRegion, 800);
      }
      setVideoUrl(
        "https://www.youtube.com/embed/IeHx1YgZGLg?autoplay=1&loop=1&playlist=IeHx1YgZGLg&controls=1&showinfo=0&rel=0"
      );
    }

    Animated.loop(
      Animated.sequence([
        Animated.timing(shadowAnim, {
          toValue: 15,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(shadowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
      
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    const createTranslateAnimation = (animValue: Animated.Value) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 10,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      );
    };
  
    createTranslateAnimation(translateXAnim1).start();
    createTranslateAnimation(translateXAnim2).start();
    createTranslateAnimation(translateXAnim3).start();
  }, [isFocused]);

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleOpenPassportModal = () => {
    setPassportModalVisible(true);
    fetchStamps();
    resetMapRegion();
  };

  const handleClosePassportModal = () => {
    setPassportModalVisible(false);
    fetchStamps();
    resetMapRegion();
  };

  const handleOpenContactModal = () => {
    setContactModalVisible(true);
  };

  const handleCloseContactModal = () => {
    setContactModalVisible(false);
    resetMapRegion();
  };

  const handleOpenListGuidesModal = () => {
    setListGuidesModalVisible(true);
  };

  const handleCloseListGuidesModal = () => {
    setListGuidesModalVisible(false);
    resetMapRegion();
  };

  const handleMarkerPress = (stamp: Stamp) => {
    setSelectedStamp(stamp);
    setModalVisible(true);
  };

  const resetMapRegion = () => {
    mapRef.current?.animateToRegion(initialRegion, 1000);
  };

  const renderStampItem = ({ item }: { item: Stamp }) => (
    <View style={styles.carimboContainer}>
      <Image source={{ uri: item.url }} style={styles.url} />
      <Text style={styles.text}>{item.cidade}</Text>
      <Text style={styles.text}>{item.nome}</Text>
      <Text style={styles.text}>Data: {item.data}</Text>
      <Text style={styles.text}>Hora: {item.hora}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.logoContainer, styles.barra01]}>
        <Image style={styles.logo} source={require('../../../assets/img/logo/logoparaibese.png')} />
      </View>
      <View style={styles.logoLinha} />
 
      <ScrollView 
        ref={scrollViewRef} 
        onMomentumScrollEnd={resetMapRegion} 
        onLayout={resetMapRegion}
      >
        <View style={styles.imageContainer}>
            <Animated.Image style={[styles.imagem01, { transform: [{ translateX: translateXAnim1 }] }]} source={require('../../../assets/img/logo/Ativo-3.png')} />
            <Animated.Image style={[styles.imagem02, { transform: [{ translateX: translateXAnim2 }] }]} source={require('../../../assets/img/logo/Ativo-4.png')} />
            <Animated.Image style={[styles.imagem03, { transform: [{ translateX: translateXAnim3 }] }]} source={require('../../../assets/img/logo/Ativo-5.png')} />
            <Animated.Image style={[styles.imagem04, { transform: [{ rotate: rotation }] }]} source={require('../../../assets/img/logo/ativo-2.png')}/>
            <View>
                <Text style={styles.quoteText}>"Prepare o coração e apaixone-se."</Text>
                <Text style={styles.quoteText}>"Encante-se conosco e emocione-se."</Text>
                <Text style={styles.quoteText}>"Roteiro feito com zelo, carinho e amor."</Text>
                <Text style={styles.quoteText}>"Paraibe-se venham conhecer conosco."</Text>
                <Text style={styles.quoteText}>"As belezas do nosso interior."</Text>
                <Text style={styles.autorText}> Poeta Lima Filho</Text>
                <Text style={styles.autorText}>     (Virgolima da Paraíba)</Text>

            </View>
        </View>
        <View style={{ marginTop: -60 }} /> 
        <View>
          <Animated.Text style={[styles.titleRoteiro, { textShadowOffset: { width: shadowAnim, height: shadowAnim }, textShadowRadius: shadowAnim, textShadowColor: '#696969' }]}>
             R O T E I R O
          </Animated.Text>
          <View style={{ marginTop: -40 }} />
          <Roteiro />
        </View>
        {isFocused && (
          <WebView
            style={{ height: 220, marginBottom: 40 }}
            source={{ uri: videoUrl }}
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback={true}
          />
        )}
        <View style={{ marginTop: 1 }} /> 
        <View>
          <Animated.Text style={[styles.titleRotas, { textShadowOffset: { width: shadowAnim, height: shadowAnim }, textShadowRadius: shadowAnim, textShadowColor: '#696969' }]}>
            R O T A S 
          </Animated.Text>
        </View>
        <MapView ref={mapRef} initialRegion={initialRegion} style={[{flex:1}, styles.mapContainer]} onRegionChangeComplete={handleRegionChangeComplete}>
        {stampCoordinates.map((coordinate, index) => (
                  <Marker
                    key={index}
                    coordinate={{ latitude: coordinate.latitude, longitude: coordinate.longitude }}
                    title={coordinate.title}
                    onPress={() => handleMarkerPress(coordinate)}
                  >
                    <Image source={{ uri: coordinate.url }} style={{ width: 45, height: 45, borderRadius: 20 }} />
                  </Marker>
          ))}
        </MapView>
      </ScrollView>
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={[styles.modalView2, { justifyContent: 'center', alignItems: 'center', top: '10%', flex: 1 }]}>
          {selectedStamp && renderStampItem({ item: selectedStamp })}
          <Pressable onPress={() => setGalleryVisible(true)} style={({ pressed }) => ({backgroundColor: pressed ? '#FEFBD5' : '#F0EAC7',width: 120,height: 30,alignSelf: 'center',justifyContent: 'center',alignItems: 'center',borderRadius: 5,marginBottom: 20,marginTop: 30,elevation: 0.5,top:10})}>
              <Text style={{ fontSize: 18, color: '#696969', fontFamily: 'SpecialElite_400Regular' }}>Ver Galeria</Text>
            </Pressable>
            <Pressable onPress={() => {setModalVisible(false); setGalleryVisible(false);}} style={({ pressed }) => ({backgroundColor: pressed ? '#FEFBD5' : '#F0EAC7',width: 90,top:-5,height: 30,alignSelf: 'center',justifyContent: 'center',alignItems: 'center', borderRadius: 5,marginBottom: 20,marginTop: 10,elevation: 0.5})}>
              <Text style={{ fontSize: 18, color: '#696969', fontFamily: 'SpecialElite_400Regular' }}>X</Text>
            </Pressable>
        </View>
      </Modal>
      {isGalleryVisible && selectedStamp&& (
  <Modal
    visible={isGalleryVisible}
    onRequestClose={() => setGalleryVisible(false)}
    transparent={true}
    animationType="fade"
  >
    <View style={[styles.modalView2, { justifyContent: 'center', alignItems: 'center', top: '1%', flex: 1 }]}>
      <GaleriaMapa stamp={selectedStamp} />
      <Pressable
        onPress={() => setGalleryVisible(false)}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#FEFBD5' : '#F0EAC7',
          height:20,
          width: 15,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          marginBottom: 10,
          marginTop: 10,
          elevation: 0.2,
        })}
      >
        <Text style={{ fontSize: 19, color: '#696969', fontFamily: 'SpecialElite_400Regular' }}>Fechar</Text>
      </Pressable>
    </View>
  </Modal>
)}

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleOpenPassportModal}>
          <MaterialCommunityIcons name="passport" size={30} color="#000" />
          <Text style={styles.textBar}>Passaporte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleOpenListGuidesModal}>
          <MaterialIcons name="person-search" size={30} color="#000" />
          <Text style={styles.textBar}>Guias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}  onPress={handleOpenContactModal}>
          <MaterialCommunityIcons name="message-question-outline" size={30} color="#000" />
          <Text style={styles.textBar}>Contato</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => Alert.alert('Sair')}>
          <Ionicons name="log-out-outline" size={27} color="#000" />
          <Text style={styles.textBar}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isPassportModalVisible} animationType="slide" transparent={true} onRequestClose={handleClosePassportModal} >
        <PassaporteVirtual />
        <TouchableOpacity style={styles.closeModalButton} onPress={handleClosePassportModal}>
          <Text style={styles.closeModalText}>Fechar</Text>
        </TouchableOpacity>
      </Modal>
      <Modal visible={isContactModalVisible} animationType="slide" transparent={true} onRequestClose={handleCloseContactModal} >
        <Contato />
        <TouchableOpacity style={styles.closeModalButton2} onPress={handleCloseContactModal}>
          <Text style={styles.closeModalText}>Fechar</Text>
        </TouchableOpacity>
      </Modal>
      <Modal visible={isListGuidesModalVisible} animationType="slide" transparent={true} onRequestClose={handleCloseListGuidesModal} >
        <ListaGuiasScreen />
        <TouchableOpacity style={styles.closeModalButton2} onPress={handleCloseListGuidesModal}>
          <Text style={styles.closeModalText}>Fechar</Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

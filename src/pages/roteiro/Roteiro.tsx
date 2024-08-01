import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles  from './StylesRoteiro';
import GaleriaRoteiro from '../galeriaRoteiro/GaleriaRoteiro';

type CityName = 'Araruna' | 'Areia' | 'Bananeiras' | 'Boqueirão' | 'Cabaceiras' | 'Campina Grande' | 'Queimadas';

interface CityData {
    info: string;
    image: any;
}

const cityData: Record<CityName, CityData> = {
    Araruna: {
        info: '" Conhecida pelo seu clima ameno que se distingui do quadro geral desta região se tornando uma ilha de clima ameno em pleno semi-árido, pois está inserida numa altitude de cerca de 590 metros acima do nível do mar, Araruna é um dos principais municípios do Agreste Paraibano, devido sua polarização aos demais municípios do Curimataú da Paraíba e Seridó potiguar, fazendo limite territorial com quatro municípios do estado do Rio Grande do Norte. "',
        image: require('../../../assets/img/roteiros/Araruna.png')
    },
    Areia: {
        info: '" Cidade acolhedora, com um centro histórico colorido das suas construções preservadas, Areia é um local, de grande valor histórico e cultural e os habitantes têm orgulho de dois filhos ilustre. "',
        image: require('../../../assets/img/roteiros/Areia.jpg')
    },
    Bananeiras: {
        info: '" Conhecida pelo seu delicioso inverno: clima ameno durante o dia, e um friozinho agradável depois do entardecer. Não é à toa que a cidade está na famosa Rota do Frio.A cidade, que borbulha na efervescência histórica, cultural e gastronômica da Paraíba, oferece cantos e encantos até mesmo nos dias mais quentes. "',
        image: require('../../../assets/img/roteiros/Bananeiras.jpg')
    },
    Boqueirão: {
        info: '" Conhecida como "Cidade das Águas", por possuir o segundo maior açude do estado da Paraíba, mas durante o mês de realização da FLIBO transforma-se na "Cidade das Rimas e Letras" para receber dezenas de escritores vindos de várias partes do país, além é claro dos apaixonados por Literatura. "',
        image: require('../../../assets/img/roteiros/Boqueirão.jpeg')
    },
    Cabaceiras: {
        info: '" Conhecida como a “Roliude Nordestina”, palco de vários filmes como: “O Alto da Compadecida”. E ainda palco da sensacional Festival do Bode Rei que é a maior feira de caprinos do Brasil. Nesta cidade também é possível visitar o Lajeado do Pai Mateus, um local único. "',
        image: require('../../../assets/img/roteiros/Cabaceiras.jpg')
    },
    'Campina Grande': {
        info: '" Também chamada de “Rainha da Borborema” e "Terra do Maior São João do Mundo". Além de ser uma das cidades paraibanas que mantém as tradições nordestinas, preservando a cultura regional com uma das comemorações mais tradicionais, o São João, festividade que ocorre no mês de junho, em 30 dias de festa, Campina Grande também promove eventos de destaque como o Encontro para Consciência Cristã, Encontro para Nova Consciência, Festival de Inverno e outras dezenas de eventos. "',
        image: require('../../../assets/img/roteiros/Campina Grande.jpg')
    },
    Queimadas: {
        info: '" Tem potencialiddade turística própria , seja no turismo d eventos de festas tradicionais (como a Festa de Reis), seja no turismo de aventura, que é praticado no complexo da Pedra do Touro, onde é possível fazer trilhas, práticas de rapel, acesso a gastronomia local e ainda visitar os doze sitios arqueológicos. "',
        image: require('../../../assets/img/roteiros/Queimadas.jpg')
    }
};

const Roteiro: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCity, setSelectedCity] = useState<CityName | null>(null);
    const [galleryModalVisible, setGalleryModalVisible] = useState(false);

    const handleCidadePress = (cidade: CityName) => {
        setSelectedCity(cidade);
        setModalVisible(true);
    };

    const handleOpenGallery = () => {
        setModalVisible(false);
        setGalleryModalVisible(true);
      };
    
      const handleCloseGallery = () => {
        setGalleryModalVisible(false);
      };
    

    return (

        <SafeAreaView style={styles.container}>
            
            <View style={[styles.rowContainer, styles.barra02]}>
                {Object.keys(cityData).map((cidade) => (
                    <TouchableOpacity key={cidade} onPress={() => handleCidadePress(cidade as CityName)}>
                        <View style={styles.itemContainer}>
                            <Image style={styles.image} source={cityData[cidade as CityName].image} />
                            <Text style={styles.text}>{cidade}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal visible={modalVisible} transparent={true} animationType='fade' onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedCity}</Text>
                        <Text style={styles.modalInfo}>{selectedCity && cityData[selectedCity].info}</Text>
                        <View style={styles.modalButtons}>
                            <Text style={styles.question}>Conhecer Rotas?</Text>
                            <View style={styles.buttonsContainner}>
                                <TouchableOpacity style={styles.button} onPress={handleOpenGallery}>
                                    <Text style={[styles.buttonText, {color: '#2576BA'}]}>SIM</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                                    <Text style={[styles.buttonText, {color: '#E83F33'}]}>NÃO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={galleryModalVisible} animationType='fade' transparent={true} onRequestClose={handleCloseGallery}>
                <GaleriaRoteiro cidade={selectedCity}/>
                <TouchableOpacity onPress={handleCloseGallery} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}> Fechar </Text>
                </TouchableOpacity>
            </Modal>

        </SafeAreaView>
    );
};

export default Roteiro;
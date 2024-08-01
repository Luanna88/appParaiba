import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput} from 'react-native';
import firebaseService from '../../services/firebaseService';
import GuiaCard from '../guias/CardGuia';
import styles from './StyleListaGuias';

const ListaGuiasScreen: React.FC = () => {
  const [guias, setGuias] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  

  useEffect(() => {
    const fetchGuias = async () => {
      try {
        const userData = await firebaseService.findAll('Guias');
        setGuias(userData);
      } catch (error) {
        console.error('Erro ao carregar guias:', error);
      }
    };

    fetchGuias();
  }, []);

  const filteredGuias = guias.filter(guia =>
    guia.cidade.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por cidade"
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredGuias.map((userData, index) => (
          <View key={userData.id} style={[styles.guiaCardWrapper, (index + 1) % 3 === 0 ? { marginRight: 0 } : null]}>
            <GuiaCard userData={userData} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ListaGuiasScreen;
import React, { useState, useRef } from 'react';
import { View, TextInput, Image, Alert, ScrollView, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../guias/StyleGuia';
import { useNavigation } from '@react-navigation/native';
import firebaseService from '../../services/firebaseService'; 
import { auth } from '../../../firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CadastrarGuia: React.FC = () => {
    const scrollViewRef = useRef<ScrollView>(null); 
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');
    const [cadastur, setCadastur] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [guiaavatar, setGuiaAvatar] = useState<string | null>(null);
    const [guiaId, setGuiaId] = useState<string>('');
    const navigation: any = useNavigation();

    const generateRandomId = () => {
        const min = 10000; 
        const max = 99999; 
        const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomId.toString(); 
    };

    const adicionarCodigoPais = (text: string) => {
        const codigoPais = '+55'; 
        if (!text.startsWith(codigoPais)) {
            setTelefone(codigoPais + text);
        } else {
            setTelefone(text);
        }
    };

    const handleSelecionarFoto = async () => {
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
                setGuiaAvatar(result.assets[0].uri); 
            }
        } catch (error: any) { 
            console.error('Erro ao selecionar foto:', error.message);
            Alert.alert('Erro', 'Não foi possível selecionar a foto.');
        }
    };

    const handleTirarFoto = async () => {
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
                setGuiaAvatar(result.assets[0].uri); 
            }
        } catch (error: any) {
            console.error('Erro ao tirar foto:', error.message);
            Alert.alert('Erro', 'Não foi possível tirar a foto.');
        }
    };

    const handleCadastro = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const guia = userCredential.user;
            if (guia) {
                setGuiaId(guia.uid); 
                Alert.alert('Conta criada', 'Sua conta foi criada com sucesso.');

                const guiaData = {
                    guiaId: guia.uid,
                    nome,
                    email,
                    telefone,
                    cidade,
                    cadastur,
                    instagram,
                    facebook,
                    guiaavatar,
                };

                const { id } = await firebaseService.save(guiaData, 'Guias');

                setNome('');
                setEmail('');
                setTelefone('');
                setCidade('');
                setCadastur('');
                setInstagram('');
                setFacebook('');
                setSenha('');
                setConfirmarSenha('');
                setGuiaAvatar(null);

                navigation.navigate('UserProfile', { userId: id });
            } else {
                throw new Error('Não foi possível obter as informações do usuário.');
            }
        } catch (error: any) {
            console.error('Erro ao realizar o cadastro:', error.message);
            Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
        }
    };

    return ( 
        <SafeAreaView>
            <ScrollView ref={scrollViewRef}>
                <Text style={styles.title}>Cadastrar Guia</Text>
                {guiaavatar ? (
                    <Image source={{ uri: guiaavatar }} style={styles.avatar} />
                ) : (
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <FontAwesome name="user-circle-o" size={100} color="#F0EAC7" />
                        <Pressable
                            onPress={handleSelecionarFoto}
                            style={({ pressed }) => ({
                                backgroundColor: pressed ? '#FEFBD5' : '#F0EAC7',
                                height: 40,
                                width: '40%',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 15,
                                marginBottom: '-5%',
                                marginTop:'10%'
                            })}
                        >
                            <Text style={{ fontSize: 18, color: '#696969', fontFamily:'LoveYaLikeASister_400Regular' }}>Selecionar Foto</Text>
                        </Pressable>
                        <Pressable
                            onPress={handleTirarFoto}
                            style={({ pressed }) => ({
                                backgroundColor: pressed ? '#FEFBD5' : '#F0EAC7',
                                height: 40,
                                width: '40%',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 15,
                                marginBottom: '8%',
                                marginTop:'9%'
                            })}
                        >
                            <Text style={{ fontSize: 18, color: '#696969', fontFamily:'LoveYaLikeASister_400Regular' }}>Tirar Foto</Text>
                        </Pressable>
                    </View>
                )}
                <TextInput
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                />
                <TextInput
                    placeholder="Telefone"
                    value={telefone}
                    onChangeText={adicionarCodigoPais}
                    style={styles.input}
                    keyboardType="phone-pad"
                />
                <TextInput
                    placeholder="Cidade"
                    value={cidade}
                    onChangeText={setCidade}
                    style={styles.input}
                />
                <TextInput
                    placeholder="CADASTUR"
                    value={cadastur}
                    onChangeText={setCadastur}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Instagram"
                    value={instagram}
                    onChangeText={setInstagram}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Facebook"
                    value={facebook}
                    onChangeText={setFacebook}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="Confirmar Senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    style={styles.input}
                    secureTextEntry
                />
                <Pressable
                    onPress={handleCadastro}
                    style={({ pressed }) => ({
                        backgroundColor: pressed ? '#FEFBD5' : '#F0EAC7',
                        height: 40,
                        width: '40%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        marginTop: 20,
                    })}
                >
                    <Text style={{ fontSize: 18, color: '#696969', fontFamily:'LoveYaLikeASister_400Regular' }}>Cadastrar</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CadastrarGuia;
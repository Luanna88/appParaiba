import React, { useRef, useState } from 'react';
import {Text, TextInput, View,  Alert, TouchableOpacity, ScrollView,Linking, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "../contato/StyleContato";

const Contato: React.FC = () => {
    const scrollViewRef = useRef<ScrollView>(null); 
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [assunto, setAssunto] = useState('');
    const [messagem, setMessagem] = useState('');
    const [isChecked, setChecked] = useState(false);

    const handleSubmit = () => {
        if (isChecked) {
          Alert.alert(
            'Formulário enviado',
            `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto}\nMensagem: ${messagem}`,
            [
              {
                text: 'OK',
                onPress: () => {
                  Alert.alert('Email enviado', 'Sua mensagem foi enviada para contato@pbtur.com.br com sucesso.');
                },
              },
            ]
          );
        } else {
          Alert.alert('Consentimento necessário', 'Por favor, concorde com a política de coleta e armazenamento de dados.');
        }
      };
      
      const handlePhoneCall = (phoneNumber: string) => {
        Alert.alert(
          'Fazer ligação',
          `Deseja ligar para ${phoneNumber}?`,
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Ligar',
              onPress: () => Linking.openURL(`tel:${phoneNumber}`),
            },
          ],
          { cancelable: false }
        );
      };
    
      const handleEmail = (emailAddress: string) => {
        Alert.alert(
          'Enviar email',
          `Deseja enviar um email para ${emailAddress}?`,
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Enviar',
              onPress: () => Linking.openURL(`mailto:${emailAddress}`),
            },
          ],
          { cancelable: false }
        );
      };
    
    return (
        <SafeAreaView  style={[styles.container, styles.barra01]}>
            <ScrollView  ref={scrollViewRef}>
                <View style={{marginTop:15}}>
                    <Text style={styles.header}>TIRE SUAS DÚVIDAS</Text>
                    <Text style={styles.subheader}>Prepare-se para viver novas experiências. Tire todas as suas dúvidas sobre nosso roteiro. Nós queremos ajudar você!</Text>
                    <View style={{marginTop:15}}/>
                        <TouchableOpacity onPress={() => handlePhoneCall('+558335332652')}>
                            <View style={styles.telefoneContainer}>
                                <SimpleLineIcons name='phone' size={18} color={'#000'} style={[styles.telefoneIcon, {top:-8}]} />
                                <Text style={styles.label}> +55 (83) 3533 2652</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handlePhoneCall('+558335332653')}>
                            <View style={styles.telefoneContainer}>
                                <SimpleLineIcons name='phone' size={18} color={'#000'} style={[styles.telefoneIcon, {top:-7}]}/>
                                <Text style={styles.label}> +55 (83) 3533 2653</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleEmail('contato@pbtur.com.br')}>
                            <View style={styles.emailContainer}>
                                <SimpleLineIcons name='envelope' size={18} color={'#000'} style={[styles.telefoneIcon, {top:-6.5}]} />
                                <Text style={styles.label}> contato@pbtur.com.br</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{marginTop:25}}/>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Assunto"
                value={assunto}
                onChangeText={setAssunto}
            />
            <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Mensagem"
                value={messagem}
                onChangeText={setMessagem}
                multiline
            />
            <View style={styles.checkboxContainer}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#F0EAC7' : undefined}
                />
                    <Text style={styles.label}>Concordo que meus dados enviados </Text>
                    <Text style={styles.label2}> sejam coletados e armazenados.</Text>
                </View>
                <Pressable
                    onPress={handleSubmit}
                    style={({ pressed }: any) => ({
                        backgroundColor: pressed ? '#FEFBD5' : '#F0EAC7',
                        height: 40,
                        width: 220,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        marginBottom: '10%',
                        marginTop:'1%'
                    })}
                    >
                        <Text style={{ fontSize: 20, color: '#696969',fontFamily:'LoveYaLikeASister_400Regular' }}>Enviar minha dúvida</Text>
                </Pressable>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
};

export default Contato;
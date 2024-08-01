import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { SpecialElite_400Regular } from '@expo-google-fonts/special-elite';
import { LoveYaLikeASister_400Regular } from '@expo-google-fonts/love-ya-like-a-sister';
import Home from './src/pages/home/Home';
import CadastrarGuia from './src/pages/guias/GuiaTuristico';
import PerfilDoGuia from './src/pages/guias/PerfilDoGuia';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          SpecialElite_400Regular,
          LoveYaLikeASister_400Regular,
        });
      } catch (error) {
        console.error('Error loading assets:', error);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{flex:1}} onLayout={onLayout}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen  options={{ headerShown: false }} name="Home" component={Home}/>
          <Stack.Screen  options={{ headerShown: false }} name="Cadastrar Guia" component={CadastrarGuia}/>
          <Stack.Screen  options={{ headerShown: false }} name="UserProfile" component={PerfilDoGuia}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )

};

export default App;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/homePage/HomePage';
import DetailScreen from '../screens/detailPage/DetailPage';
import FavoritePage from '../screens/favoritePage/favoritePage';
import ProfilePage from '../screens/profilePage/ProfilePage';
import { Drug } from '../types/drugs';

export type RootStackParamList = {
  'İlaçlar': undefined;
  'İlaç Detayı': { drug: Drug };
  'Favoriler': undefined;
  'Profil': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="İlaçlar" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="İlaç Detayı" component={DetailScreen} />
        <Stack.Screen name="Favoriler" component={FavoritePage} options={{ headerShown: false }}/>
        <Stack.Screen name="Profil" component={ProfilePage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

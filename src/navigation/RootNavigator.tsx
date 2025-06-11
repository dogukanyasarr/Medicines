import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/homePage/HomePage';
import DetailScreen from '../screens/detailPage/DetailPage';
import FavoritePage from '../screens/favoritePage/favoritePage';
import ProfilePage from '../screens/profilePage/ProfilePage';
import WelcomePage from '../screens/welcomePage/WelcomePage';
import LoginPage from '../screens/loginPage/LoginPage';
import SignupPage from '../screens/signupPage/SignupPage';
import { Drug } from '../types/drugs';

export type RootStackParamList = {
  'Welcome': undefined;
  'Login': undefined;
  'Signup': undefined;
  'İlaçlar': undefined;
  'İlaç Detayı': { drug: Drug };
  'Favoriler': undefined;
  'Profil': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomePage} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={SignupPage} options={{ headerShown: false }}/>
        <Stack.Screen name="İlaçlar" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="İlaç Detayı" component={DetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Favoriler" component={FavoritePage} options={{ headerShown: false }}/>
        <Stack.Screen name="Profil" component={ProfilePage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

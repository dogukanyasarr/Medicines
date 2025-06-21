// src/services/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drug } from '../types/drugs';

const FAVORITES_KEY = 'FAVORITE_DRUGS';

export const getFavoriteDrugs = async (): Promise<Drug[]> => {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
};

export const addFavoriteDrug = async (drug: Drug): Promise<void> => {
  const current = await getFavoriteDrugs();
  const exists = current.some(item => item.id === drug.id);
  if (!exists) {
    current.push(drug);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(current));
  }
};

export const removeFavoriteDrug = async (id: string): Promise<void> => {
  const current = await getFavoriteDrugs();
  const updated = current.filter(item => item.id.toString() !== id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const clearFavorites = async (): Promise<void> => {
  await AsyncStorage.removeItem(FAVORITES_KEY);
};

// src/services/WebApi.ts
import axios from 'axios';
import { Drug } from '../types/drugs';

const BASE_URL = 'http://10.0.2.2:8000'; // Android emülatörü için 127.0.0.1 yerine bu IP'yi kullan

export const getDrugs = async (): Promise<Drug[]> => {
  const response = await axios.get<Drug[]>(`${BASE_URL}/drugs`);
  return response.data;
};

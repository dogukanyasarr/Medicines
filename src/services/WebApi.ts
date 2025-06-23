// src/services/WebApi.ts
import axios from 'axios';
import { Drug } from '../types/drugs';

const BASE_URL = 'http://10.0.2.2:8000'; // Android emülatörü için 127.0.0.1 yerine bu IP'yi kullan

export const getDrugs = async (): Promise<Drug[]> => {
  const response = await axios.get(`${BASE_URL}/drugs`);
  return response.data.map((item: any, idx: number) => ({
    id: idx.toString(),
    barcode: item.barcode,
    productName: item.product_name,
    activeIngredient: item.active_ingredient,
    atcCode: item.atc_code,
    company: item.manufacturer,
    licenseDate: item.license_date,
    licenseNumber: item.license_number,
    suspended: false,
    changeDate: item.change_date,
  }));
};

export const askQuestion = async (question: string): Promise<string> => {
  const response = await axios.post<{ answer: string }>(`${BASE_URL}/ask`, { question });
  return response.data.answer;
};

export const login = async (email: string, password: string): Promise<{ firstName: string; lastName: string; profilePhoto: string }> => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data.user;
};

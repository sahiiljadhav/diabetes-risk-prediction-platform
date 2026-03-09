import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const predictDiabetes = async (data: any) => {
  try {
    const response = await api.post('/predict', data);
    return response.data;
  } catch (error) {
    console.error('Prediction API error:', error);
    throw error;
  }
};

// Calculator APIs
export const calculateBMI = async (height: number, weight: number) => {
  try {
    const response = await api.post('/calculators/bmi', { height, weight });
    return response.data;
  } catch (error) {
    console.error('BMI calculation error:', error);
    throw error;
  }
};

export const calculateCalories = async (data: {
  age: number;
  weight: number;
  height: number;
  gender: string;
  activity: string;
}) => {
  try {
    const response = await api.post('/calculators/calorie', data);
    return response.data;
  } catch (error) {
    console.error('Calorie calculation error:', error);
    throw error;
  }
};

export const calculateDailyRisk = async (data: {
  sleep: number;
  exercise: number;
  water: number;
  sugar: number;
  stress: number;
}) => {
  try {
    const response = await api.post('/calculators/daily-risk', data);
    return response.data;
  } catch (error) {
    console.error('Daily risk calculation error:', error);
    throw error;
  }
};

export const logSugarIntake = async (foodName: string, sugar: number) => {
  try {
    const response = await api.post('/calculators/sugar', { foodName, sugar });
    return response.data;
  } catch (error) {
    console.error('Sugar logging error:', error);
    throw error;
  }
};

export const getCalculatorHistory = async () => {
  try {
    const response = await api.get('/calculators/history');
    return response.data;
  } catch (error) {
    console.error('Calculator history error:', error);
    throw error;
  }
};

export default api;

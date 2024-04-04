import axios, { type AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_MOCK_API as string,
});
export const get = async (url: string): Promise<AxiosResponse> => instance.get(url);

import axios, { AxiosRequestConfig } from 'axios';

import { User } from '../type';
import { baseUrl } from './constants';

export function getJWTHeader(user: User): Record<string, string> {
  return { Authorization: `Bearer ${user.userCode}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);

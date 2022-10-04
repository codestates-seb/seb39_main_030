import { axiosInstance } from '../../../../../../../../chat/seb39_main_030/client/src/axiosInstance';
import React from 'react';
import { Questions } from '../../../../../../../../chat/seb39_main_030/client/src/type';

const getAdminContact = async (): Promise<Questions[]> => {
  const { data } = await axiosInstance.post('/');
  return data;
};

export default function useAdminContact() {
  return <div>useAdminContact</div>;
}

import axios from 'axios';

export const fetchWithToken = async (url: string, token: string) => {
  const res = await axios.get(url, { headers: { Authorization: 'Bearer ' + token } });
  return res.data;
};

import API from './adapter.ts';

export const getExchangeRate = async () => {
  const res = await API.Get('v4/latest');
  return res.data;
};

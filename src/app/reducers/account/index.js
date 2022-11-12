import {  createSlice } from '@reduxjs/toolkit'
import { API } from '../../data';
const initialState = {
  data: [],
  address: null,
  status: 'idle'
};

const FeatureSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    changed: (state, { payload }) => {
      state.address = payload
    }
  },
});

export default FeatureSlice.reducer;
// wallet.digiathon.com
// faucet.digiathon.com
// explorer.digiathon.com
// explorer.digiathon.com



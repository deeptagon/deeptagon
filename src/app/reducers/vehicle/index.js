import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callAPI } from '../../data/web3';

const initialState = {
  data: {}, 
  status: {},
  lastLoad: {}
};
export const fetchVehicle = createAsyncThunk(
  'vehicle/fetch',
  callAPI.getVehicle
);

const VehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicle.fulfilled, (state, {payload:{id,...data}}) => {
        state.data[id] = data
        state.status[id] = "loaded"
        state.lastLoad[id] = now()
      });
  },
});

export default VehicleSlice.reducer;
// wallet.digiathon.com
// faucet.digiathon.com
// explorer.digiathon.com
// explorer.digiathon.com


const now = Math.round(Date.now()/1000)
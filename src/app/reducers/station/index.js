import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callAPI } from '../../data/web3';

const initialState = {
  data: {}, 
  status: {},
  lastLoad: {}
};
export const fetchStation = createAsyncThunk(
  'station/fetch',
  callAPI.getStation
);

const StationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStation.fulfilled, (state, {payload:{id,...data}}) => {
        state.data[id] = data
        state.status[id] = "loaded"
        state.lastLoad[id] = now()
      });
  },
});

export default StationSlice.reducer;
// wallet.digiathon.com
// faucet.digiathon.com
// explorer.digiathon.com
// explorer.digiathon.com


const now = Math.round(Date.now()/1000)
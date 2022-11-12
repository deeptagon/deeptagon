import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../data';

const initialState = {
  options: [],
  slugIdMapping: {},
  status: 'idle',
};

export const fetchBrands = createAsyncThunk(
  'brands/fetch',
  API.getCompanies
)

const brandsSlice = createSlice({
  name: 'counter',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, { payload: companies }) => {
        state.status = 'loaded';
        state.options = companies.map(({ account: id, name }) => ({ id, name }))
        state.slugIdMapping = Object.fromEntries(companies.map(({ slug, account }) => [slug, account]))
      });
  },
});


export default brandsSlice.reducer;

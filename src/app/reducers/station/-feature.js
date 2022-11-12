import { createSlice } from '@reduxjs/toolkit'

const sessionState = sessionStorage.getItem("feature")
const featureSlice = createSlice({
  name: 'feature',
  initialState: sessionState
    ? JSON.parse(sessionState)
    : {
      
    },
  reducers: {
    action: (state, { payload: { key } }) => {
      
      state.key = 
      sessionStorage.setItem("feature", JSON.stringify({
        
      }))
    }
  }
})


export default featureSlice.reducer;

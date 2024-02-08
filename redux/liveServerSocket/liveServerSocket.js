import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: null,
    isConnected: false, // Add isConnected state
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    clearSocket: (state) => {
      state.socket = null;
      state.isConnected = false; // Clear isConnected state
    },
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setSocket, clearSocket, setConnected } = socketSlice.actions;
export const selectSocket = (state) => state.socket.socket;
export const selectIsConnected = (state) => state.socket.isConnected; // Add selector for isConnected
export const socketReducer = socketSlice.reducer;

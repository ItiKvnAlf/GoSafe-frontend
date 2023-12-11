import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';



// Define a type for the slice state
interface AuthState {
    token: string;
    isAuthenticated: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
    token: '',
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { token } = action.payload;
            state.token = token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = '';
            state.isAuthenticated = false;
        },
    },
});



export const { login, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selecAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import {RootState} from './store';


interface LoginUser {
    email: string;
    password: string;
}

// Define a type for the slice state
interface AuthState {
    user: LoginUser;
    token: string;
    isAuthenticated: boolean;
}

// Define the initial state using that type
const initialState: AuthState= {
    user:{
        email: '',
        password: ''
    },
    token: '',
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        liveEmail: (state, action) => {
            const { email } = action.payload;
            state.user.email = email;
        },
        livePassword: (state, action) => {
            const { password } = action.payload;
            state.user.password = password;
        },
        login: (state, action) => {
            const { token } = action.payload;
            state.token = token;
            state.isAuthenticated = true ;
        },
        logout: (state) => {
            state.token = '';
            state.isAuthenticated = false;
        },
    },
});



export const { liveEmail,livePassword,login, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selecAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
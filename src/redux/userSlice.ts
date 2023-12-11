import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';


// Define a type for the slice state
interface UserState {
    name: string;
    email: string;
    rut: string;
    phone: string;
    address: string;
}

const initialState: UserState = {
    name: '',
    email: '',
    rut: '',
    phone: '',
    address: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        UpdateUser: (state, action) => {
            const { name, email, rut, phone } = action.payload;
            state.name = name;
            state.email = email;
            state.rut = rut;
            state.phone = phone;
        },

        updateName: (state, action) => {
            const { name } = action.payload;
            state.name = name;
        },

        updateEmail: (state, action) => {
            const { email } = action.payload;
            state.email = email;
        },

        updatePhone: (state, action) => {
            const { phone } = action.payload;
            state.phone = phone;
        },

        updateAddress: (state, action) => {
            const { address } = action.payload;
            state.address = address;
        },
    }
});

export const { UpdateUser, updateName, updateEmail, updatePhone, updateAddress } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';


interface Contacts {
    name: string;
    email: string;
    phone: string;
}


// Define a type for the slice state
interface UserState {
    name: string;
    email: string;
    rut: string;
    phone: string;
    address: string;
    contacts: Contacts[];
}

const initialState: UserState = {
    name: '',
    email: '',
    rut: '',
    phone: '',
    address: '',
    contacts: []
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        UpdateUser: (state, action) => {
            const { name, email, rut, phone, contacts } = action.payload;
            state.name = name;
            state.email = email;
            state.rut = rut;
            state.phone = phone;
            if (contacts !== undefined) {
                state.contacts = contacts;
            }
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
        createContact: (state, action) => {
            const { name, email, phone } = action.payload;
            state.contacts.push({ name, email, phone });
        }
    }
});

export const { UpdateUser, updateName, updateEmail, updatePhone, updateAddress } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
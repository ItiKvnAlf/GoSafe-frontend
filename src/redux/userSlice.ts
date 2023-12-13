import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';


interface Contacts {
    user_id: string;
    name: string;
    email: string;
    phone: string;
}


// Define a type for the slice state
export interface UserState {
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
            const { name, email, rut, phone, contacts, address } = action.payload;
            state.name = name;
            state.email = email;
            state.rut = rut;
            state.phone = phone;
            if (contacts !== undefined) {
                state.contacts = contacts;
            }
            state.address = address;
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
        updateContacts: (state, action) => {
            const { contacts } = action.payload;
            state.contacts = contacts;
        },
        createContact: (state, action) => {
            const { name, email, phone, user_id } = action.payload;
            state.contacts = [...state.contacts, { user_id, name, email, phone }];
        }
    }
});

export const { UpdateUser, updateName, updateEmail, updatePhone, updateAddress, updateContacts, createContact } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
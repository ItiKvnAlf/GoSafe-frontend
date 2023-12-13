import React, { useEffect } from 'react';
import { ContactsList } from '../components';
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { UpdateUser } from '../redux/userSlice';

const Contacts: React.FC = () => {

    const user = useAppSelector((state) => state.user);
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');
    const userID = jwtDecode(token!).own;
    const header_config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const data_config = {
        name: user.name,
        phone: user.phone,
        address: user.address

    };

    useEffect(() => {
        document.title = 'Contactos';

        const ProfileFetch = async () => {
            const response = await axios.get("/users/" + userID, header_config);
            const data = response.data.data;
            dispatch(UpdateUser({
                name: data.name,
                email: data.email,
                phone: data.phone,
                rut: data.rut,
                address: data.address,
                contacts: data.contacts
            }));
        }
        ProfileFetch();
    }), [];



    return (
        <ContactsList
            user={user}
            maxHeightValue='100px'
            onContactSelectionChange={() => false}
        />
    );
};

export default Contacts;
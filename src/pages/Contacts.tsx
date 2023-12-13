import React, { useEffect } from 'react';
import { ContactsList } from '../components';
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { UpdateUser } from '../redux/userSlice';
import { IonBackButton, IonButtons, IonCheckbox, IonContent, IonItem, IonList, IonTitle } from '@ionic/react';

const Contacts: React.FC = () => {




    const user = useAppSelector((state) => state.user);
    const dispatch = useDispatch();

    const token = localStorage.getItem('token');
    const userID = jwtDecode(token!).own;
    const header_config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        document.title = 'Contactos';

        const ProfileFetch = async () => {

            const response = await axios.get("/users/" + userID, header_config);
            if (response.status === 200) {
                const data = response.data.data;

                dispatch(UpdateUser({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    rut: data.rut,
                    address: data.address,
                    contacts: data.Contacts
                }));

            }

        }
        ProfileFetch();
    }, []);



    return (

        <>
            <IonContent fullscreen color="light">

                <IonButtons
                    slot="start"

                >
                    <IonBackButton
                        defaultHref="/profile"
                    ></IonBackButton>
                </IonButtons>
                <IonTitle style={{ marginTop: '5%', textAlign: 'center' }}>Lista de contactos</IonTitle>
                {user.contacts.length === 0 ? (
                    <p style={{ textAlign: "center", marginLeft: "10%", marginRight: "10%" }}>
                        'No hay contactos'
                    </p>
                ) : (
                    <div
                        style={{
                            maxHeight: "1000px",
                            overflowY: "auto",
                            textAlign: "center",
                            marginTop: "10%",
                            marginLeft: "10%",
                            marginRight: "10%",
                            borderRadius: "20px",
                        }}
                    >
                        <IonList>
                            {user.contacts.map((contact, index) => (
                                <IonItem key={index}>
                                    {contact.name}
                                </IonItem>
                            ))}
                        </IonList>
                    </div>
                )}


            </IonContent>
        </>
    );
};

export default Contacts;
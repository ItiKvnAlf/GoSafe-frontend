import { IonAlert } from "@ionic/react";
import { useContacts } from "../hooks/useContacts";
import { ContactCreate } from "./axios/custom";
import { useAppSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";



const PopOutContact: React.FC = () => {

    const auth = useAppSelector((state) => state.auth);

    const userID = jwtDecode(auth.token).own!;

    const {
        name,
        email,
        phone,
        setEmail,
        setPhone,
        setName,
    } = useContacts();

    const handleName = (text: string) => {
        setName(text);
    }

    const handleEmail = (text: string) => {
        setEmail(text);
    }

    const handlePhone = (text: string) => {
        setPhone(text);
    }

    const handleCreateContact = async () => {
        const response = await ContactCreate().post("/contacts",
            {
                user_id: userID,
                name: name,
                email: email,
                phone: phone,
            },
        );
        if (response.status === 201) {
            console.log("Contacto creado");
        }
    }
    return (
        <>
            <IonAlert
                trigger="present-alert"
                header="Añade tu nuevo contacto"
                subHeader="Para salir, presiona fuera del recuadro"
                buttons={[
                    {
                        text: 'Añadir',
                        handler: handleCreateContact
                    },
                ]}
                inputs={[
                    {
                        placeholder: 'Name (max 8 characters)',
                        type: 'text',
                        attributes: {
                            maxlength: 15,

                        },
                        handler(input) {
                            handleName(input.value);
                        },
                    },
                    {
                        placeholder: 'email',
                        type: 'email',
                        attributes: {
                            maxlength: 15,

                        },
                        handler(input) {
                            handleEmail(input.value);
                        },
                    },
                    {
                        placeholder: 'phone (9xxxxxxxx)',
                        attributes: {
                            maxlength: 9,
                            minlength: 9,
                        },
                        handler(input) {
                            handlePhone(input.value);
                        },
                    },


                ]}
            ></IonAlert>
        </>
    );

}


export default PopOutContact;
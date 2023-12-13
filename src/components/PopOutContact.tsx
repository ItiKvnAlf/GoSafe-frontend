import { IonAlert } from "@ionic/react";
import { useContacts } from "../hooks/useContacts";
import { useAppSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import axios from "axios";



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
        console.log("handleCreateContact");
        console.log(userID, name, email, phone);
        // const response = await axios.post("/contacts",
        //     {
        //         user_id: userID,
        //         name: name,
        //         email: email,
        //         phone: phone,
        //     },
        //     {
        //         headers: { Authorization: `Bearer ${auth.token}` }
        //     }
        // );
        // if (response.status === 201) {
        //     console.log("Contacto creado");
        // }
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
                        name: 'name',
                        placeholder: 'Name (max 8 characters)',
                        type: 'text',
                        attributes: {
                            maxlength: 15,

                        },
                        handler: (input) => {
                            console.log("name:", input.attributes)

                        },

                    },
                    {
                        name: 'email',
                        placeholder: 'email',
                        type: 'email',
                        attributes: {
                            maxlength: 15,

                        },
                        handler(input) {
                            console.log("email:", input)
                            handleEmail(input.value);
                        },
                    },
                    {
                        name: 'phone',
                        placeholder: 'phone (9xxxxxxxx)',
                        attributes: {
                            maxlength: 9,
                            minlength: 9,
                        },
                        handler(input) {
                            console.log("phone:", input)
                            handlePhone(input.value);
                        },
                    },
                ]

                }


            ></IonAlert>
        </>
    );

}


export default PopOutContact;
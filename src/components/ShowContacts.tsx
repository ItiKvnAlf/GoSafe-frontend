import {
    IonPage,
    IonContent,
    IonIcon,
    IonItem,
    IonInput,
    IonAlert,
    IonTitle,
    IonBackButton,
    IonButtons
} from "@ionic/react";

import {
    person,
    mail,
    call
} from "ionicons/icons";

import { useContacts } from "../hooks/useContacts";
import { jwtDecode } from "jwt-decode";
import { ButtonFilled } from "./common";
import axios from "axios";

const ShowContacts: React.FC = () => {


    const {
        email,
        phone,
        name,
        success,
        setEmail,
        setPhone,
        setName,
        setSuccess
    } = useContacts();


    const handleCreateContact = async () => {

        const userID = jwtDecode(localStorage.getItem("token")!).own!;
        const response = await axios.post("/contacts",
            {
                user_id: userID,
                name: name,
                email: email,
                phone: phone,
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            }
        );
        if (response.status === 201) {
            setSuccess(true)
        }
    }

    return (
        <IonPage>
            <IonButtons slot="start">
                <IonBackButton
                    defaultHref="/profile"
                ></IonBackButton>
            </IonButtons>
            <IonContent fullscreen color="light">
                <IonTitle style={{ marginTop: '5%', textAlign: 'center' }}>Datos del nuevo contacto :D</IonTitle>
                <IonItem style={{ marginTop: '5%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px' }}>
                    <IonIcon size='small' icon={person} color='tertiary'></IonIcon>
                    <IonInput
                        style={{ textAlign: 'center', fontSize: '12px' }}
                        value={name}
                        labelPlacement="stacked"
                        placeholder="Nombre de usuario"
                        maxlength={30}
                        onIonInput={(e) =>
                            setName(e.detail.value!)
                        }

                    />
                </IonItem>
                <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px' }}>
                    <IonIcon size='small' icon={mail} color='tertiary'></IonIcon>
                    <IonInput
                        style={{ textAlign: 'center', fontSize: '12px' }}
                        value={email}
                        labelPlacement="stacked"
                        type="email"
                        maxlength={30}
                        placeholder="correo@gmail.com"
                        onIonInput={(e) =>
                            setEmail(e.detail.value!)
                        }


                    />
                </IonItem>
                <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px' }}>
                    <IonIcon size='small' icon={call} color='tertiary'></IonIcon>
                    <IonInput
                        style={{ textAlign: 'center', fontSize: '12px' }}
                        value={phone}
                        labelPlacement="stacked"
                        placeholder="9xxxxxxxx"
                        maxlength={9}
                        onIonInput={(e) =>
                            setPhone(e.detail.value!)
                        }

                    />
                </IonItem>
                <ButtonFilled
                    text="Añadir Contacto"
                    onClick={handleCreateContact}
                    loading={false} />
                <IonAlert
                    isOpen={success}
                    header="Contacto añadido :D"
                    message="El contacto se ha creado."
                    buttons={['OK']}
                    onDidDismiss={() => setSuccess(false)}
                ></IonAlert>
            </IonContent>
        </IonPage>
    );
}

export default ShowContacts;
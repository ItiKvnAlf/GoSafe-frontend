import {
    IonPage,
    IonContent,
    IonIcon,
    IonItem,
    IonInput,
    IonAlert
} from "@ionic/react";

import {
    person,
    mail,
    call
} from "ionicons/icons";

import { useContacts } from "../hooks/useContacts";

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

    return (
        <IonPage>
            <IonContent fullscreen color="light">
                <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px' }}>
                    <IonIcon size='small' icon={person} color='tertiary'></IonIcon>
                    <IonInput
                        style={{ textAlign: 'center', fontSize: '12px' }}
                        value={name}
                        labelPlacement="stacked"
                        placeholder="Nombre de usuario"
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
                        placeholder="Correo electrónico"
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
                        placeholder="Celular"
                        onIonInput={(e) =>
                            setPhone(e.detail.value!)
                        }
                    />
                </IonItem>
                <IonAlert
                    isOpen={success}
                    header="Datos actualizados"
                    subHeader=":D"
                    message="Los datos han sido actualizados correctamente."
                    buttons={['OK']}
                    onDidDismiss={() => setSuccess(false)}
                ></IonAlert>
            </IonContent>
        </IonPage>
    );
}

export default ShowContacts;
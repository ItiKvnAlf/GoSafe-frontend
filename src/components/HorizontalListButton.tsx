import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";
import { people, add, list } from "ionicons/icons";
import PopOutContact from "./PopOutContact";


const handleRedirectContacts = () => {
    (window as any).location = '/contacts';
}

const HorizontalListButton: React.FC = () => {
    return (
        <IonFab slot="fixed" horizontal="end" vertical="top">
            <IonFabButton
                color="tertiary"
                size="small"
            >
                <IonIcon
                    icon={people}
                    color="light"
                ></IonIcon>
            </IonFabButton>
            <IonFabList side="bottom">
                <IonFabButton
                    onClick={handleRedirectContacts}
                >
                    <IonIcon
                        icon={list}
                        color="tertiary"
                    ></IonIcon>
                </IonFabButton>
            </IonFabList>
            <IonFabList side="start">
                <IonFabButton id="present-alert">
                    <PopOutContact />
                    <IonIcon
                        icon={add}
                        color="tertiary"
                    ></IonIcon>
                </IonFabButton>
            </IonFabList>
        </IonFab>
    )
}

export default HorizontalListButton;
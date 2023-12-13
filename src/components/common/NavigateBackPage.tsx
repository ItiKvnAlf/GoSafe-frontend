import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
} from '@ionic/react';
import React from 'react';

interface NavigatePageProps {
    textButton: string;
    tittleText: string;
}

const NavigateBackPage: React.FC<NavigatePageProps> = ({ textButton, tittleText }) => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons
                        slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>{tittleText}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <h1>Page</h1>
            </IonContent>
        </>
    );
}

export default NavigateBackPage;
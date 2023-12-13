

import React from 'react';
import { IonAlert, IonButton } from '@ionic/react';

interface AlertButtonProps {
    textButton: string;
    titleText: string;
    subHeader?: string;
    buttonList?: string[];

}

const AlertButton: React.FC<AlertButtonProps> = ({ textButton, titleText, buttonList }) => {
    return (
        <>
            <IonAlert
                trigger="present-alert"
                header={"Seleccione una opción "}
                subHeader={"A Sub Header Is Optional"}
                buttons={buttonList ? buttonList : ['OK']}
            ></IonAlert>
        </>
    );
}

export default AlertButton;
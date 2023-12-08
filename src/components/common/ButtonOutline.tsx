//componnet
import React from 'react';
import { IonButton } from '@ionic/react';

interface ButtonOutlineProps {
    text: string;
    path: string;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({ text, path }) => {
    return (
        <IonButton
            shape='round'
            routerLink={path}
            fill='outline'
            expand="block"
            style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%" }}
        >
            {text}
        </IonButton>
    );
};

export default ButtonOutline;
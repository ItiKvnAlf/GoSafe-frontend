import React from "react";
import { IonButton } from "@ionic/react";


interface ButtonClearProps {
    text: string;
    path: string;
}

const ButtonClear: React.FC<ButtonClearProps> = ({ text, path }) => {
    return (
        <IonButton
            routerLink={path}
            size="small"
            fill="clear"
            color="tertiary"
            expand="full"
            style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%" }}
        >
            {text}
        </IonButton>
    );
}

export default ButtonClear;
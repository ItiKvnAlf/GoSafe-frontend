//componnet
import React from 'react';
import { IonButton } from '@ionic/react';

interface ButtonFilledProps {
    text: string;
    onClick: () => void;
    loading: boolean;
    color?: string;
}

const ButtonFilled: React.FC<ButtonFilledProps> = ({ text, onClick, loading, color }) => {
    return (
        <IonButton
            shape='round'
            onClick={onClick}
            disabled={loading} // incluir variable para deshabilitar
            expand="block"
            color={color}
            style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%" }}
        >
            {text}
        </IonButton>
    );
};

export default ButtonFilled;
import { IonContent, IonItem, IonPage, IonInput, IonButton, IonAlert } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.title = 'Reestablecer contraseña';
    if (!showSuccessAlert && redirectToHome) {
      (history as any).push('/home');
    }
  }, [showSuccessAlert, redirectToHome]);

  const handleResetPassword = async () => {
    
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonItem style ={{marginTop:"20%", marginLeft: "10%", marginRight: "10%", justifyContents:"center", alignItems:"center"}}>
          <IonInput value={email} label="Correo electrónico" labelPlacement="stacked" type="email" placeholder="Ingrese su correo electrónico" onIonInput={(e) => setEmail(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton routerLink="home" size="small" expand="block" style ={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}>
          Enviar código de verificación
        </IonButton>
        <IonButton routerLink="login" color="medium" fill="clear" size="small" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Volver al inicio de sesión
        </IonButton>
        <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} message={alertMessage} buttons={['Cancelar', { text: 'Aceptar', handler: handleAlertConfirm }]}/>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
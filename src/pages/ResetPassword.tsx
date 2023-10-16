import { IonContent, IonItem, IonPage, IonInput, IonButton, IonAlert } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Reestablecer contraseña';
  }, []);

  const handleResetPassword = async () => {
    setLoading(true);

    if (email === '') {
      setAlertMessage('El correo electrónico es requerido');
      setShowAlert(true);
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:3000/users/${email}`);
      if (response.data !== undefined) {
        setAlertMessage('Se ha enviado un correo electrónico con el código de verificación (TEST)');
        setShowAlert(true);
        setLoading(false);
      } else {
        setAlertMessage('Correo electrónico no registrado');
        setShowAlert(true);
        setLoading(false);
      }
    } catch (error: any) {
      setAlertMessage('Correo electrónico no registrado');
      setShowAlert(true);
      setLoading(false);
    }
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonItem style ={{marginTop:"50%", marginLeft: "10%", marginRight: "10%", justifyContents:"center", alignItems:"center"}}>
          <IonInput value={email} label="Correo electrónico" labelPlacement="stacked" type="email" placeholder="Ingrese su correo electrónico" onIonInput={(e) => setEmail(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton onClick={handleResetPassword} disabled={loading} size="small" expand="block" style ={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}>
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
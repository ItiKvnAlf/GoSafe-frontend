import { IonContent, IonItem, IonAlert, IonPage, IonInput, IonButton, IonImg, IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { lockClosed, mail } from 'ionicons/icons';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = 'http://localhost:3000';

  useEffect(() => {
    document.title = 'Inicio de sesión';
    if (!showSuccessAlert && redirectToHome) {
      (history as any).push('/home');
      setEmail('');
      setPassword('');
      setLoading(false);
    }
  }, [showSuccessAlert, redirectToHome]);

  const handleAlertConfirm = () => {
    setShowAlert(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const userData = { email, password };

    if (email === '') {
      setAlertMessage('El correo electrónico es requerido');
      setShowAlert(true);
      setLoading(false);
      return;
    }else if (password === '') {
      setAlertMessage('La contraseña es requerida');
      setShowAlert(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(apiUrl + '/auth/signIn', userData);
      if (response.data.message === 'Signed in successfully') {
        setRedirectToHome(true);
        setAlertMessage('Inicio de sesión exitoso');
        setShowSuccessAlert(true);
        setLoading(true);
      } else if (response.data.message === 'Token Expired or invalid') {
        setShowAlert(true);
        setAlertMessage('El tiempo de sesión ha expirado');
        setLoading(false);
      } else {
        setAlertMessage('Error en el inicio de sesión. Por favor intente nuevamente');
        setShowAlert(true);
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response.data.message === 'Wrong email' || error.response.data.message === 'Wrong password' || error.response.data.message === 'User not found') {
        setAlertMessage('El correo electrónico o la contraseña son incorrectos');
        setShowAlert(true);
        setLoading(false);
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonImg
          src="/assets/logo.png"
          alt="logo"
          style={{ width: "35%", marginTop: "15%", marginBottom: "10%", justifySelf: "center", alignSelf: "center", display: "block", marginLeft: "auto", marginRight: "auto"}}
        ></IonImg>
        <IonItem style ={{marginLeft: "10%", marginRight: "10%", borderRadius: "50px"}}>
          <IonIcon icon={mail} color='tertiary'></IonIcon>
          <IonInput style ={{textAlign: "center"}} value={email} labelPlacement="stacked" type="email" placeholder="Correo electrónico" onIonInput={(e) => setEmail(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem style ={{marginTop: "1%", marginLeft: "10%", marginRight: "10%", borderRadius: "50px"}}>
          <IonIcon icon={lockClosed} color='primary'></IonIcon>
          <IonInput style ={{textAlign: "center"}} value={password} labelPlacement="stacked" type="password" placeholder="Contraseña" onIonInput={(e) => setPassword(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton routerLink="resetpassword" size="small" fill="clear" color="tertiary" expand="full" style={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}>
          Recuperar contraseña
        </IonButton>
        <IonButton shape="round" onClick={handleLogin} disabled={loading} expand="block" style={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}> 
          Iniciar sesión
        </IonButton>
        <IonButton shape="round" routerLink="register" fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Registrarse
        </IonButton>
        <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} message={alertMessage} buttons={['Cancelar', { text: 'Aceptar', handler: handleAlertConfirm }]}/>
        <IonAlert isOpen={showSuccessAlert} onDidDismiss={() => setShowSuccessAlert(false)} message={alertMessage} buttons={[{ text: 'Aceptar', handler: handleAlertConfirm }]}/>
      </IonContent>   
    </IonPage>
  );
};

export default Login;
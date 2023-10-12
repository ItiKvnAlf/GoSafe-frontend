import { IonContent, IonItem, IonAlert, IonPage, IonInput, IonButton, IonImg } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    document.title = 'Inicio de sesión';
    if (!showSuccessAlert && redirectToHome) {
      (history as any).push('/home');
    }
  }, [showSuccessAlert, redirectToHome]);

  const handleAlertConfirm = () => {
    setShowAlert(false);
  };

  const handleLogin = async () => {
    const userData = { email, password };

    if (email === '') {
      setShowAlert(true);
      setAlertMessage('El correo electrónico es requerido');
      return;
    }else if (password === '') {
      setShowAlert(true);
      setAlertMessage('La contraseña es requerida');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/signIn', userData);
      if (response.data.message === 'Signed in successfully') {
        setShowSuccessAlert(true);
        setRedirectToHome(true);
        setAlertMessage('Inicio de sesión exitoso');
      } else if (response.data.message === 'Token Expired or invalid') {
        setShowAlert(true);
        setAlertMessage('El tiempo de sesión ha expirado');
      } else {
        setShowAlert(true);
        setAlertMessage('Error en el inicio de sesión. Por favor intente nuevamente');
      }
    } catch (error: any) {
      if (error.response.data.message === 'Wrong email' || error.response.data.message === 'Wrong password' || error.response.data.message === 'User not found') {
        setShowAlert(true);
        setAlertMessage('El correo electrónico o la contraseña son incorrectos');
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonImg
          src="https://drive.google.com/uc?export=view&id=1-F51tDwdlvWX5pwJd-CSZvaZOjdjm47b"
          alt="logo"
          style={{ width: "35%", marginTop: "5%", marginBottom: "5%", justifySelf: "center", alignSelf: "center", display: "block", marginLeft: "auto", marginRight: "auto"}}
        ></IonImg>
        <IonItem style ={{marginLeft: "10%", marginRight: "10%"}}>
          <IonInput value={email} label="Correo electrónico" labelPlacement="stacked" type="email" placeholder="Ingresa tu correo electrónico" onIonInput={(e) => setEmail(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem style ={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}>
          <IonInput value={password} label="Contraseña" labelPlacement="stacked" type="password" placeholder="Ingresa tu contraseña" onIonInput={(e) => setPassword(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton routerLink="resetpassword" size="small" fill="clear" color="tertiary" expand="full" style={{marginLeft: "10%", marginRight: "10%"}}>
          Recuperar contraseña
        </IonButton>
        <IonButton onClick={handleLogin} expand="block" style={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}> 
          Iniciar sesión
        </IonButton>
        <IonButton routerLink="register" fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Registrarse
        </IonButton>
        <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} message={alertMessage} buttons={['Cancelar', { text: 'Aceptar', handler: handleAlertConfirm }]}/>
        <IonAlert isOpen={showSuccessAlert} onDidDismiss={() => setShowSuccessAlert(false)} message={alertMessage} buttons={[{ text: 'Aceptar', handler: handleAlertConfirm }]}/>
      </IonContent>   
    </IonPage>
  );
};

export default Login;
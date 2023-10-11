import { IonContent, IonItem, IonPage, IonInput, IonButton, IonImg } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const userData = { email, password };
    
    await axios.post('http://localhost:3000/auth/signIn', userData)
      .then(response => {
        if (response.data !== undefined) {
          console.log('Acceso Concedido');
          (history as any).push('/home');
        } else {
          console.log('Acceso Denegado');
        }
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        console.log('Acceso Denegado');
      });
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
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Registrarse
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
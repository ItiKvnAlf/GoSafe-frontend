import { IonContent, IonAvatar, IonPage, IonTitle, IonButton, IonHeader } from '@ionic/react';
import React, { useEffect, useState } from 'react';

const Profile: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    document.title = 'Perfil';
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen color="light">
      <IonAvatar>
        <img alt="profilePicture" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
      </IonAvatar>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Modificar datos
        </IonButton>
        <IonButton routerLink="resetPassword" fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Cambiar contraseña
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
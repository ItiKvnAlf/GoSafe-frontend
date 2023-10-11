import { IonContent, IonItem, IonPage, IonInput, IonButton, IonIcon, IonHeader } from '@ionic/react';

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color="light">
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
import { IonContent, IonItem, IonPage, IonInput, IonButton, IonIcon, IonHeader } from '@ionic/react';

const ResetPassword: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonButton routerLink="home" fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Confirmar contraseña
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
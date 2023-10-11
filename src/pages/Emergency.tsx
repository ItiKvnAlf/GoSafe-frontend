import { IonContent, IonItem, IonPage, IonInput, IonButton, IonIcon, IonHeader } from '@ionic/react';

const Emergency: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Botón de Emergencia
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Emergency;
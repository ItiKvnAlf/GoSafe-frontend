import { IonContent, IonPage, IonButton } from '@ionic/react';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Cambiar Tema
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Activar autenticación dactilar
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Activar autenticación facial
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Configurar acceso por comando
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
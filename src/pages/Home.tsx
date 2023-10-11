import { IonContent, IonItem, IonPage, IonInput, IonButton, IonIcon, IonHeader } from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonButton routerLink="profile" fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Perfil
        </IonButton>
        <IonButton routerLink="newtravel" fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Nuevo viaje
        </IonButton>
        <IonButton routerLink="emergency" fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Emergencia
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

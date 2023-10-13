import { IonContent, IonGrid, IonPage, IonCol, IonButton, IonRow, IonImg } from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color="light">
      <IonGrid fixed={true} style={{marginTop: "5%"}}>
        <IonRow>
          <IonCol>
            <IonButton routerLink="profile" fill="clear">
              <IonImg
              src="/assets/profile_pic.png"
              alt="profile"
              ></IonImg>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton routerLink="newtravel" fill="clear">
            <IonImg
              src="/assets/new_travel.png"
              alt="profile"
              ></IonImg>
          </IonButton>
          </IonCol>
          <IonCol>
            <IonButton routerLink="emergency" fill="clear">
            <IonImg
              src="/assets/emergency.png"
              alt="profile"
              ></IonImg>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonButton routerLink="login" color="medium" fill="clear" size="small" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Volver al inicio de sesión
      </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import { IonContent, IonItem, IonPage, IonInput, IonButton, IonIcon, IonHeader, IonImg, IonLabel } from '@ionic/react';
import { useEffect } from 'react';

const Emergency: React.FC = () => {
  useEffect(() => {
    document.title = 'Emergencia';
    const token = localStorage.getItem('token');
    const token_expires = localStorage.getItem('token_expires');

    if (token === null || token_expires === null) {
      (window as any).location = '/login';
    }else if (new Date(token_expires) < new Date()) {
      (window as any).location = '/login';
    }
  }, []);

  const handleEmergency = () => {
    console.log("Emergency button logic here...");
  };

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonLabel>
          <h1 style={{textAlign: "center", marginTop: "10%", marginBottom: "25%"}}>Botón de emergencia</h1>
        </IonLabel>
        <IonButton onClick={handleEmergency} fill="clear" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
        <IonImg
          src="/assets/emergency_button.png"
          alt="logo"
          style={{ width: "80%", justifySelf: "center", alignSelf: "center", display: "block", marginLeft: "auto", marginRight: "auto"}}
        ></IonImg>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Emergency;
import { IonContent, IonItem, IonPage, IonInput, IonButton, IonIcon, IonHeader } from '@ionic/react';
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
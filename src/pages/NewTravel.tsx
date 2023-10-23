import { IonContent, IonItem, IonPage, IonInput, IonImg, IonButton, IonIcon } from '@ionic/react';
import MyMap from '../components/Map';
import React, { useEffect, useState } from 'react';
import { car, map } from 'ionicons/icons';

const NewTravel: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    document.title = 'Nueva ruta';
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <MyMap/>
        <IonItem style ={{marginTop: "3%", marginLeft: "10%", marginRight: "10%", borderRadius: "50px"}}>
          <IonIcon icon={car} color="primary" size="large"></IonIcon>
          <IonInput style ={{textAlign: "center"}} value={origin} labelPlacement="stacked" placeholder="Punto de origen" onIonInput={(e) => setOrigin(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem style ={{marginTop: "1%", marginBottom: "3%", marginLeft: "10%", marginRight: "10%", borderRadius: "50px"}}>
          <IonIcon icon={map} color="primary" size="large"></IonIcon>
          <IonInput style ={{textAlign: "center"}} value={destination} labelPlacement="stacked" placeholder="Punto de destino" onIonInput={(e) => setDestination(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton routerLink="home" color="medium" fill="clear" size="small" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Volver a la página de inicio
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NewTravel;
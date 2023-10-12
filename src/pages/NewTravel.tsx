import { IonContent, IonItem, IonPage, IonInput, IonImg, IonButton } from '@ionic/react';
import MyMap from '../components/Map';
import React, { useEffect, useState } from 'react';

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
        <IonItem style ={{marginTop: "3%", marginLeft: "10%", marginRight: "10%"}}>
          <IonImg
              src="/assets/origin.png"
              alt="origin"
              style={{width: "20%", marginRight: "5%"}}
          ></IonImg>
          <IonInput value={origin} label="Origen" labelPlacement="stacked" placeholder="Ingrese su punto de origen" onIonInput={(e) => setOrigin(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem style ={{marginBottom: "3%", marginLeft: "10%", marginRight: "10%"}}>
          <IonImg
              src="/assets/destination.png"
              alt="destination"
              style={{width: "20%", marginRight: "8%"}}
          ></IonImg>
          <IonInput value={destination} label="Destino" labelPlacement="stacked" placeholder="Ingrese su punto de destino" onIonInput={(e) => setDestination(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton routerLink="home" color="medium" fill="clear" size="small" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Volver a la página de inicio
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NewTravel;
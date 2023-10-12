import { IonContent, IonItem, IonPage, IonInput, IonImg, IonIcon, IonHeader } from '@ionic/react';
import MyMap from '../components/Map';
import React, { useEffect, useState } from 'react';

const NewTravel: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

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
        <IonItem style ={{marginLeft: "10%", marginRight: "10%"}}>
          <IonImg
              src="/assets/destination.png"
              alt="destination"
              style={{width: "20%", marginRight: "8%"}}
          ></IonImg>
          <IonInput value={destination} label="Destino" labelPlacement="stacked" placeholder="Ingrese su punto de destino" onIonInput={(e) => setDestination(e.detail.value!)}></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default NewTravel;
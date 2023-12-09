import { IonContent, IonItem, IonPage, IonInput, IonImg, IonButton, IonIcon } from '@ionic/react';
import MyMap from './Map';
import React, { useEffect, useState } from 'react';
import { car, map } from 'ionicons/icons';

const ShowNewTravel: React.FC = () => {
  const [origin, setOrigin] = useState<L.LatLng | null>(null);
  const [destination, setDestination] = useState<L.LatLng | null>(null);
  const [originName, setOriginName] = useState('');
  const [destinationName, setDestinationName] = useState('');

  useEffect(() => {
    document.title = 'Nueva ruta';
    const token = localStorage.getItem('token');
    const token_expires = localStorage.getItem('token_expires');

    if (token === null || token_expires === null) {
      (window as any).location = '/login';
    }else if (new Date(token_expires) < new Date()) {
      (window as any).location = '/login';
    }
  }, []);

  const handleOriginSelected = (latLng: L.LatLng) => {
    setOrigin(latLng);
  };

  const handleDestinationSelected = (latLng: L.LatLng) => {
    setDestination(latLng);
  };

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <MyMap onOriginSelected={handleOriginSelected} onDestinationSelected={handleDestinationSelected} />
        <IonItem style ={{marginTop: "3%", marginLeft: "10%", marginRight: "10%", borderRadius: "50px"}}>
          <IonIcon icon={car} color="primary" size="large"></IonIcon>
          <IonInput style ={{textAlign: "center"}} value={originName} labelPlacement="stacked" placeholder="Punto de origen" onIonInput={(e) => setOriginName(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem style ={{marginTop: "1%", marginBottom: "3%", marginLeft: "10%", marginRight: "10%", borderRadius: "50px"}}>
          <IonIcon icon={map} color="primary" size="large"></IonIcon>
          <IonInput style ={{textAlign: "center"}} value={destinationName} labelPlacement="stacked" placeholder="Punto de destino" onIonInput={(e) => setDestinationName(e.detail.value!)}></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default ShowNewTravel;
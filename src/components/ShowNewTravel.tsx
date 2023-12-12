import { IonContent, IonItem, IonPage, IonInput, IonImg, IonButton, IonIcon } from '@ionic/react';
import MyMap from './Map';
import React, { useEffect, useState } from 'react';
import { car, mail, map } from 'ionicons/icons';
import ButtonFilled from './common/ButtonFilled';

const ShowNewTravel: React.FC = () => {
  const [origin, setOrigin] = useState<L.LatLng | null>(null);
  const [destination, setDestination] = useState<L.LatLng | null>(null);
  const [originName, setOriginName] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [verificationStep, setVerificationStep] = useState('location');
  const [emergencyMessage, setEmergencyMessage] = useState('Este es un mensaje de alerta desde GoSafe. Se adjuntan en este mensaje las coordenadas de ubicación desde donde se envía esta alerta, además de información adicional como el origen/destino o imagenes.');



  useEffect(() => {
    document.title = 'Nueva ruta';
    const token = localStorage.getItem('token');
    const token_expires = localStorage.getItem('token_expires');

    if (token === null || token_expires === null) {
      (window as any).location = '/login';
    }else if (new Date(token_expires) < new Date()) {
      (window as any).location = '/login';
    }
  }, [verificationStep]);

  const handleOriginSelected = (latLng: L.LatLng) => {
    setOrigin(latLng);
  };

  const handleDestinationSelected = (latLng: L.LatLng) => {
    setDestination(latLng);
  };

  const handleLocationSelected = () => {
    setLoading(true);
    if (origin === null || destination === null) {
      setAlertMessage('El nombre de origen y destino son requeridos.'); 
      setShowAlert(true);
      setLoading(false);
      return;
    }
    else{
      console.log('Location selected | Origin: ', originName, ' Destination: ', destinationName); //enviar datos al backend
      setVerificationStep('emergencyInfo');
    }
    setLoading(false);
  };

  const handleStartTravel = () => {
    setLoading(true);
    console.log('Start travel logic here');
    setLoading(false);
  }

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        {verificationStep === 'location' && (
          <><MyMap onOriginSelected={handleOriginSelected} onDestinationSelected={handleDestinationSelected} />
          <ButtonFilled
              text="Siguiente"
              onClick={handleLocationSelected}
              loading={loading}
            />
          </>
        )}
        {verificationStep === 'emergencyInfo' && (
          <>
            <IonItem style={{ marginTop: "50%", marginLeft: "10%", marginRight: "10%", justifyContents: "center", alignItems: "center", borderRadius: "50px" }}></IonItem>
            <IonIcon icon = {mail} color='tertiary'></IonIcon>
            <IonInput style={{ textAlign: "center" }} value={emergencyMessage} labelPlacement="stacked" placeholder={emergencyMessage} onIonInput={(e) => setEmergencyMessage(e.detail.value!)}></IonInput>
            <ButtonFilled
              text="Comenzar viaje"
              onClick={handleStartTravel}
              loading={loading}
            />
          </>  
        )}
      </IonContent>
    </IonPage>
  );
};

export default ShowNewTravel;
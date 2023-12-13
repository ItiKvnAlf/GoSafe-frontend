import { IonContent, IonPage, IonButton, IonImg, IonLabel, IonAlert } from '@ionic/react';
import { useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { useState } from 'react';

const ShowEmergency: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
    const getCurrentLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      } catch (error) {
        console.error('Error al obtener la ubicación', error);
      }
    };
    getCurrentLocation();
  
    setAlertMessage(currentLocation?.latitude + ', ' + currentLocation?.longitude);
    setShowAlert(true);
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
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
        <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} message={alertMessage} buttons={['Cancelar', { text: 'Aceptar', handler: handleAlertConfirm }]} />
      </IonContent>
    </IonPage>
  );
};

export default ShowEmergency;
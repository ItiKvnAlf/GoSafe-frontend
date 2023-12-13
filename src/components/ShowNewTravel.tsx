import { IonContent, IonItem, IonPage, IonInput, IonIcon, IonLabel, IonList, IonTextarea, IonFab, IonFabButton, IonCheckbox, IonAlert } from '@ionic/react';
import MyMap from './Map';
import MyMapRoute from './MapRoute';
import React, { useEffect, useState } from 'react';
import { camera, mail } from 'ionicons/icons';
import ButtonFilled from './common/ButtonFilled';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setEndPoint, setStartPoint } from '../redux/travelSlice';
import L from 'leaflet';
import ContactsList from './common/ContactsList';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

function newLatLgn (lat: string, lng: string) {
  return new L.LatLng(parseFloat(lat), parseFloat(lng));
}

const ShowNewTravel: React.FC = () => {
  const [origin, setOrigin] = useState<L.LatLng | null>(null);
  const [destination, setDestination] = useState<L.LatLng | null>(null);
  const [loading, setLoading] = useState(false);
  const [isContactSelected, setIsContactSelected] = useState(false);
  const [verificationStep, setVerificationStep] = useState('location');
  const [emergencyMessage, setEmergencyMessage] = useState('Este es un mensaje de alerta desde GoSafe. Se adjuntan en este mensaje las coordenadas de ubicación desde donde se envía esta alerta, además de información adicional como el origen/destino o imágenes.');
  const travel = useAppSelector((state) => state.travel);
  const userSelected = useAppSelector((state) => state.user);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
    setVerificationStep('emergencyInfo');
    setLoading(false);
  };

  const handleGoBackLocation = () => {
    setVerificationStep('location');
    dispatch(setStartPoint({
      startPoint_long: '',
      startPoint_lat: '',
    }));
    dispatch(setEndPoint({
      endPoint_long: '',
      endPoint_lat: '',
    }));
  }

  const handleStartTravel = () => {
    setLoading(true);
    setVerificationStep('traveling');
    setLoading(false);
  }

  const handlePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        source: CameraSource.Camera, // Puedes usar CameraSource.Photos o CameraSource.Prompt según tus necesidades
        resultType: CameraResultType.Base64,
      });

      setCapturedImage(image.base64String!);
      
      setAlertMessage(capturedImage!);
      setShowAlert(true);
      // Aquí puedes utilizar la imagen (image.base64String) como desees

    } catch (error) {
      console.error('Error al tomar la foto', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSelectionChange = (selected: boolean) => {
    setIsContactSelected(selected);
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
  };


  return (
    <IonPage>
      <IonContent fullscreen color="light">
        {verificationStep === 'location' && (
          <><MyMap onOriginSelected={handleOriginSelected} onDestinationSelected={handleDestinationSelected} />
          {travel.startPoint_lat && travel.startPoint_long && travel.endPoint_lat && travel.endPoint_long &&(
          <><></><ButtonFilled
              text="Siguiente"
              onClick={handleLocationSelected}
              loading={loading}
            />
            </>
          )}
          </>
        )}
        {verificationStep === 'emergencyInfo' && (
          <>
            <IonLabel>
              <h3 style={{textAlign: "center", marginTop: "5%", marginBottom: "5%"}}>Seleccionar contactos:</h3>
            </IonLabel>
            <ContactsList
              user={userSelected}
              maxHeightValue='150px'
              onContactSelectionChange={handleContactSelectionChange}
            ></ContactsList>
            <IonLabel>
              <h3 style={{textAlign: "center", marginTop: "5%", marginBottom: "5%"}}>Mensaje de emergencia:</h3>
            </IonLabel>
            <IonItem style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%", justifyContents: "center", alignItems: "center", borderRadius: "20px" }}>
              <IonTextarea rows={8} value={emergencyMessage} style={{ margin: '10px' }} placeholder="Introduce tu mensaje de emergencia"></IonTextarea>
            </IonItem>
            <ButtonFilled
              text="Comenzar viaje"
              onClick={handleStartTravel}
              loading={!isContactSelected}
            />
            <ButtonFilled
              text="Cancelar"
              onClick={handleGoBackLocation}
              loading={loading}
            />
          </>  
        )}
        {verificationStep === 'traveling' && (
          <>
            <IonFab vertical="top" horizontal="start" slot="fixed">
              <IonFabButton size="small" color="warning" onClick={handlePicture}>
                <IonIcon icon={camera} color="light" />
              </IonFabButton>
            </IonFab>
            <IonLabel>
              <h3 style={{textAlign: "center", marginTop: "10%", marginBottom: "5%"}}>Viajando...</h3>
            </IonLabel>
            <MyMapRoute onOriginSelected={newLatLgn(travel.startPoint_lat,travel.startPoint_long)}  onDestinationSelected={newLatLgn(travel.endPoint_lat,travel.endPoint_long)} />
            <ButtonFilled
              text="Finalizar viaje"
              onClick={handleGoBackLocation}
              loading={loading}
            />
            <ButtonFilled
              text="Cancelar"
              onClick={handleGoBackLocation}
              loading={loading}
            />
          </> 
        )}
        <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} message={alertMessage} buttons={['Cancelar', { text: 'Aceptar', handler: handleAlertConfirm }]} />
      </IonContent>
    </IonPage>
  );
};

export default ShowNewTravel;
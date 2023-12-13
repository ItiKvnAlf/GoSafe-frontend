import { IonContent, IonItem, IonPage, IonInput, IonIcon, IonLabel, IonList, IonTextarea, IonFab, IonFabButton, IonCheckbox, IonAlert } from '@ionic/react';
import MyMap from './Map';
import MyMapRoute from './MapRoute';
import React, { useEffect, useState } from 'react';
import { alertCircle, camera, mail } from 'ionicons/icons';
import ButtonFilled from './common/ButtonFilled';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setEndPoint, setStartPoint } from '../redux/travelSlice';
import L from 'leaflet';
import ContactsList from './common/ContactsList';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
  const [travelId, setTravelId] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const token = localStorage.getItem('token');
  const userID = jwtDecode(token!).own;

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

  const handleLocationSelected = async () => {
    setLoading(true);
    const codeData = {
      start_point: (travel.startPoint_lat + ',' + travel.startPoint_long),
      end_point: (travel.endPoint_lat + ',' + travel.endPoint_long),
      user_id: userID
    };
    const response = await axios.post(import.meta.env.VITE_API_URL + `/travel-routes`, codeData);
    
    setTravelId(response.data.data.id)

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

  const handleStartTravel = async () => {
    setLoading(true);
    const message = {
      default_message: emergencyMessage,
      travel_route_id: travelId,
    };
    const messageResponse = await axios.post(import.meta.env.VITE_API_URL + `/messages`, message);

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

      setCapturedImage(`data:image/jpeg;base64,${image.base64String}`);
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

  const handleAlert = async () => {
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
    
    const picturePost = {
      image: capturedImage,
      travel_route_id: travelId,
    };
    const responsePicture = await axios.post(import.meta.env.VITE_API_URL + `/pictures`, picturePost);

    //transformar currentLocation a string
    const currentLocationString = currentLocation?.latitude + ',' + currentLocation?.longitude;
    
    const geolocationPost = {
      current_point: currentLocationString,
      travel_route_id: travelId,
    };
    const responseGeo = await axios.post(import.meta.env.VITE_API_URL + `/geolocations`, geolocationPost);
    
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
            <IonFab vertical="top" horizontal="end" slot="fixed">
              <IonFabButton size="small" color="danger" onClick={handleAlert}>
                <IonIcon icon={alertCircle} color="light" />
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
            {capturedImage && (
              <img src={capturedImage} alt="Imagen capturada" style={{ maxWidth: '100%', height: 'auto' }} />
            )}
          </> 
        )}
        <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} message={alertMessage} buttons={['Cancelar', { text: 'Aceptar', handler: handleAlertConfirm }]} />
      </IonContent>
    </IonPage>
  );
};

export default ShowNewTravel;
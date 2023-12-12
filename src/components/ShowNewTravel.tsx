import { IonContent, IonItem, IonPage, IonInput, IonIcon, IonLabel, IonList, IonTextarea, IonFab, IonFabButton } from '@ionic/react';
import MyMap from './Map';
import MyMapRoute from './MapRoute';
import React, { useEffect, useState } from 'react';
import { camera, mail } from 'ionicons/icons';
import ButtonFilled from './common/ButtonFilled';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setEndPoint, setStartPoint } from '../redux/travelSlice';
import L from 'leaflet';

function newLatLgn (lat: string, lng: string) {
  return new L.LatLng(parseFloat(lat), parseFloat(lng));
}

const ShowNewTravel: React.FC = () => {
  const [origin, setOrigin] = useState<L.LatLng | null>(null);
  const [destination, setDestination] = useState<L.LatLng | null>(null);
  const [originName, setOriginName] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [verificationStep, setVerificationStep] = useState('location');
  const [emergencyMessage, setEmergencyMessage] = useState('Este es un mensaje de alerta desde GoSafe. Se adjuntan en este mensaje las coordenadas de ubicación desde donde se envía esta alerta, además de información adicional como el origen/destino o imágenes.');

  const travel = useAppSelector((state) => state.travel);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
    console.log('Location selected | Origin: ', originName, ' Destination: ', destinationName); //enviar datos al backend
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

  const handlePicture = () => {
    setLoading(true);
    setLoading(false);
  }

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
              <h3 style={{textAlign: "center", marginTop: "10%", marginBottom: "5%"}}>Seleccionar contactos:</h3>
            </IonLabel>
            <>
              {user.contacts.length === 0 ? (
                <p style={{textAlign: "center", marginLeft: "5%", marginRight: "5%"}}>'No hay contactos'</p>
              ) : (
                <IonList style={{textAlign: "center", marginLeft: "5%", marginRight: "5%"}}>
                  {user.contacts.map((contact, index) => (
                    <IonItem key={index}>
                      <IonLabel>{contact.name}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              )}
            </>
            <IonLabel>
              <h3 style={{textAlign: "center", marginTop: "10%", marginBottom: "5%"}}>Mensaje de emergencia:</h3>
            </IonLabel>
            <IonItem style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%", justifyContents: "center", alignItems: "center", borderRadius: "20px" }}>
              <IonTextarea rows={5} value={emergencyMessage} style={{ margin: '10px' }} placeholder="Introduce tu mensaje de emergencia"></IonTextarea>
            </IonItem>
            <ButtonFilled
              text="Comenzar viaje"
              onClick={handleStartTravel}
              loading={loading}
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
      </IonContent>
    </IonPage>
  );
};

export default ShowNewTravel;
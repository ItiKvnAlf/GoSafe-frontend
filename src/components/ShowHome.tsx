import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonImg, IonContent, IonItem } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { location, personCircle, alertCircle, settings, home } from 'ionicons/icons';

import { Route } from 'react-router';

import Profile from '../pages/Profile';
import NewTravel from '../pages/NewTravel';
import Emergency from '../pages/Emergency';
import ResetPassword from '../pages/ResetPassword';
import Settings from '../pages/Settings';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { UpdateUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';

function ShowHome() {
  
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const userID = jwtDecode(token!).own;
  const header_config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  useEffect(() => {
    document.title = 'Inicio';
    const token = localStorage.getItem('token');
    const token_expires = localStorage.getItem('token_expires');
    
    const ProfileFetch = async () => {
      const response = await axios.get("/users/" + userID, header_config);
      const data = response.data.data;
      dispatch(UpdateUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        rut: data.rut,
        address: data.address,
        contacts: data.Contacts
      }));
    }
    ProfileFetch();

    if (token === null || token_expires === null) {
      (window as any).location = '/login';
    } else if (new Date(token_expires) < new Date()) {
      (window as any).location = '/login';
    }
  }, []);

  return (
    <IonReactRouter>
      <IonContent fullscreen color="light">
        <IonLabel>
          <h1 style={{ textAlign: "center", marginTop: "10%" }}>¡Te damos la bienvenida!</h1>
        </IonLabel>
        <IonImg
          src="/assets/logo.png"
          alt="logo"
          style={{ width: "35%", marginTop: "5%", marginBottom: "5%", justifySelf: "center", alignSelf: "center", display: "block", marginLeft: "auto", marginRight: "auto" }}
        ></IonImg>
        <IonLabel>
          <h2 style={{ textAlign: "center", marginTop: "5%" }}>¿Qué deseas hacer?</h2>
        </IonLabel>
        <IonLabel color="primary">
          <h4 style={{ textAlign: "center", marginTop: "2%" }}>Selecciona una de las opciones del fondo</h4>
        </IonLabel>
        <IonItem style={{ marginTop: "5%" }}>
          <IonLabel><h1>Perfil</h1><h4>Revisa o modifica tus datos.</h4></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel><h1>Nuevo Viaje</h1><h4>Crea una nueva ruta.</h4></IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel><h1>Emergencia</h1><h4>Envía tu ubicación.</h4></IonLabel>
        </IonItem>
      </IonContent>
      <IonTabs>
        <IonRouterOutlet>
          { }
          <Route path="/profile" render={() => <Profile />} exact={true} />
          <Route path="/newTravel" render={() => <NewTravel />} exact={true} />
          <Route path="/emergency" render={() => <Emergency />} exact={true} />
          <Route path="/resetPassword" render={() => <ResetPassword />} exact={true} />
          <Route path="/settings" render={() => <Settings />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personCircle}></IonIcon>
            <IonLabel style={{ fontSize: '80%' }}>Perfil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="newTravel" href="/newTravel" >
            <IonIcon icon={location}></IonIcon>
            <IonLabel style={{ fontSize: '80%' }}>Nuevo Viaje</IonLabel>
          </IonTabButton>
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home}></IonIcon>
            <IonLabel style={{ fontSize: '80%' }}>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settings}></IonIcon>
            <IonLabel style={{ fontSize: '80%' }}>Ajustes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
export default ShowHome;

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

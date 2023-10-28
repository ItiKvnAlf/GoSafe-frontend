import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonImg, IonContent, IonItem } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { location, personCircle, alertCircle, settings } from 'ionicons/icons';

import { Route } from 'react-router';

import Profile from './Profile';
import NewTravel from './NewTravel';
import Emergency from './Emergency';
import ResetPassword from './ResetPassword';
import Settings from './Settings';

function Home() {
  return (
    <IonReactRouter>
      <IonContent fullscreen color="light">
        <IonLabel>
          <h1 style={{textAlign: "center", marginTop: "10%"}}>¡Te damos la bienvenida!</h1>
        </IonLabel>
        <IonImg
          src="/assets/logo.png"
          alt="logo"
          style={{ width: "35%", marginTop: "5%", marginBottom: "5%", justifySelf: "center", alignSelf: "center", display: "block", marginLeft: "auto", marginRight: "auto"}}
        ></IonImg>
        <IonLabel>
          <h2 style={{textAlign: "center", marginTop: "5%"}}>¿Qué deseas hacer?</h2>
        </IonLabel>
        <IonLabel color="primary">
          <h4 style={{textAlign: "center", marginTop: "2%"}}>Selecciona una de las opciones del fondo</h4>
        </IonLabel>
        <IonItem style={{marginTop: "5%"}}>
          <IonImg
            src="/assets/profile_pic_light.png"
            alt="profile"
            style={{width: "20%", marginRight: "8%"}}
          ></IonImg>
          <IonLabel><h1>Perfil</h1><h4>Revisa o modifica tus datos.</h4></IonLabel>
        </IonItem>
        <IonItem>
          <IonImg
            src="/assets/new_travel_light.png"
            alt="newTravel"
            style={{width: "20%", marginRight: "8%"}}
          ></IonImg>
          <IonLabel><h1>Nuevo Viaje</h1><h4>Crea una nueva ruta.</h4></IonLabel>
        </IonItem>
        <IonItem>
          <IonImg
            src="/assets/emergency_light.png"
            alt="emergency"
            style={{width: "20%", marginRight: "8%"}}
          ></IonImg>
          <IonLabel><h1>Emergencia</h1><h4>Envía tu ubicación.</h4></IonLabel>
        </IonItem>
      </IonContent>
      <IonTabs>
        <IonRouterOutlet>
          {}
          <Route path="/profile" render={() => <Profile />} exact={true} />
          <Route path="/newTravel" render={() => <NewTravel />} exact={true} />
          <Route path="/emergency" render={() => <Emergency />} exact={true} />
          <Route path="/resetPassword" render={() => <ResetPassword />} exact={true} />
          <Route path="/settings" render={() => <Settings />} exact ={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personCircle}></IonIcon>
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
          <IonTabButton tab="newTravel" href="/newTravel">
            <IonIcon icon={location}></IonIcon>
            <IonLabel>Nuevo Viaje</IonLabel>
          </IonTabButton>
          <IonTabButton tab="emergency" href="/emergency">
            <IonIcon icon={alertCircle}></IonIcon>
            <IonLabel>Emergencia</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settings}></IonIcon>
            <IonLabel>Ajustes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
export default Home;
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { personCircle, home, alertCircle, settings } from "ionicons/icons";
import { Route } from "react-router";
import Emergency from "../pages/Emergency";
import NewTravel from "../pages/NewTravel";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import Settings from "../pages/Settings";
import React from "react";
import { location } from 'ionicons/icons';
import { IonReactRouter } from "@ionic/react-router";
import { useAppSelector } from "../redux/hooks";


const Navbar: React.FC = () => {

    const auth = useAppSelector((state) => state.auth);
    if (auth.isAuthenticated) {
        return (
            <>
                <IonReactRouter>
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
                            <IonTabButton tab="emergency" href="/emergency">
                                <IonIcon icon={alertCircle}></IonIcon>
                                <IonLabel style={{ fontSize: '80%' }}>Emergencia</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="settings" href="/settings">
                                <IonIcon icon={settings}></IonIcon>
                                <IonLabel style={{ fontSize: '80%' }}>Ajustes</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
            </>
        );
    } else {
        <>
        </>
    }
}

export default Navbar;
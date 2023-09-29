import { IonContent, IonItem, IonPage, IonInput, IonButton, IonImg } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
          <IonImg
          src="AQUI VA UN ENLACE A LA IMAGEN"
          alt="logo"
        ></IonImg>
        <IonItem>
          <IonInput label="Correo electrónico" labelPlacement="stacked" type="email" placeholder="Ingresa tu correo electrónico"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput label="Contraseña" labelPlacement="stacked" type="password" placeholder="Ingresa tu contraseña"></IonInput>
        </IonItem>
        <IonButton size="small" fill="clear" color="tertiary">
          Recuperar contraseña
        </IonButton>
        <IonButton expand="block"> 
          Iniciar sesión
        </IonButton>
        <IonButton fill="outline" expand="block">
          Registrarse
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

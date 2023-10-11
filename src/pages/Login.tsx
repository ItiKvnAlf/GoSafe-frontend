import { IonContent, IonItem, IonPage, IonInput, IonButton, IonImg } from '@ionic/react';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonImg
          src="https://drive.google.com/uc?export=view&id=1-F51tDwdlvWX5pwJd-CSZvaZOjdjm47b"
          alt="logo"
          style={{ width: "35%", marginTop: "5%", marginBottom: "5%", justifySelf: "center", alignSelf: "center", display: "block", marginLeft: "auto", marginRight: "auto"}}
        ></IonImg>
        <IonItem style ={{marginLeft: "10%", marginRight: "10%"}}>
          <IonInput label="Correo electrónico" labelPlacement="stacked" type="email" placeholder="Ingresa tu correo electrónico"></IonInput>
        </IonItem>
        <IonItem style ={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}>
          <IonInput label="Contraseña" labelPlacement="stacked" type="password" placeholder="Ingresa tu contraseña"></IonInput>
        </IonItem>
        <IonButton routerLink="resetpassword" size="small" fill="clear" color="tertiary" expand="full" style={{marginLeft: "10%", marginRight: "10%"}}>
          Recuperar contraseña
        </IonButton>
        <IonButton routerLink="home" expand="block" style={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}> 
          Iniciar sesión
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Registrarse
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
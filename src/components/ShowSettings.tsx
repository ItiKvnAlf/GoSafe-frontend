import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useEffect } from 'react';

const ShowSettings: React.FC = () => {
  useEffect(() => {
    document.title = 'Configuración';
    const token = localStorage.getItem('token');
    const token_expires = localStorage.getItem('token_expires');

    if (token === null || token_expires === null) {
      (window as any).location = '/login';
    }else if (new Date(token_expires) < new Date()) {
      (window as any).location = '/login';
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Personalizar apariencia
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Activar autenticación dactilar
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Activar autenticación facial
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Configurar acceso por comando
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Configurar notificaciones
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Permisos de acceso
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
          Registro de cambios
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ShowSettings;
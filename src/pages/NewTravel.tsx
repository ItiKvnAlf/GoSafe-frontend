import { IonContent, IonItem, IonPage, IonInput, IonButton, IonIcon, IonHeader } from '@ionic/react';

const NewTravel: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen color="light">
      <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
            Origen
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
            Destino
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
            Añadir foto
        </IonButton>
        <IonButton fill="outline" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
            Álbum
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NewTravel;
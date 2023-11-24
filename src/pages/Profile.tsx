import React, { useEffect, useState } from 'react';
import {IonContent,IonPage,IonAvatar,IonButton,IonInput,IonItem, IonCol, IonGrid, IonRow, IonIcon, IonFab, IonFabButton} from '@ionic/react';
import { call, home, idCard, logOut, mail, pencil, people, person } from 'ionicons/icons';

import './Profile.css';
import axios from 'axios';

const Profile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [rut, setRut] = useState('');
  const apiUrl = 'http://localhost:3000';

  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    document.title = 'Perfil';
    const token = localStorage.getItem('token');
    const token_expires = localStorage.getItem('token_expires');

    if (token === null || token_expires === null) {
      (window as any).location = '/login';
    }else if (new Date(token_expires) < new Date()) {
      (window as any).location = '/login';
    }

    const fetchUserData = async () => {
      const response = await axios.get(apiUrl + `/users/${userEmail}`);
      if (response.data !== undefined) {
        setUsername(response.data.data.name);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);
        setAddress(response.data.data.address);
        setRut(response.data.data.rut);
      }
    }
    
    fetchUserData();

  }, []);

  const handleUpdateUser = () => {
    // Implement the logic to update the address
    // You can use an API call or any other method to update the data
    console.log('Update user logic here');
  };

  const handleResetPassword = () => {
    // Implement the logic to reset the password
    // You can use an API call or any other method to reset the password
    console.log('Reset password logic here');
  }

  const handleLogout = () => {
    (window as any).location = '/login';
    localStorage.clear();
  }

  const handleUpdatePicture = () => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
  
      // Trigger file input click
      fileInput.click();
  
      // Handle file selection
      fileInput.addEventListener('change', (event) => {
        const files = (event.target as HTMLInputElement).files;
  
        if (files && files.length > 0) {
          const selectedFile = files[0];
  
          // Use FileReader to read the selected file as a data URL
          const reader = new FileReader();
          console.log(reader);
  
          reader.onload = (e) => {
            // Update the image source in the avatar
            const newImageUrl = e.target?.result as string;
            const avatarImage = document.querySelector('.profile-avatar img') as HTMLImageElement;
            avatarImage.src = newImageUrl;
          };
  
          // Read the selected file as a data URL
          reader.readAsDataURL(selectedFile);
        }
      });
    } catch (error) {
      console.error('Error updating profile picture', error);
    }
  }

  const handleContacts = () => {
    // Implement the logic to show the contacts
    // You can use an API call or any other method to show the contacts
    console.log('Contacts logic here');
  }

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonGrid>
          <IonRow>
          <div className="curved-background"></div>
            <IonCol style={{ marginTop: '4%', marginBottom: '3%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IonAvatar style={{ width: '100px', height: '100px', position: 'relative' }}>
                <img alt="profilePicture" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                <IonButton fill="clear" onClick={handleUpdatePicture} style={{ position: 'absolute', bottom: '-18%', right: '-18%' }}>
                  <IonIcon size='small' icon={pencil} color='warning'></IonIcon>
                </IonButton>
              </IonAvatar>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="top" horizontal="start" slot="fixed">
          <IonFabButton size="small" color="danger" onClick={handleLogout}>
            <IonIcon icon={logOut} color="light" />
          </IonFabButton>
        </IonFab>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton size="small" color="tertiary" onClick={handleContacts}>
            <IonIcon icon={people} color="light" />
          </IonFabButton>
        </IonFab>
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px'}}>
          <IonIcon size='small' icon={person} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={username}
            labelPlacement="stacked"
            placeholder="Nombre de usuario"
            onIonInput={(e) => setUsername(e.detail.value!)}
          />
        </IonItem>
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px'}}>
          <IonIcon size='small' icon={mail} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={email}
            labelPlacement="stacked"
            type="email"
            placeholder="Correo electrónico"
            onIonInput={(e) => setEmail(e.detail.value!)}
            disabled
          />
        </IonItem>
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px'}}>
          <IonIcon size='small' icon={call} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={phone}
            labelPlacement="stacked"
            placeholder="Celular"
            onIonInput={(e) => setPhone(e.detail.value!)}
          />
        </IonItem>
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px'}}>
          <IonIcon size='small' icon={idCard} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={rut}
            labelPlacement="stacked"
            placeholder="RUT"
            onIonInput={(e) => setRut(e.detail.value!)}
            disabled
          />
        </IonItem>
        <IonItem style={{ marginTop: '1%', marginBottom: "3%", marginLeft: '10%', marginRight: '10%', borderRadius: '50px'}}>
          <IonIcon size='small' icon={home} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={address}
            labelPlacement="stacked"
            placeholder="Sin dirección registrada"
            onIonInput={(e) => setAddress(e.detail.value!)}
          />
        </IonItem>
        <IonButton color='warning' size='small' shape="round" onClick={handleUpdateUser} expand="block" style={{marginTop: "3%", marginLeft: "20%", marginRight: "20%"}}> 
          Actualizar datos
        </IonButton>
        <IonButton color='warning' size='small' shape="round" onClick={handleResetPassword} expand="block" style={{marginTop: "3%", marginLeft: "20%", marginRight: "20%"}}> 
          Modificar contraseña
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
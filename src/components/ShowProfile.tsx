import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonAvatar, IonButton, IonInput, IonItem, IonCol, IonGrid, IonRow, IonIcon, IonFab, IonFabButton, IonAlert, IonNavLink, useIonRouter } from '@ionic/react';
import { call, home, idCard, logOut, mail, pencil, person } from 'ionicons/icons';
import { useDispatch } from 'react-redux';
import { UpdateUser, updateAddress, updateName, updatePhone } from '../redux/userSlice';
import '../pages/Profile.css';
import { ButtonFilled } from './common';
import { useAppSelector } from '../redux/hooks';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import HorizontalListButton from './HorizontalListButton';
import { useContacts } from '../hooks/useContacts';

const ShowProfile: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    success,
    setSuccess
  } = useContacts();


  const token = localStorage.getItem('token');
  const userID = jwtDecode(token!).own;
  const header_config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const data_config = {
    name: user.name,
    phone: user.phone,
    address: user.address

  };

  useEffect(() => {
    document.title = 'Perfil';
    const token = localStorage.getItem('token');
    const token_expires = localStorage.getItem('token_expires');

    // if (token === null || token_expires === null) {
    //   (window as any).location = '/login';
    // } else if (new Date(token_expires) < new Date()) {
    //   (window as any).location = '/login';
    // }

    const ProfileFetch = async () => {
      const response = await axios.get("/users/" + userID, header_config);
      const data = response.data.data;
      dispatch(UpdateUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        rut: data.rut,
        address: data.address,
        contacts: data.contacts
      }));
    }
    ProfileFetch();

  }, []);

  const handleUpdateUser = () => {
    const ProfileUpdate = async () => {
      const response = await axios.patch(
        "/users/" + userID,
        data_config,
        header_config
      );
      if (response.status === 200) {
        setSuccess(true);
      }
    }
    ProfileUpdate();
  };

  const handleResetPassword = () => {
    setLoading(true);
    console.log('Reset password logic here');
    setLoading(false);
  }

  const handleLogout = () => {
    setLoading(true);
    (window as any).location = '/login';
    localStorage.clear();
    setLoading(false);
  }

  const handleUpdatePicture = () => {
    setLoading(true);
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
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error updating profile picture', error);
      setLoading(false);
    }
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
          <IonFabButton
            size="small"
            color="danger"
            onClick={handleLogout}
          >
            <IonIcon icon={logOut} color="light" />
          </IonFabButton>
        </IonFab>
        <HorizontalListButton />
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px' }}>
          <IonIcon size='small' icon={person} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={user.name}
            labelPlacement="stacked"
            placeholder="Nombre de usuario"
            onIonInput={(e) => dispatch(updateName({
              name: e.detail.value!
            }))}
          />
        </IonItem>
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px' }}>
          <IonIcon size='small' icon={mail} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={user.email}
            labelPlacement="stacked"
            type="email"
            placeholder="Correo electrónico"
            disabled
          />
        </IonItem>
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px' }}>
          <IonIcon size='small' icon={call} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={user.phone}
            labelPlacement="stacked"
            placeholder="Celular"
            onIonInput={(e) => dispatch(updatePhone({
              phone: e.detail.value!
            }))}
          />
        </IonItem>
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px' }}>
          <IonIcon size='small' icon={idCard} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={user.rut}
            labelPlacement="stacked"
            placeholder="RUT"
            disabled
          />
        </IonItem>
        <IonItem style={{ marginTop: '1%', marginBottom: "3%", marginLeft: '10%', marginRight: '10%', borderRadius: '50px' }}>
          <IonIcon size='small' icon={home} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={user.address}
            labelPlacement="stacked"
            placeholder="Sin dirección registrada"
            onIonInput={(e) => dispatch(updateAddress({
              address: e.detail.value!
            }))}
          />
        </IonItem>
        <ButtonFilled
          text="Actualizar datos"
          onClick={handleUpdateUser}
          loading={loading}
          color='warning'
        />
        <IonAlert
          isOpen={success}
          header="Datos actualizados"
          subHeader=":D"
          message="Los datos han sido actualizados correctamente."
          buttons={['OK']}
          onDidDismiss={() => setSuccess(false)}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default ShowProfile;
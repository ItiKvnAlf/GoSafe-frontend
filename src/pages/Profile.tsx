import React, { useEffect, useState } from 'react';
import {IonContent,IonPage,IonAvatar,IonButton,IonLabel,IonInput,IonItem,IonHeader,IonTitle, IonCol, IonGrid, IonRow, IonIcon, IonFab, IonFabButton} from '@ionic/react';
import { call, eye, eyeOff, home, idCard, lockClosed, lockOpen, lockOpenOutline, logOut, logOutOutline, mail, pencil, person } from 'ionicons/icons';

const Profile: React.FC = () => {
  const [username, setUsername] = useState('JohnDoe'); // Replace with actual username
  const [email, setEmail] = useState('john.doe@example.com'); // Replace with actual email
  const [password, setPassword] = useState('1234'); // Replace with actual password
  const [phone, setPhone] = useState('123-456-7890'); // Replace with actual phone number
  const [address, setAddress] = useState('123 Main St, City'); // Replace with actual address
  const [rut, setRut] = useState('12.345.678-9'); // Replace with actual Rut
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = 'Perfil';
  }, []);

  const handleUpdateUsername = () => {
    // Implement the logic to update the username
    // You can use an API call or any other method to update the data
    console.log('Update username logic here');
  };

  const handleUpdateAddress = () => {
    // Implement the logic to update the address
    // You can use an API call or any other method to update the data
    console.log('Update address logic here');
  };

  const handleSeePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = () => {
    // Implement the logic to reset the password
    // You can use an API call or any other method to reset the password
    console.log('Reset password logic here');
  }

  const handleLogout = () => {
    // Implement the logic to logout the user
    // You can use an API call or any other method to logout the user
    console.log('Logout logic here');
  }

  const handleUpdatePicture = () => {
    // Implement the logic to update the profile picture
    // You can use an API call or any other method to update the picture
    console.log('Update picture logic here');
  }

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        <IonGrid>
          <IonRow>
            <IonCol style={{ marginTop: '6%', marginBottom: '3%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IonAvatar style={{ width: '100px', height: '100px', position: 'relative' }}>
                <img alt="profilePicture" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                <IonButton fill="clear" onClick={handleUpdatePicture} style={{ position: 'absolute', bottom: '-25%', right: '-25%' }}>
                  <IonIcon icon={pencil} color="warning" />
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
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px'}}>
          <IonIcon size='small' icon={person} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={username}
            labelPlacement="stacked"
            placeholder="Nombre de usuario"
            onIonInput={(e) => setUsername(e.detail.value!)}
            disabled
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
            disabled
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
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px'}}>
            <IonIcon size='small' icon={lockClosed} color='tertiary'></IonIcon>
            <IonInput
              style={{ textAlign: 'center', fontSize: '12px' }}
              type={showPassword ? 'text' : 'password'}
              value={password}
              labelPlacement="stacked"
              placeholder="Contraseña"
              onIonInput={(e) => setPassword(e.detail.value!)}
              disabled
            />
            <IonButton fill="clear" onClick={handleSeePassword}>
              <IonIcon size='small' icon={showPassword ? eyeOff : eye} color='dark'></IonIcon>
            </IonButton>
            <IonButton fill="clear" onClick={handleResetPassword}><IonIcon size='small' icon={pencil} color='dark'></IonIcon></IonButton>
          </IonItem>
        <IonItem style={{ marginTop: '1%', marginLeft: '10%', marginRight: '10%', borderRadius: '50px'}}>
          <IonIcon size='small' icon={home} color='tertiary'></IonIcon>
          <IonInput
            style={{ textAlign: 'center', fontSize: '12px' }}
            value={address}
            labelPlacement="stacked"
            placeholder="Sin dirección registrada"
            onIonInput={(e) => setAddress(e.detail.value!)}
            disabled
          />
          <IonButton fill="clear" onClick={handleUpdateAddress}><IonIcon size='small' icon={pencil} color='dark'></IonIcon></IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
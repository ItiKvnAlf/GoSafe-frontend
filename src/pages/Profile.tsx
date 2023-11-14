import React, { useEffect, useState } from 'react';
import {IonContent,IonPage,IonAvatar,IonButton,IonLabel,IonInput,IonItem,IonHeader,IonTitle, IonCol, IonGrid, IonRow, IonIcon, IonFab, IonFabButton} from '@ionic/react';
import { call, eye, eyeOff, home, idCard, lockClosed, lockOpen, lockOpenOutline, logOut, logOutOutline, mail, pencil, people, person } from 'ionicons/icons';
import './Profile.css';

const Profile: React.FC = () => {
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('1234');
  const [phone, setPhone] = useState('123-456-7890');
  const [address, setAddress] = useState('123 Main St, City');
  const [rut, setRut] = useState('12.345.678-9');
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
        <IonItem style={{ marginTop: '1%', marginBottom: "5%", marginLeft: '10%', marginRight: '10%', borderRadius: '50px'}}>
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
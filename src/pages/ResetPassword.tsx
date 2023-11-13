import { IonContent, IonItem, IonPage, IonInput, IonButton, IonAlert, IonIcon } from '@ionic/react';
import axios from 'axios';
import { keypad, lockClosed, mail } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [hashedCode, setHashedCode] = useState('');
  const [expiration, setExpiration] = useState('');
  const [verificationStep, setVerificationStep] = useState('email');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const apiUrl = 'http://localhost:3000';

  useEffect(() => {
    document.title = 'Reestablecer contraseña';
    if (!showSuccessAlert && redirectToLogin) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setCode('');
      (history as any).push('/login');
      setLoading(false);
    }
  }, [showSuccessAlert, redirectToLogin]);

  const handleResetPassword = async () => {
    setLoading(true);

    if (email === '') {
      setAlertMessage('El correo electrónico es requerido');
      setShowAlert(true);
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(apiUrl + `/users/${email}`);
      if (response.data !== undefined) {
        const sendEmail = await axios.post(apiUrl + `/users/resetPassword/${email}`);
        if (sendEmail.data !== undefined) {
          setAlertMessage('Se ha enviado un código de verificación a su correo electrónico');
          setHashedCode(sendEmail.data.data);
          setExpiration(sendEmail.data.expires);
          setShowAlert(true);
          setLoading(false);
          setVerificationStep('code');
        }
        setLoading(false);
      } else {
        setAlertMessage('Correo electrónico no registrado');
        setShowAlert(true);
        setLoading(false);
      }
    } catch (error: any) {
      setAlertMessage('Error en el envío del código de verificación');
      setShowAlert(true);
      setLoading(false);
    }
  };

  const handleCode = async () => {
    setLoading(true);
    const codeData = { code, hashedCode, expiration };

    if (code === '') {
      setAlertMessage('El código es requerido');
      setShowAlert(true);
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post(apiUrl + `/users/verifyCode`,codeData);
      if (response.data.message == "Code Verified") {
        setAlertMessage('Código verificado');
        setShowAlert(true);
        setLoading(false);
        setVerificationStep('changePassword');
      } else if (response.data.message == "Code does not match") {
        setAlertMessage('Código incorrecto');
        setShowAlert(true);
        setLoading(false);
      } else if (response.data.message == "Expired") {
        setAlertMessage('Código expirado');
        setShowAlert(true);
        setLoading(false);
      }
    } catch (error: any) {
      setAlertMessage('Error en la verificación del código');
      setShowAlert(true);
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    const passwordData = { email, password };

    if (password === '') {
      setAlertMessage('La contraseña es requerida');
      setShowAlert(true);
      setLoading(false);
      return;
    } else if (confirmPassword === '') {
      setAlertMessage('La confirmación de la contraseña es requerida');
      setShowAlert(true);
      setLoading(false);
      return;
    } else if (password !== confirmPassword) {
      setAlertMessage('Las contraseñas no coinciden');
      setShowAlert(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(apiUrl + `/users/changePassword`, passwordData);
      if (response.data.message == "Password updated successfully") {
        setRedirectToLogin(true);
        setAlertMessage('Contraseña actualizada');
        setShowSuccessAlert(true);
        setLoading(true);
      } else if (response.data.message == "Same password") {
        setAlertMessage('La contraseña es la misma. Por favor ingrese una contraseña diferente');
        setShowAlert(true);
        setLoading(false);
      } else {
        setAlertMessage('Error en la actualización de la contraseña');
        setShowAlert(true);
        setLoading(false);
      }
    }catch (error: any) {
      setAlertMessage('Error en la actualización de la contraseña. Ingrese nuevamente.');
      setShowAlert(true);
      setLoading(false);
    }
  }

  const handleAlertConfirm = () => {
    setShowAlert(false);
  };

  const goBackToEmail = () => {
    setVerificationStep('email');
  };

  return (
    <IonPage>
      <IonContent fullscreen color="light">
        {verificationStep === 'email' && (
          <><IonItem style={{ marginTop: "50%", marginLeft: "10%", marginRight: "10%", justifyContents: "center", alignItems: "center", borderRadius: "50px"}}>
            <IonIcon icon={mail} color='tertiary'></IonIcon>
            <IonInput style ={{textAlign: "center"}} value={email} labelPlacement="stacked" type="email" placeholder="Correo electrónico" onIonInput={(e) => setEmail(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton shape='round' onClick={handleResetPassword} disabled={loading} size="small" expand="block" style={{ marginTop: "7%", marginLeft: "5%", marginRight: "5%" }}>
              Enviar código de verificación
            </IonButton>
            <IonButton routerLink="login" color="medium" fill="clear" size="small" expand="block" style={{ marginLeft: "10%", marginRight: "10%" }}>
              Volver al inicio de sesión
            </IonButton></>)}
        {verificationStep === 'code' && showAlert !== true && (
          <><><IonItem style={{ marginTop: "50%", marginLeft: "10%", marginRight: "10%", justifyContents: "center", alignItems: "center", borderRadius: "50px" }}>
            <IonIcon icon={keypad} color='tertiary'></IonIcon>
            <IonInput style ={{textAlign: "center"}} value={code} labelPlacement="stacked" placeholder="Código de verificación" onIonInput={(e) => setCode(e.detail.value!)}></IonInput>
          </IonItem>
            <IonButton shape='round' onClick={handleCode} disabled={loading} size="small" expand="block" style={{ marginTop: "5%", marginLeft: "15%", marginRight: "15%" }}>
              Confirmar código
            </IonButton></>
            <IonButton routerLink="login" color="medium" fill="clear" size="small" expand="block" style={{ marginLeft: "10%", marginRight: "10%" }}>
              Volver al inicio de sesión
            </IonButton></>
        )}
        {verificationStep === 'changePassword' && showAlert !== true && (
          <><><IonItem style={{ marginTop: "50%", marginLeft: "10%", marginRight: "10%", justifyContents: "center", alignItems: "center", borderRadius: "50px" }}>
            <IonIcon icon={lockClosed} color='primary'></IonIcon>
            <IonInput style ={{textAlign: "center"}} value={password} labelPlacement="stacked" type="password" placeholder="Nueva contraseña" onIonInput={(e) => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem style={{ marginLeft: "10%", marginRight: "10%", justifyContents: "center", alignItems: "center", borderRadius: "50px"}}>
          <IonIcon icon={lockClosed} color='tertiary'></IonIcon>
            <IonInput style ={{textAlign: "center"}} value={confirmPassword} labelPlacement="stacked" type="password" placeholder="Confirmar contraseña" onIonInput={(e) => setConfirmPassword(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton shape='round' onClick={handleChangePassword} disabled={loading} size="small" expand="block" style={{ marginTop: "5%", marginLeft: "10%", marginRight: "10%" }}>
            Confirmar contraseña
          </IonButton></>
          <IonButton routerLink="login" color="medium" fill="clear" size="small" expand="block" style={{ marginLeft: "10%", marginRight: "10%" }}>
            Volver al inicio de sesión
          </IonButton></>
      )}
        <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} message={alertMessage} buttons={['Cancelar', { text: 'Aceptar', handler: handleAlertConfirm }]}/>
        <IonAlert isOpen={showSuccessAlert} onDidDismiss={() => setShowSuccessAlert(false)} message={alertMessage} buttons={[{ text: 'Aceptar', handler: handleAlertConfirm }]}/>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
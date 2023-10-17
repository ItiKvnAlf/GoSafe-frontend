import { IonContent, IonItem, IonInput, IonPage, IonButton, IonAlert } from '@ionic/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [rut, setRut] = useState('');
    const [phone, setPhone] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Registro';
        if (!showSuccessAlert && redirectToHome) {
            (history as any).push('/home');
            setLoading(false);
          }
    }, [showSuccessAlert, redirectToHome]);

    function validateRut(rut:string) {
        rut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
        
        if (!/^[0-9]+[0-9kK]{1}$/.test(rut)) {
            return false;
        }

        const num = rut.slice(0, -1);
        const vd = rut.slice(-1);
      
        const reversedNum = num.split('').reverse().join('');
        let sum = 0;
        let multiplier = 2;
      
        for (let i = 0; i < reversedNum.length; i++) {
          sum += parseInt(reversedNum.charAt(i)) * multiplier;
          multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }
      
        const remainder = sum % 11;
        const verifierDigit = remainder === 0 ? 0 : 11 - remainder;
      
        if ((verifierDigit === 10 && vd === 'K') || (verifierDigit === parseInt(vd))) {
          return true;
        } else {
          return false;
        }
    }

    const handleRegister = async () => {
        setLoading(true);
        const userData = { name, email, password, rut, phone };

        if (name === '') {
            setAlertMessage('El nombre es requerido');
            setShowAlert(true);
            setLoading(false);
            return;
        } else if (email === '') {
            setAlertMessage('El correo electrónico es requerido');
            setShowAlert(true);
            setLoading(false);
            return;
        } else if(email.includes('@') === false || email.includes('.') === false){
            setAlertMessage('El correo electrónico no es válido');
            setShowAlert(true);
            setLoading(false);
            return;
        } else if (rut === '') {
            setAlertMessage('El RUT es requerido');
            setShowAlert(true);
            setLoading(false);
            return;
        } else if(validateRut(rut) === false){
            setAlertMessage('El RUT ingresado no es válido o no existe');
            setShowAlert(true);
            setLoading(false);
            return;
        } else if (phone === '') {
            setAlertMessage('El teléfono es requerido');
            setShowAlert(true);
            setLoading(false);
            return;
        } else if (!/^[0-9]+$/.test(phone)){
            setAlertMessage('El teléfono solo puede contener caracteres numéricos');
            setShowAlert(true);
            setLoading(false);
            return;
        } else if (phone.length < 9) {
            setAlertMessage('El teléfono debe tener al menos 9 dígitos');
            setShowAlert(true);
            setLoading(false);
            return;    
        } else if (password === '') {
            setAlertMessage('La contraseña es requerida');
            setShowAlert(true);
            setLoading(false);
            return;
        } else if (confirmPass === '') {
            setAlertMessage('La confirmación de contraseña es requerida');
            setShowAlert(true);
            setLoading(false);
            return;
        } else if (password !== confirmPass) {
            setAlertMessage('Las contraseñas no coinciden');
            setShowAlert(true);
            setLoading(false);
            return;
        }else{
            try {
                const response = await axios.post('http://localhost:3000/auth/signUp', userData);
                if (response.data.message === 'Success') {
                  setAlertMessage('Registro exitoso');
                  setShowSuccessAlert(true);
                  setRedirectToHome(true);
                  setLoading(false);
                } else if (response.data.message === 'User already registered') {
                  setAlertMessage('El RUT, correo o teléfono del usuario ya se encuentra registrado');
                  setShowAlert(true);
                  setLoading(false);
                }else {
                  setAlertMessage('Error en el proceso de registro. Por favor intente nuevamente');
                  setShowAlert(true);
                  setLoading(false);
                }
              } catch (error: any) {
                setShowAlert(true);
                setAlertMessage('Error. Por favor intente nuevamente');
                setLoading(false);
              }
        }     
    }

    const handleAlertConfirm = () => {
        setShowAlert(false);
    };

    return (
        <IonPage>
        <IonContent fullscreen color="light">
            <IonItem style ={{marginTop:"20%", marginLeft: "10%", marginRight: "10%"}}>
                <IonInput value={name} label="Nombre" labelPlacement="stacked" type="email" placeholder="Ingresa tu nombre" onIonInput={(e) => setName(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style ={{marginLeft: "10%", marginRight: "10%"}}>
                <IonInput value={email} label="Correo electrónico" labelPlacement="stacked" type="email" placeholder="Ingresa tu correo electrónico" onIonInput={(e) => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style ={{marginLeft: "10%", marginRight: "10%"}}>
                <IonInput value={rut} label="RUT" labelPlacement="stacked" type="email" placeholder="Ingresa tu RUT" onIonInput={(e) => setRut(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style ={{marginLeft: "10%", marginRight: "10%"}}>
                <IonInput value={phone} label="Teléfono" labelPlacement="stacked" type="email" placeholder="Ingresa tu número telefónico" onIonInput={(e) => setPhone(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style ={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}>
                <IonInput value={password} label="Contraseña" labelPlacement="stacked" type="password" placeholder="Ingresa tu contraseña" onIonInput={(e) => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem style ={{marginLeft: "10%", marginRight: "10%"}}>
                <IonInput value={confirmPass} label="Contraseña" labelPlacement="stacked" type="password" placeholder="Confirma tu contraseña" onIonInput={(e) => setConfirmPass(e.detail.value!)}></IonInput>
            </IonItem>
            <IonButton onClick={handleRegister} disabled={loading} expand="block" style ={{marginTop: "10%", marginLeft: "10%", marginRight: "10%"}}>
                Registrarse
            </IonButton>
            <IonButton routerLink="login" color="medium" fill="clear" size="small" expand="block" style ={{marginLeft: "10%", marginRight: "10%"}}>
                Volver al inicio de sesión
            </IonButton>
            <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} message={alertMessage} buttons={['Cancelar', { text: 'Aceptar', handler: handleAlertConfirm }]}/>
            <IonAlert isOpen={showSuccessAlert} onDidDismiss={() => setShowSuccessAlert(false)} message={alertMessage} buttons={[{ text: 'Aceptar', handler: handleAlertConfirm }]}/>
        </IonContent>
        </IonPage>
    );
};

export default Register;
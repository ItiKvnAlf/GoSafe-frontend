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

    useEffect(() => {
        document.title = 'Registro';
        if (!showSuccessAlert && redirectToHome) {
            (history as any).push('/home');
          }
    }, [showSuccessAlert, redirectToHome]);

    function validateRut(rut:string) {
        rut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
        
        if (!/^[0-9]+[0-9kK]{1}$/.test(rut)) {
            return false;
        }

        const num = rut.slice(0, -1);
        const dv = rut.slice(-1);
      
        const reversedNum = num.split('').reverse().join('');
        let suma = 0;
        let multiplicador = 2;
      
        for (let i = 0; i < reversedNum.length; i++) {
          suma += parseInt(reversedNum.charAt(i)) * multiplicador;
          multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
      
        const residuo = suma % 11;
        const digitoVerificador = residuo === 0 ? 0 : 11 - residuo;
      
        if ((digitoVerificador === 10 && dv === 'K') || (digitoVerificador === parseInt(dv))) {
          return true;
        } else {
          return false;
        }
    }

    const handleRegister = async () => {
        const userData = { name, email, password, confirmPass, rut, phone };

        if (name === '') {
            setShowAlert(true);
            setAlertMessage('El nombre es requerido');
            return;
        } else if (email === '') {
            setShowAlert(true);
            setAlertMessage('El correo electrónico es requerido');
            return;
        } else if(email.includes('@') === false || email.includes('.') === false){
            setShowAlert(true);
            setAlertMessage('El correo electrónico no es válido');
            return;
        } else if (rut === '') {
            setShowAlert(true);
            setAlertMessage('El RUT es requerido');
            return;
        } else if(validateRut(rut) === false){
            setShowAlert(true);
            setAlertMessage('El RUT ingresado no es válido o no existe');
            return;
        } else if (phone === '') {
            setShowAlert(true);
            setAlertMessage('El teléfono es requerido');
            return;
        } else if (!/^[0-9]+$/.test(phone)){
            setShowAlert(true);
            setAlertMessage('El teléfono solo puede contener caracteres numéricos');
            return;
        } else if (phone.length < 9) {
            setShowAlert(true);
            setAlertMessage('El teléfono debe tener al menos 9 dígitos');
            return;    
        } else if (password === '') {
            setShowAlert(true);
            setAlertMessage('La contraseña es requerida');
            return;
        } else if (confirmPass === '') {
            setShowAlert(true);
            setAlertMessage('La confirmación de contraseña es requerida');
            return;
        } else if (password !== confirmPass) {
            setShowAlert(true);
            setAlertMessage('Las contraseñas no coinciden');
            return;
        }else{
            try {
                const response = await axios.post('http://localhost:3000/auth/signUp', userData);
                if (response.data !== undefined) {
                  setShowSuccessAlert(true);
                  setRedirectToHome(true);
                  setAlertMessage('Registro exitoso');
                } else {
                  setShowAlert(true);
                  setAlertMessage('Error en el proceso de registro. Por favor intente nuevamente');
                }
              } catch (error: any) {
                setShowAlert(true);
                setAlertMessage('Error. Por favor intente nuevamente');
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
            <IonButton onClick={handleRegister} fill="outline" expand="block" style ={{marginTop: "10%", marginLeft: "10%", marginRight: "10%"}}>
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
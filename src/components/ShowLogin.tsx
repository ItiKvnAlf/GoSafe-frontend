
import React, { useEffect, useState } from 'react';
import { IonAlert, IonContent, IonIcon, IonImg, IonInput, IonItem, IonPage } from '@ionic/react';
import { mail, lockClosed } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { LoginFecth } from './axios/custom';
import { ButtonClear, ButtonFilled, ButtonOutline } from './common';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { login } from '../redux/authSlice';
import { UpdateUser } from '../redux/userSlice';

const ShowLogin: React.FC = () => {

    //redux
    const auth = useAppSelector((state) => state.auth);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const history = useHistory();
    const [email, setEmail] = useState('kevinalfarost@gmail.com');
    const [password, setPassword] = useState('1234');
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Inicio de sesión';
    }, []);

    const handleAlertConfirm = () => {
        setShowAlert(false);
    };

    const handleLogin = async () => {
        setLoading(true);
        const userData = { email, password };

        if (email === '') {
            setAlertMessage('El correo electrónico es requerido');
            setShowAlert(true);
            setLoading(false);
            return;
        } else if (password === '') {
            setAlertMessage('La contraseña es requerida');
            setShowAlert(true);
            setLoading(false);
            return;
        }

        try {
            const response = await LoginFecth().post('/auth/signIn', userData)
            const payload = response.data;

            dispatch(login({
                token: payload.token,
            }))

            if (response.data.message === 'Signed in successfully') {
                setRedirectToHome(true);
                setAlertMessage('Inicio de sesión exitoso');
                setShowSuccessAlert(true);
                setLoading(true);
                (history as any).push('/home');
                dispatch(UpdateUser({
                    email: payload.data.email,
                    rut: payload.data.rut,
                    name: payload.data.name,
                    phone: payload.data.phone,
                    contacts: payload.data.contacts,
                    address: payload.data.address
                }))

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('token_expires', response.data.token_expires);
            } else if (response.data.message === 'Token Expired or invalid') {
                setShowAlert(true);
                setAlertMessage('El tiempo de sesión ha expirado');
                setLoading(false);
            } else {
                setAlertMessage('Error en el inicio de sesión. Por favor intente nuevamente');
                setShowAlert(true);
                setLoading(false);
            }


        } catch (error: any) {
            setAlertMessage('El correo electrónico o la contraseña son incorrectos');
            setShowAlert(true);
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonContent fullscreen color="light">
                <IonImg
                    src="../assets/logo.png"
                    alt="logo"
                    style={{ width: "35%", marginTop: "15%", marginBottom: "10%", justifySelf: "center", alignSelf: "center", display: "block", marginLeft: "auto", marginRight: "auto" }}
                ></IonImg>
                <IonItem style={{ marginLeft: "10%", marginRight: "10%", borderRadius: "50px" }}>
                    <IonIcon icon={mail} color='tertiary'></IonIcon>
                    <IonInput
                        style={{ textAlign: "center" }}
                        value={email} labelPlacement="stacked"
                        type="email" placeholder="Correo electrónico"
                        onIonInput={(e) => setEmail(e.detail.value!)}
                    ></IonInput>
                </IonItem>
                <IonItem style={{ marginTop: "1%", marginLeft: "10%", marginRight: "10%", borderRadius: "50px" }}>
                    <IonIcon icon={lockClosed} color='primary'></IonIcon>
                    <IonInput
                        style={{ textAlign: "center" }}
                        value={password} labelPlacement="stacked"
                        type="password" placeholder="Contraseña"
                        onIonInput={(e) => setPassword(e.detail.value!)}
                    ></IonInput>
                </IonItem>
                <ButtonClear
                    text="¿Olvidaste tu contraseña?"
                    path="resetpassword"
                />
                <ButtonFilled
                    text="Iniciar sesión"
                    onClick={handleLogin}
                    loading={loading}
                />
                <ButtonOutline
                    text="Registrarse"
                    path="/register"
                />
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    message={alertMessage}
                    buttons={['Cancelar', { text: 'Aceptar', handler: handleAlertConfirm }]}
                />
            </IonContent>
        </IonPage>
    );
}

//setPassword(e.detail.value!)
export default ShowLogin;
import { useState } from "react";

export const useContacts = () => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);


    return {
        success,
        email,
        phone,
        name,
        setEmail,
        setPhone,
        setName,
        setSuccess
    };
};


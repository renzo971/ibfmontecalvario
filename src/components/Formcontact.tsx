import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function Formcontact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});
        setSuccessMessage('');
        setErrorMessage('');

        // Validación del formulario
        const newErrors: Partial<FormData> = {};
        if (!name) newErrors.name = 'El nombre es obligatorio';
        if (!email) newErrors.email = 'El correo electrónico es obligatorio';
        if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Correo electrónico inválido';
        if (!message) newErrors.message = 'El mensaje es obligatorio';

        // Si hay errores, no enviamos el formulario
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            // Enviar los datos con Axios
            const response = await axios.post("https://script.google.com/macros/s/AKfycbymlSBmlCxBoYwvnNNqgf-pEk7G8Hts1K110_PzTmKZGcsRXlwHImEhi1-psHF4_qkS/exec", {
                name,
                email,
                message,
            });

            // Si la respuesta es exitosa
            if (response.status === 200) {
                setSuccessMessage('Datos enviados correctamente');
                setName('');
                setEmail('');
                setMessage('');
            }
        } catch (error: any) {
            // En caso de error
            setErrorMessage(error.response?.data?.message || 'Error al enviar los datos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="mb-6">
                <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Nombre:</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="mb-6">
                <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Correo electrónico:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="mb-6">
                <label htmlFor="message" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' >Mensaje:</label>
                <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.message && <span className="error">{errors.message}</span>}
            </div>
            <div className="flex items-start mb-6 mt-6"><button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {loading ? 'Enviando...' : 'Enviar'}
            </button></div>

        </form>
    );
}

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../db/supabase.ts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const notifySuccess = (message: string): void => {
        toast.dismiss();
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyError = (message: string): void => {
        toast.dismiss();
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const onSubmit = async (formData: FormData) => {
        try {
            setIsSubmitting(true);
            const { error } = await supabase.auth.signUp({
                email: "mezyronaltotupapi@gmail.com",
                password: "tuvefe123",
            });

            if (error) {
                throw error;
            }

            notifySuccess("¡Bienvenido!");

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 2000);
        } catch (error: any) {
            switch (error.status) {
                case 400:
                    notifyError('No existe una cuenta con ese correo electrónico o la contraseña es incorrecta.');
                    break;
                case 429:
                    notifyError('Demasiados intentos fallidos. Por favor, inténtalo más tarde.');
                    break;
                default:
                    notifyError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
                    break;
            }
        } finally {
            setIsSubmitting(false);
        }

       
    };

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'example@email.com',
          password: 'example-password',
        })

       if(data.session != null) {
         window.location.href = 'https://youtube.com'
       }
      }

    return (
        <div className="grid grid-cols-2 h-[500px] border-2 border-blue-900 rounded-lg shadow-lg bg-white items-center justify-center">
            <div className="flex flex-col justify-center items-center p-8">
                <form 
                // onSubmit={handleSubmit(onSubmit)} 
                className="flex flex-col gap-4" method='post'>
                    <div className="flex flex-col gap-2 font-sans">
                        <label className="text-gray-700">CORREO</label>
                        <input
                            className="p-2 border rounded-lg border-blue-900 bg-white text-black"
                            type="email"
                            placeholder="INGRESE SU CORREO"
                            {...register('email', {
                                required: 'El correo electrónico es obligatorio',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'El formato del correo electrónico no es válido'
                                }
                            })}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2 font-sans">
                        <label className="text-gray-700">CONTRASEÑA</label>
                        <input
                            className="p-2 border rounded-lg border-blue-900 w-[300px] bg-white text-black"
                            type="password"
                            placeholder="INGRESE SU CONTRASEÑA"
                            {...register('password', { required: 'La contraseña es obligatoria' })}
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    <button
                        type="submit"
                        className="mt-4 p-2 bg-blue-900 text-white rounded-xl"
                        disabled={isSubmitting}
                        onSubmit={signInWithEmail}
                    >{isSubmitting ? 'INICIANDO...' : 'INICIAR'}</button>
                </form>
                <ToastContainer />
            </div>
            <div className="bg-blue-900 h-full flex flex-col items-center justify-center text-white p-12" style={{ clipPath: 'polygon(100% 100%, 0% 100%, 30% 0%, 100% 0%)' }}>
                <div className="text-center mb-8">
                    <h1 className="ml-8 text-4xl font-jockey">¡HOLA, QUÉ GUSTO</h1>
                    <h1 className="ml-8 text-3xl font-jockey">VERTE DE NUEVO!</h1>
                </div>
                <div className="text-center">
                    <h1 className="ml-8 text-sm">INICIA SESIÓN PARA EMPEZAR CON TU DÍA</h1>
                </div>
            </div>
        </div>
    );
}

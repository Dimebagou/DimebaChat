'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs';

import Input from '../../components/inputs/Input';
import Button from '../../components/Button';
import AuthSocialButton from './AuthSocialButton';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users');
        }
    }, [session?.status, router]);


    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
           axios.post('/api/register', data)
           .then(() => signIn('credentials', data))
           .catch(() => toast.error("Quelque chose s'est mal passé."))
           .finally(() => setIsLoading(false));
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error) {
                    toast.error("Oops ! Mauvais identifiants. Vérifiez votre nom d'utilisateur et mot de passe.")
                }

                if(callback?.ok && !callback?.error) {
                    toast.success("Bienvenue sur DimebaChat ! Vous êtes connecté(e) !")
                    router.push('/users');
                }
            })
            .finally(() => setIsLoading(false));
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, {
            redirect: false
        })
        .then((callback) => {
            if(callback?.error) {
                toast.error("Oops ! Mauvais identifiants. Vérifiez votre nom d'utilisateur et mot de passe.")
            }

            if(callback?.ok && !callback?.error) {
                toast.success("Bienvenue sur DimebaChat ! Vous êtes connecté(e) !")
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                    bg-gray-950
                    px-4
                    py-8
                    shadow
                    text-gray-50
                    sm:px-10
                    sm:rounded-lg
                "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input
                            id="name"
                            label='Pseudo'
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id="email"
                        label='Email'
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        id="password"
                        label='Mot de passe'
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Se connecter' : 'Créer un compte'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className='relative'>
                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center"
                        >
                            <div
                                className="
                                    w-full 
                                    border-t 
                                    border-gray-700"
                            />
                        </div>
                        <div className='
                            relative 
                            flex 
                            justify-center 
                            text-sm'
                        >
                            <span className='
                                bg-gray-950 
                                px-2 
                                text-gray-50'
                            >
                                Ou continuer avec
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>

                <div className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-50
                ">
                    <div>
                        {variant === 'LOGIN' ? 'Nouveau sur DimebaChat ?' : 'Vous avez déjà un compte ?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer hover:-translate-y-0.5 transition"
                    >
                        {variant === 'LOGIN' ? 'Créer un compte' : 'Se connecter'}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AuthForm
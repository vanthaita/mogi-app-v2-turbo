'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProfileOnce, useAuth } from '@/context/auth.context';
import axiosInstance from '@/helper/axios';
import axios from 'axios';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const { setUser, setIsLoggedIn, setToken } = useAuth();
    const router = useRouter();

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`;
    };

    const handleSignIn = async () => {
        setLoading(true);
        try {
        const response = await axiosInstance.post('/auth/sign-in', { email, password });
        if (response.status === 200) {
            const { access_token, refresh_token } = response.data;
            if (access_token && refresh_token) {
            const cookieResponse = await axios.post('/api/cookie', {
                accessToken: access_token,
                refreshToken: refresh_token,
            });

            if (cookieResponse.status !== 200) {
                throw new Error('Failed to store cookies');
            }
            setToken(access_token);
            const profile = await fetchProfileOnce(access_token);
            if (profile) {
                setUser(profile);
                setIsLoggedIn(true);
                router.push('/dashboard');
            } else {
                setIsLoggedIn(false);
            }
            }
        } else {
            setIsError(true);
        }
        } catch (error) {
        console.error('Error during sign-in:', error);
        setIsError(true);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="col-span-1 lg:pe-12 bg-white max-w-md mx-auto mt-4">
            <div className="pb-4 mb-8 text-center">
                <div className="flex items-center gap-3 mb-2 justify-center">
                <h3 className="text-4xl font-bold text-blue-600">Mogi</h3>
                </div>
                <p className="text-lg text-gray-600">Please enter your details</p>
            </div>

            <div className="w-full space-y-6">
                <Button 
                variant="neutral" 
                onClick={handleGoogleLogin} 
                disabled={loading} 
                className="w-full flex justify-center items-center gap-x-2 bg-gray-100 hover:bg-gray-200 rounded-md py-2"
                >
                <Image src="/google.svg" height={20} width={20} alt="google" />
                <span className="font-medium text-lg text-gray-600">Sign in with Google</span>
                </Button>

                <div className="flex items-center w-full gap-x-1">
                <hr className="flex-grow border-t border-gray-300" />
                <p className="text-center text-gray-500">Or sign in with email</p>
                <hr className="flex-grow border-t border-gray-300" />
                </div>

                <Input 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={loading} 
                className="border rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500"
                />
                
                <Input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                disabled={loading} 
                className="border rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-between items-center text-sm text-gray-600">
                <label className="flex items-center gap-x-2">
                    <input type="checkbox" id="rememberMe" name="rememberMe" className="rounded text-blue-500" />
                    Remember me
                </label>

                <Link href="/forgot-password">
                    <span className="hover:text-blue-500">Forgot Password?</span>
                </Link>
                </div>

                {isError && (
                <span className="text-red-500 font-medium text-center block">
                    Error: Incorrect username or password
                </span>
                )}

                <Button 
                variant="neutral" 
                onClick={handleSignIn} 
                disabled={loading} 
                className="w-full text-lg font-semibold py-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-150 ease-in-out"
                >
                {loading ? (
                    <div className="flex items-center justify-center gap-x-2">
                    <span className="loader inline-block h-4 w-4 border-2 border-t-2 border-white rounded-full animate-spin"></span>
                    Signing In...
                    </div>
                ) : 'Sign In'}
                </Button>

                <p className="text-center text-gray-600 mt-4">
                Not registered yet? 
                <Link href="/sign-up">
                    <strong className="text-blue-500 hover:underline"> Create an Account</strong>
                </Link>
                </p>
            </div>
        </div>
    );
}

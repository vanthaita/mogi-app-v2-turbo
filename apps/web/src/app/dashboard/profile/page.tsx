'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth.context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from '@/helper/axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePage = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        familyName: '',
        givenName: '',
        name: '',
        email: '',
        providerId: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                familyName: user?.familyName || '',
                givenName: user?.givenName || '',
                name: user?.name || '',
                email: user?.email || '',
                providerId: user?.providerId || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file); 
        }
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append('familyName', formData.familyName);
        formDataToSend.append('givenName', formData.givenName);
        formDataToSend.append('name', formData.name);

        if (imageFile) {
            formDataToSend.append('file', imageFile);  // Ensure the key matches 'file' from backend.
        }

        try {
            const response = await axiosInstance.post('/user', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data) {
                setSuccessMessage('Update successful');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4">
            {successMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {successMessage}
                </div>
            )}
            <div className="flex justify-start items-center gap-4">
                <Avatar>
                    <AvatarImage src={user?.picture || '/avatar.svg'} />
                    <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <p className="underline text-blue-500 cursor-pointer">Change image</p>
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="mt-2"
                />
            </div>
            <form className="mt-6 space-y-4">
                <div>
                    <Label className="block text-sm font-medium text-gray-700" htmlFor="name">
                        Name
                    </Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium text-gray-700" htmlFor="familyName">
                        Family Name
                    </Label>
                    <Input
                        id="familyName"
                        value={formData.familyName}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                    />
                </div>

                <div>
                    <Label className="block text-sm font-medium text-gray-700" htmlFor="givenName">
                        Given Name
                    </Label>
                    <Input
                        id="givenName"
                        value={formData.givenName}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                    />
                </div>

                <div>
                    <Label className="block text-sm font-medium text-gray-700" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        value={formData.email}
                        disabled={true}
                        className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                    />
                </div>

                <div>
                    <Label className="block text-sm font-medium text-gray-700" htmlFor="providerId">
                        Provider ID
                    </Label>
                    <Input
                        id="providerId"
                        value={formData.providerId}
                        disabled={true}
                        className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                    />
                </div>
            </form>
            <div className="mt-6 flex justify-end gap-4">
                <Button className="px-4 py-2 border rounded-md text-gray-600">Cancel</Button>
                <Button className="px-4 py-2 bg-black text-white rounded-md" disabled={isLoading} onClick={handleSaveChanges}>
                    {isLoading ? 'Loading...' : 'Save changes'}
                </Button>
            </div>
        </div>
    );
};

export default ProfilePage;

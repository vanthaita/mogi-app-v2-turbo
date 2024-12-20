'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth.context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from '@/helper/axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Loader, Save, X } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        familyName: '',
        givenName: '',
        name: '',
        email: '',
        providerId: '',
        // personalInfo: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                familyName: user?.familyName || '',
                givenName: user?.givenName || '',
                name: user?.name || '',
                email: user?.email || '',
                providerId: user?.providerId || '',
                // personalInfo: user?.personalInfo || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setCvFile(file);
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append('familyName', formData.familyName);
        formDataToSend.append('givenName', formData.givenName);
        formDataToSend.append('name', formData.name);
        // formDataToSend.append('personalInfo', formData.personalInfo);

        if (imageFile) {
            formDataToSend.append('profileImage', imageFile);
        }
        if (cvFile) {
            formDataToSend.append('cv', cvFile);
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
        return (
            <div className="flex items-center justify-center h-full">
                <Loader className="animate-spin text-black" size={48} /> 
                <p className="ml-2 text-lg font-medium text-gray-600">Loading Profile...</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            {successMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
                    {successMessage}
                </div>
            )}
            <div className="flex flex-col md:flex-row justify-start items-center gap-4 mb-6">
                <div className="relative group cursor-pointer">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={previewImage || user?.picture || '/avatar.svg'} />
                        <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <label
                        htmlFor="image-upload"
                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium rounded-full cursor-pointer"
                    >
                        <Edit size={20} className="mr-2" /> Change
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
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

                {/* <div>
                    <Label className="block text-sm font-medium text-gray-700" htmlFor="personalInfo">
                        Personal Information
                    </Label>
                    <textarea
                        id="personalInfo"
                        value={formData.personalInfo}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                    />
                </div> */}

                <div>
                    <Label className="block text-sm font-medium text-gray-700" htmlFor="cv-upload">
                        Upload CV/Resume
                    </Label>
                    <input
                        id="cv-upload"
                        type="file"
                        onChange={handleCvChange}
                        accept=".pdf,.doc,.docx"
                        className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-300"
                    />
                </div>
            </form>
            <div className="mt-6 flex justify-end gap-4">
                <Button className="px-4 py-2 border rounded-md text-gray-600 flex items-center">
                    <X size={20} className="mr-2" /> Cancel
                </Button>
                <Button
                    className="px-4 py-2 bg-black text-white rounded-md flex items-center"
                    disabled={isLoading}
                    onClick={handleSaveChanges}
                >
                    {isLoading ? 'Loading...' : <Save size={20} className="mr-2" />} Save changes
                </Button>
            </div>
        </div>
    );
};

export default ProfilePage;

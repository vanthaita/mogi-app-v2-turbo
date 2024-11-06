'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const SettingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [fontSize, setFontSize] = useState('medium');
  const [language, setLanguage] = useState('en');
  const [timeZone, setTimeZone] = useState('GMT+7');
  const [privacy, setPrivacy] = useState('public');

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(event.target.value);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleTimeZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeZone(event.target.value);
  };

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPrivacy(event.target.value);
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="mx-auto space-y-6">

        <Card className=" bg-gray-100">
          <CardHeader>
            <h2 className="text-xl font-semibold">Preferences</h2>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <label className="font-medium">Dark Mode</label>
              <label className="switch">
                <Checkbox />
                <span className="slider"></span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="font-medium">Enable Notifications</label>
              <label className="switch">
                <Checkbox />
                <span className="slider"></span>
              </label>
            </div>

            <div>
              <label className="block font-medium mb-2">Theme Color:</label>
              <select
                value={selectedColor}
                onChange={handleColorChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Font Size:</label>
              <select
                value={fontSize}
                onChange={handleFontSizeChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className=" bg-gray-100">
          <CardHeader>
            <h2 className="text-xl font-semibold">Time and Privacy Settings</h2>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Time Zone:</label>
              <select
                value={timeZone}
                onChange={handleTimeZoneChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="GMT+7">GMT+7 (Vietnam)</option>
                <option value="GMT+9">GMT+9 (Japan)</option>
                <option value="GMT-5">GMT-5 (New York)</option>
                <option value="GMT+1">GMT+1 (Paris)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">Privacy Settings:</label>
              <select
                value={privacy}
                onChange={handlePrivacyChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className=" bg-gray-100">
          <CardHeader>
            <h2 className="text-xl font-semibold">Language Settings</h2>
          </CardHeader>
          <CardContent>
            <div>
              <label className="block font-medium mb-2">Language:</label>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="en">English</option>
                <option value="jp">Japanese</option>
                <option value="vn">Vietnamese</option>
                <option value="fr">French</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button >Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;

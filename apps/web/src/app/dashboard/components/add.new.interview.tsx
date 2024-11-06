'use client'
import React, { useState, useCallback } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Loader2, Plus, Briefcase, Code, Calendar, Info, Globe, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/auth.context';
import axiosInstance from '@/helper/axios';
import { FormDataType } from '@/utils/type';

const INITIAL_FORM_DATA: FormDataType = {
  jobPosition: '',
  jobDescription: '',
  experience: '',
  companyInfo: '',
  interviewLanguage: '',
  additionalDetails: '',
};

const AddNewInterview: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const toggleDialog = useCallback(() => setDialogOpen((prev) => !prev), []);
  const handleChange = useCallback((field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/interview/create', {
        ...formData,
        userId: user?.id,
      });
      if (response.data) {
        router.push(`/dashboard/interview/${response.data.interviewId}`);
      } else {
        console.error('Failed to save interview');
      }
    } catch (error) {
      console.error('Error occurred while processing the interview data:', error);
    } finally {
      setFormData(INITIAL_FORM_DATA);
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <ContextMenu>
        <ContextMenuTrigger className="flex w-[300px] h-[150px] cursor-pointer items-center justify-center rounded-md border border-dashed text-sm"
          onClick={toggleDialog}
          aria-label="Open Add Interview Dialog">
          <Plus />
          <span className="text-lg font-medium">Add New</span>
        </ContextMenuTrigger>
      </ContextMenu>
      
      <Dialog open={isDialogOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">Tell us more about the job.</DialogTitle>
            <DialogDescription className="text-sm font-medium">
              Provide details about the job you&apos;re interviewing for.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {/* Job Position/Role Dropdown */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="jobPosition" className="flex items-center gap-2 text-sm font-medium">
                  <Briefcase />
                  Job Position/Role
                </Label>
                <Select onValueChange={(value) => handleChange('jobPosition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                    <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                    <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                    {/* Add more options as needed */}
                  </SelectContent>
                </Select>
              </div>

              {/* Tech Stack Dropdown */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="jobDescription" className="flex items-center gap-2 text-sm font-medium">
                  <Code />
                  Tech Stack
                </Label>
                <Select onValueChange={(value) => handleChange('jobDescription', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tech stack" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="React, TypeScript">React, TypeScript</SelectItem>
                    <SelectItem value="Node.js, Express">Node.js, Express</SelectItem>
                    <SelectItem value="Python, Django">Python, Django</SelectItem>
                    <SelectItem value="Java, Spring Boot">Java, Spring Boot</SelectItem>
                    {/* Add more options as needed */}
                  </SelectContent>
                </Select>
              </div>

              {/* Years of Experience Dropdown */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="experience" className="flex items-center gap-2 text-sm font-medium">
                  <Calendar />
                  Years of Experience
                </Label>
                <Select onValueChange={(value) => handleChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="2">2 years</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                    {/* Add more options as needed */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              {/* Company Information Textarea */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="companyInfo" className="flex items-center gap-2 text-sm font-medium">
                  <Info />
                  Company Information
                </Label>
                <Textarea
                  id="companyInfo"
                  placeholder="Provide additional information about the company"
                  value={formData.companyInfo}
                  onChange={(e) => handleChange('companyInfo', e.target.value)}
                />
              </div>

              {/* Interview Language Dropdown */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="interviewLanguage" className="flex items-center gap-2 text-sm font-medium">
                  <Globe />
                  Interview Language
                </Label>
                <Select onValueChange={(value) => handleChange('interviewLanguage', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interview language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    {/* Add more options as needed */}
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Details Textarea */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="additionalDetails" className="flex items-center gap-2 text-sm font-medium">
                  <FileText />
                  Additional Details
                </Label>
                <Textarea
                  id="additionalDetails"
                  placeholder="Add any additional details or requirements for the interview"
                  value={formData.additionalDetails}
                  onChange={(e) => handleChange('additionalDetails', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="neutral" onClick={toggleDialog}>Cancel</Button>
            <Button
              className="bg-blue-300 text-black font-medium text-lg"
              onClick={handleSubmit}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : 'Start Interview'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.memo(AddNewInterview);

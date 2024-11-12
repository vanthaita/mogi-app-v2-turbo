'use client';
import React, { useState, ChangeEvent, use, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Edit2, Loader2, Plus, Trash } from 'lucide-react';
import { useAuth } from '@/context/auth.context';
import axiosInstance from '@/helper/axios';
import { QuestionType, TemplateFormDataType } from '@/utils/type';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';

const INITIAL_FORM_DATA: TemplateFormDataType = {
    jobPosition: '',
    jobDescription: '',
    experience: '',
    companyInfo: '',
    interviewLanguage: '',
    additionalDetails: '',
    jsonMockResp: '',
    isPublic: false,
};
const AddNewTemplate: React.FC = () => {
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<TemplateFormDataType>(INITIAL_FORM_DATA);
    const [questionsArray, setQuestionsArray] = useState<QuestionType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();
    const router = useRouter();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const togglePublicStatus = (): void => setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }));
    
    const addQuestion = (): void => {
        if (questionsArray.length < 5) {
            setQuestionsArray([...questionsArray, { question: '', answer: '' }]);
        }
    };
    
    
    const handleQuestionChange = (index: number, field: 'question' | 'answer', value: string): void => {
        console.log(`Updating question at index ${index}:`, field, value);
        setQuestionsArray((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index][field] = value;
            return updatedQuestions;
        });
        
    };
    
    useEffect(() => {
        console.log(questionsArray);
    }, [questionsArray]); 
    
    const handleEditToggle = (index: number): void => setEditIndex(index === editIndex ? null : index);

    const handleRemoveQuestion = (index: number): void => {
        setQuestionsArray((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
    };
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => e.target.files && setFile(e.target.files[0]);

    const handleSubmit = async (): Promise<void> => {
        setLoading(true);
        const uploadData = new FormData();
        if (file) uploadData.append('file', file);
        const changeTypeQuestionsToJsonResp = {
            questions: questionsArray.map((question) => ({ question: question.question, answer: question.answer })),
        }
        uploadData.append('jobPosition', formData.jobPosition);
        uploadData.append('jobDesc', formData.jobDescription); 
        uploadData.append('jobExperience', formData.experience);
        uploadData.append('companyInfo', formData.companyInfo);
        uploadData.append('interviewLanguage', formData.interviewLanguage);
        uploadData.append('additionalDetails', formData.additionalDetails);
        uploadData.append('jsonMockResp', JSON.stringify(changeTypeQuestionsToJsonResp));
        uploadData.append('isPublic', formData.isPublic !== undefined ? formData.isPublic.toString() : 'false');
        uploadData.append('userId', user?.id as string);
        try {
            console.log("DATA: ", uploadData);
            const response = await axiosInstance.post('/interview/create-template', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const data = response.data;
            console.log('Successfully created interview template:', data);
            if (data) router.push(`/dashboard/interview/${data.templateId}`);
            else console.error('Failed to save interview');
        } catch (error) {
            console.error('Error creating interview template:', error);
        } finally {
            setFormData(INITIAL_FORM_DATA);
            setQuestionsArray([]);  
            setLoading(false);
        }
    };
    

    return (
        <div className='mt-4 w-full overflow-y-auto'>
            <div className='w-[300px]' onClick={() => setDialogOpen(true)}>
                <ContextMenu>
                    <ContextMenuTrigger className="flex h-[150px] w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-border text-sm hover:shadow-md transition-shadow duration-300">
                        <div className='flex justify-center items-center gap-x-2'>
                            <Plus />
                            <span className='text-lg font-medium'>Add New Template</span>
                        </div>
                    </ContextMenuTrigger>
                </ContextMenu>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className='max-w-6xl'>
                    <DialogHeader>
                        <DialogTitle>Create New Interview Template</DialogTitle>
                        <DialogDescription>Fill in the details below to create a new template.</DialogDescription>
                    </DialogHeader>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2'>
                                {['jobPosition', 'experience', 'interviewLanguage'].map((field) => (
                                    <div className='input-field' key={field}>
                                        <Label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</Label>
                                        <Input id={field} placeholder={field.replace(/([A-Z])/g, ' $1')} onChange={handleChange} value={(formData as any)[field]} />
                                    </div>
                                ))}
                                {['jobDescription', 'companyInfo', 'additionalDetails'].map((field) => (
                                    <div className='input-field' key={field}>
                                        <Label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</Label>
                                        <Textarea id={field} placeholder={field.replace(/([A-Z])/g, ' $1')} onChange={handleChange} value={(formData as any)[field]} />
                                    </div>
                                ))}
                            </div>
                            <div className='mt-4'>
                                <Label>
                                    <div className='flex items-end gap-x-2'>
                                        <input type="checkbox" checked={formData.isPublic} onChange={togglePublicStatus} className='mt-1'/> 
                                        <span>Public Template</span>
                                    </div>
                                </Label>
                            </div>
                            <div className='mt-4'>
                                <Label htmlFor="fileUpload">Upload a File (optional)</Label>
                                <Input type="file" id="fileUpload" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <Label>Add Questions (up to 5)</Label>
                            <div className='space-y-2'>
                                {questionsArray.map((q, index) => (
                                    <div key={index} className='flex gap-2'>
                                        {editIndex === index ? (
                                            <div className='flex flex-1 gap-2'>
                                                <Input
                                                    placeholder="Question"
                                                    value={q.question}
                                                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                                    className='flex-1'
                                                />
                                                <Textarea
                                                    placeholder="Answer"
                                                    value={q.answer}
                                                    onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                                                    className='flex-1'
                                                />
                                            </div>
                                        ) : (
                                            <div className='flex-1 space-y-1'>
                                                <p className='font-medium'>{q.question || 'No question'}</p>
                                                <p className='text-sm text-gray-600'>{q.answer || 'No answer'}</p>
                                            </div>
                                        )}
                                        <div className='flex items-start gap-1 '>
                                            <Button variant="neutral" size="icon" onClick={() => handleEditToggle(index)}>
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button variant="neutral" size="icon" onClick={() => handleRemoveQuestion(index)}>
                                                <Trash size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={`w-full ${questionsArray.length === 0 ? 'justify-start':'justify-end'} flex`}>
                                <Button size="sm" onClick={addQuestion} className={`${questionsArray.length >= 5 && 'hidden'}`}>
                                    Add Question
                                </Button>
                            </div>
                        </div>

                    </div>
                    <DialogFooter className='flex justify-between items-center'>
                        <Button onClick={() => setDialogOpen(false)}>Close</Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Create Template'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewTemplate;

export interface InterviewQuestion {
    question: string;
    answer: string;
}

export interface QuestionSectionProps {
    mockInterviewQuestions: InterviewQuestion[];
    activeQuestionIndex: number;
}

export interface RecordAnswerSectionProps {
    mockInterviewQuestions: InterviewQuestion[];
    activeQuestionIndex: number;
    interviewData: any;
}


export interface FeedBackData {
    id: string;
    mockId: string;
    question: string;
    correctAnswer: string;
    userAns: string;
    feedback: string;
    rating: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface InterViewData {
    id: string;
    jobDesc: string;
    jobExperience: string;
    jobPosition: string;
    jsonMockResp: string;
    companyInfo?:   String;
    interviewLanguage?: String;
    additionalDetails?: String;
    userId: string;
    mockId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FeedbackItemProps {
    item: FeedBackData;
    index: number;
    getRatingColor: (rating: number) => string;
    getUserAnswerColor: (rating: number) => string;
}


export interface User {
    id: string;
    name: string;
    familyName: string;
    givenName: string;
    email: string;
    providerId: string;
    picture: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthContextProps {
    user: User | null;
    token: string;
    setToken: (value: string) => void
    isLoggedIn: boolean;
    logout: () => void;
    setUser: (user: User) => void;
    setIsLoggedIn: (_: boolean) => void;
}

export type FormDataType = {
    jobPosition: string;
    jobDescription: string;
    experience: string;
    companyInfo: string;
    interviewLanguage: string;
    additionalDetails: string;
};
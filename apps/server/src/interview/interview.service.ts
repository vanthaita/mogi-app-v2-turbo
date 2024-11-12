import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InterviewDto } from './dto/interview.dto';
import { AnswerQuestionDto } from './dto/user.answer.dto';
import { SearchMockInterviewDto } from './dto/search.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Injectable()
export class InterviewService {
    constructor(private prismaService: PrismaService,
        private readonly cloudinaryService: CloudinaryService

    ) {}
    async createMockInterviewTemplate(interviewDto: InterviewDto, companyLogoUrl?: Express.Multer.File) {
        try {
            console.log('Company Logo URL:', companyLogoUrl);
            console.log('Received interviewDto:', typeof interviewDto);
            console.log(interviewDto.userId);
            if (!interviewDto.userId) {
                throw new Error('userId is required in interviewDto.');
            }
    
            const userExists = await this.prismaService.user.findUnique({
                where: { id: interviewDto.userId },
            });
            if (!userExists) {
                throw new Error(`User with ID ${interviewDto.userId} does not exist.`);
            }
    
            let uploadedLogoUrl;
            if (companyLogoUrl) {
                try {
                    const uploadResult = await this.cloudinaryService.uploadFile(companyLogoUrl);
                    uploadedLogoUrl = uploadResult.url;
                } catch (uploadError) {
                    console.error('Error uploading file to Cloudinary:', uploadError);
                    throw new HttpException('File upload failed.', HttpStatus.BAD_REQUEST);
                }
            }
    
            const newMockInterview = await this.prismaService.mockInterview.create({
                data: {
                    userId: interviewDto.userId,
                    jsonMockResp: interviewDto.jsonMockResp,
                    jobPosition: interviewDto.jobPosition,
                    jobDesc: interviewDto.jobDesc,
                    jobExperience: interviewDto.jobExperience,
                    companyInfo: interviewDto.companyInfo,
                    interviewLanguage: interviewDto.interviewLanguage,
                    additionalDetails: interviewDto.additionalDetails,
                    is_public: interviewDto.isPublic as boolean,
                    companyLogoUrl: uploadedLogoUrl,
                },
                select: {
                    id: true,
                },
            });
    
            console.log('Created mock interview template with ID:', newMockInterview.id);
            return newMockInterview.id;
        } catch (error) {
            console.error('Error creating mock interview template:', error);
            throw new HttpException(
                'Error creating mock interview template',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    
    
    async saveInterview(interviewDto: InterviewDto) {
        try {
        const userExists = await this.prismaService.user.findUnique({
            where: { id: interviewDto.userId },
        });

        if (!userExists) {
            throw new Error(`User with ID ${interviewDto.userId} does not exist.`);
        }

        const responseData = await this.prismaService.mockInterview.create({
            data: {
                userId: interviewDto.userId,
                jsonMockResp: interviewDto.jsonMockResp,
                jobPosition: interviewDto.jobPosition,
                jobDesc: interviewDto.jobDesc,
                jobExperience: interviewDto.jobExperience,
                companyInfo: interviewDto.companyInfo,
                interviewLanguage: interviewDto.interviewLanguage,
                additionalDetails: interviewDto.additionalDetails,
            },
            select: {
                id: true,
            },
        });

        return responseData.id;
        } catch (err) {
        console.error('Error saving interview data:', err);
        throw err;
        }
    }

    async saveAnswerQuestion(answerQuestionDto: AnswerQuestionDto) {
        try {
        const mockExists = await this.prismaService.userAnswer.findFirst({
            where: {
            mockId: answerQuestionDto.mockId,
            question: answerQuestionDto.question,
            },
        });

        if (mockExists) {
            const updatedAnswer = await this.prismaService.userAnswer.update({
            where: {
                id: mockExists.id,
            },
            data: {
                ...answerQuestionDto,
            },
            });
            return updatedAnswer;
        } else {
            const answer = await this.prismaService.userAnswer.create({
            data: {
                mockId: answerQuestionDto.mockId,
                question: answerQuestionDto.question,
                correctAnswer: answerQuestionDto.correctAnswer,
                userAns: answerQuestionDto.userAns,
                feedback: answerQuestionDto.feedback,
                rating: answerQuestionDto.rating,
                userId: answerQuestionDto.userId,
            },
            });
            return answer;
        }
        } catch (err) {
        console.error(err);
        }
    }

    async getFeedBackData({ interviewId }: { interviewId: string }) {
        const interviewData = await this.prismaService.mockInterview.findUnique({
        where: {
            id: interviewId,
        },
        select: {
            id: true,
            userAnswers: true,
        },
        });
        return interviewData;
    }

    async GetInterviewData({ interviewId }: { interviewId: string }) {
        const FeedBackData = await this.prismaService.mockInterview.findUnique({
        where: {
            id: interviewId,
        },
        select: {
            id: true,
            jobPosition: true,
            jobDesc: true,
            jobExperience: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
            jsonMockResp: true,
        },
        });
        return FeedBackData;
    }
    async searchMockInterview(searchDto: SearchMockInterviewDto) {
        const { jobPosition, page = 1, limit = 4 } = searchDto;

        const [mockInterviews, totalCount] = await Promise.all([
        this.prismaService.mockInterview.findMany({
            where: {
                jobPosition: {
                    contains: jobPosition || '',
                    mode: 'insensitive',
                },
                is_public: true
            },
            skip: (page - 1) * limit,
            take: limit,
        }),
        this.prismaService.mockInterview.count({
            where: {
            jobPosition: {
                contains: jobPosition || '',
                mode: 'insensitive',
            },
            },
        }),
        ]);
        return {
            mockInterviews,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        };
    }
    async GetAllInterviewData({ userId }: { userId: string }) {
        const FeedBackData = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
            mockInterviews: {
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                jobPosition: true,
                jobDesc: true,
                jobExperience: true,
                jsonMockResp: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
            },
            },
        },
        });

        return FeedBackData?.mockInterviews || [];
    }
}

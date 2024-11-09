// src/interview/dto/user.answer.dto.ts
export class AnswerQuestionDto {
  mockId: string;
  question: string;
  correctAnswer: string;
  userAns: string;
  feedback?: string;
  rating?: string;
  userId: string;
  model?: string;
}

// Questions types
// {
//     "questions": [
//       {
//         "question": "",
//         "answer": ""
//       },
//     ]
//   }

interface Question {
    question: string;
    answer: string;
}
interface QuestionType {
    questions: Question[];
}

export const checkQuestionType = (question: string): boolean => {
    try {
        const parsedQuestion: QuestionType = JSON.parse(question);
        if("questions" in parsedQuestion && Array.isArray(parsedQuestion.questions)) {
            const questionArray = parsedQuestion.questions
            return questionArray.every(
                (items: any) => {
                    typeof items === "object" &&
                    items !== null && 
                    typeof items.questions === "string" &&
                    typeof items.answer === "string"
                }
            )
        }
    } catch (err) {
        return false;
    }
    return true;
}
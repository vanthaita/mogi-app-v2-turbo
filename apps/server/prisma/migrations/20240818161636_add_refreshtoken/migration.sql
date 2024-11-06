-- AlterTable
ALTER TABLE "MockInterview" ALTER COLUMN "additionalDetails" DROP NOT NULL,
ALTER COLUMN "companyInfo" DROP NOT NULL,
ALTER COLUMN "interviewLanguage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT;

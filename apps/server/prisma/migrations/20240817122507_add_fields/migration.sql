/*
  Warnings:

  - Added the required column `additionalDetails` to the `MockInterview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyInfo` to the `MockInterview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interviewLanguage` to the `MockInterview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MockInterview" ADD COLUMN     "additionalDetails" TEXT NOT NULL,
ADD COLUMN     "companyInfo" TEXT NOT NULL,
ADD COLUMN     "interviewLanguage" TEXT NOT NULL;

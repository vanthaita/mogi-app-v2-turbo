/*
  Warnings:

  - You are about to drop the column `mockId` on the `MockInterview` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_mockId_fkey";

-- DropIndex
DROP INDEX "MockInterview_mockId_key";

-- AlterTable
ALTER TABLE "MockInterview" DROP COLUMN "mockId";

-- AddForeignKey
ALTER TABLE "MockInterview" ADD CONSTRAINT "MockInterview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_mockId_fkey" FOREIGN KEY ("mockId") REFERENCES "MockInterview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

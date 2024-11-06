-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "familyName" TEXT,
    "givenName" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "picture" TEXT,
    "providerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockInterview" (
    "id" TEXT NOT NULL,
    "mockId" TEXT NOT NULL,
    "jsonMockResp" TEXT NOT NULL,
    "jobPosition" TEXT NOT NULL,
    "jobDesc" TEXT NOT NULL,
    "jobExperience" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MockInterview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" TEXT NOT NULL,
    "mockId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "userAns" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MockInterview_mockId_key" ON "MockInterview"("mockId");

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_mockId_fkey" FOREIGN KEY ("mockId") REFERENCES "MockInterview"("mockId") ON DELETE RESTRICT ON UPDATE CASCADE;

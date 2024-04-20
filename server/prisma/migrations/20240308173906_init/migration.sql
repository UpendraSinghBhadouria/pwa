-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "pwa";

-- CreateEnum
CREATE TYPE "pwa"."Role" AS ENUM ('Job Seeker', 'Employer');

-- CreateEnum
CREATE TYPE "pwa"."LoginAttemptsStatus" AS ENUM ('Success', 'Failure');

-- CreateEnum
CREATE TYPE "pwa"."ProfileGender" AS ENUM ('Male', 'Female', 'Rather Not To Say');

-- CreateEnum
CREATE TYPE "pwa"."QuestionType" AS ENUM ('MCQ', 'MCQ Image', 'MCQ Audio', 'MCQ Video');

-- CreateEnum
CREATE TYPE "pwa"."TestType" AS ENUM ('Mixed Mode');

-- CreateEnum
CREATE TYPE "pwa"."TestStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "pwa"."PowerUpType" AS ENUM ('Reward', 'Wildcard');

-- CreateEnum
CREATE TYPE "pwa"."PowerUpCodeName" AS ENUM ('PLUS_4_SECONDS', 'PLUS_8_SECONDS', 'TWICE_UP', 'THRICE_UP', 'DICE_UP', 'ASK_ABA', 'BETTER_HALF', 'CHOSEN_ONE', 'DOUBLE_EDGE', 'TIME_MACHINE');

-- CreateEnum
CREATE TYPE "pwa"."RewardType" AS ENUM ('Power-Ups', 'Streak Shield', 'Virtual Coins', 'League-In Pass', 'League-Up Pass', 'Streak Badge');

-- CreateTable
CREATE TABLE "pwa"."User" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isPhoneNumberVerified" BOOLEAN NOT NULL DEFAULT false,
    "isNewUser" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "role" "pwa"."Role" NOT NULL DEFAULT 'Job Seeker',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."Session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "token" TEXT,
    "loggedOutAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."LoginAttempts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "status" "pwa"."LoginAttemptsStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAttempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."OnBoarding" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "slug" TEXT,
    "details" JSONB[],
    "electives" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnBoarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "avatar" TEXT,
    "username" TEXT,
    "fullName" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT,
    "email" TEXT NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "dob" TIMESTAMP(3),
    "gender" "pwa"."ProfileGender",
    "resume" TEXT,
    "referredBy" INTEGER,
    "referredUsers" JSONB[],
    "profileCompletion" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."Address" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "line1" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cityDistrict" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."WorkExperience" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."Project" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."LicenseCertification" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LicenseCertification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."Education" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "schoolCollage" TEXT NOT NULL,
    "university" TEXT,
    "degree" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."AwardAchievement" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AwardAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."Tier1" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "foregroundColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tier1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."Tier2" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tier1Id" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tier2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."Tier3" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tier2Id" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tier3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."S1QuestionSetting" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "selection1" JSONB NOT NULL,
    "selection2" JSONB NOT NULL,
    "selection3" JSONB NOT NULL,
    "fs" INTEGER,
    "as" INTEGER,
    "cs" INTEGER,
    "es" INTEGER,
    "ts" INTEGER,
    "ss" INTEGER,
    "totalQuestions" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "S1QuestionSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."UserS1QuestionSetting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "selection1" JSONB NOT NULL,
    "selection2" JSONB NOT NULL,
    "selection3" JSONB NOT NULL,

    CONSTRAINT "UserS1QuestionSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."Next360DaysQuestionSetting" (
    "id" SERIAL NOT NULL,
    "tier1Id" INTEGER NOT NULL,
    "tier2Id" INTEGER NOT NULL,
    "totalTier3Topics" INTEGER NOT NULL,
    "totalTier3TopicSelection" INTEGER NOT NULL,
    "totalTier2Questions" INTEGER NOT NULL,

    CONSTRAINT "Next360DaysQuestionSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."QuestionTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "QuestionTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."Question" (
    "id" SERIAL NOT NULL,
    "type" "pwa"."QuestionType" NOT NULL,
    "tier1Id" INTEGER NOT NULL,
    "tier2Id" INTEGER NOT NULL,
    "tier3Id" INTEGER NOT NULL,
    "staticDL" INTEGER NOT NULL,
    "dynamicDL" INTEGER,
    "tags" INTEGER[],
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "avgTime" DECIMAL(3,1),
    "accuracy" INTEGER,
    "timeLimit" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."MCQQA" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "options" JSONB[],
    "answer" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MCQQA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."TriviaSetting" (
    "id" SERIAL NOT NULL,
    "correctResponseHeading" TEXT[],
    "incorrectResponseHeading" TEXT[],
    "contentHeading" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TriviaSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."QuestionTrivia" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionTrivia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."QAHistory" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "text" TEXT,
    "url" TEXT,
    "options" JSONB[],
    "answer" TEXT,
    "staticDL" INTEGER,
    "tags" INTEGER[],
    "isPublished" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QAHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."UserQAHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "day" INTEGER NOT NULL DEFAULT 0,
    "stageId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "tier1Id" INTEGER NOT NULL,
    "tier2Id" INTEGER NOT NULL,
    "tier3Id" INTEGER NOT NULL,
    "testType" "pwa"."TestType" NOT NULL,
    "questionId" INTEGER NOT NULL,
    "currentQuestionNo" INTEGER NOT NULL,
    "rewardsCollected" INTEGER[],
    "rewardApplied" INTEGER NOT NULL,
    "noOfAttempts" INTEGER NOT NULL DEFAULT 1,
    "timeSpent" INTEGER,
    "isQuestionSkipped" BOOLEAN NOT NULL DEFAULT false,
    "isLiked" BOOLEAN,
    "dislikeFeedback" TEXT,
    "isCorrect" BOOLEAN,
    "score" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserQAHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."StageHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "stageId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "tier1" INTEGER[],
    "tier2" INTEGER[],
    "tier3" INTEGER[],
    "testStatus" "pwa"."TestStatus" NOT NULL,
    "questionTypes" TEXT[],
    "totalQuestions" INTEGER NOT NULL,
    "totalCorrectAnswers" INTEGER NOT NULL,
    "totalTimeSpent" INTEGER NOT NULL,
    "rewardsCollected" INTEGER[],
    "rewardConsumed" INTEGER[],
    "repeatedQuestion" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StageHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."StreakHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "streak" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreakHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."PowerUpSetting" (
    "id" SERIAL NOT NULL,
    "type" "pwa"."PowerUpType" NOT NULL,
    "text" TEXT NOT NULL,
    "codeName" "pwa"."PowerUpCodeName" NOT NULL,

    CONSTRAINT "PowerUpSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."RewardSetting" (
    "id" SERIAL NOT NULL,
    "streak" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "type" "pwa"."RewardType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "isConsumed" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."RewardHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "rewardSettingId" INTEGER NOT NULL,
    "powerUpIds" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."StageSetting" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "startDay" INTEGER NOT NULL,
    "endDay" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StageSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pwa"."GradeSetting" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "minPercentage" INTEGER NOT NULL,
    "maxPercentage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GradeSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "pwa"."User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "pwa"."Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "OnBoarding_userId_key" ON "pwa"."OnBoarding"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "pwa"."Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "pwa"."Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Address_profileId_key" ON "pwa"."Address"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Tier1_name_key" ON "pwa"."Tier1"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tier2_name_key" ON "pwa"."Tier2"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tier3_name_key" ON "pwa"."Tier3"("name");

-- CreateIndex
CREATE UNIQUE INDEX "S1QuestionSetting_day_key" ON "pwa"."S1QuestionSetting"("day");

-- CreateIndex
CREATE UNIQUE INDEX "UserS1QuestionSetting_day_key" ON "pwa"."UserS1QuestionSetting"("day");

-- CreateIndex
CREATE UNIQUE INDEX "Next360DaysQuestionSetting_tier2Id_key" ON "pwa"."Next360DaysQuestionSetting"("tier2Id");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTag_name_key" ON "pwa"."QuestionTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MCQQA_questionId_key" ON "pwa"."MCQQA"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "MCQQA_text_key" ON "pwa"."MCQQA"("text");

-- CreateIndex
CREATE UNIQUE INDEX "MCQQA_answer_key" ON "pwa"."MCQQA"("answer");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionTrivia_questionId_key" ON "pwa"."QuestionTrivia"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "PowerUpSetting_text_key" ON "pwa"."PowerUpSetting"("text");

-- CreateIndex
CREATE UNIQUE INDEX "PowerUpSetting_codeName_key" ON "pwa"."PowerUpSetting"("codeName");

-- CreateIndex
CREATE UNIQUE INDEX "RewardSetting_streak_key" ON "pwa"."RewardSetting"("streak");

-- CreateIndex
CREATE UNIQUE INDEX "StageSetting_level_key" ON "pwa"."StageSetting"("level");

-- CreateIndex
CREATE UNIQUE INDEX "GradeSetting_level_key" ON "pwa"."GradeSetting"("level");

-- CreateIndex
CREATE UNIQUE INDEX "GradeSetting_name_key" ON "pwa"."GradeSetting"("name");

-- AddForeignKey
ALTER TABLE "pwa"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "pwa"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."LoginAttempts" ADD CONSTRAINT "LoginAttempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "pwa"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."OnBoarding" ADD CONSTRAINT "OnBoarding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "pwa"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "pwa"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Address" ADD CONSTRAINT "Address_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "pwa"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."WorkExperience" ADD CONSTRAINT "WorkExperience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "pwa"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Project" ADD CONSTRAINT "Project_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "pwa"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."LicenseCertification" ADD CONSTRAINT "LicenseCertification_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "pwa"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Education" ADD CONSTRAINT "Education_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "pwa"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."AwardAchievement" ADD CONSTRAINT "AwardAchievement_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "pwa"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Tier2" ADD CONSTRAINT "Tier2_tier1Id_fkey" FOREIGN KEY ("tier1Id") REFERENCES "pwa"."Tier1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Tier3" ADD CONSTRAINT "Tier3_tier2Id_fkey" FOREIGN KEY ("tier2Id") REFERENCES "pwa"."Tier2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."UserS1QuestionSetting" ADD CONSTRAINT "UserS1QuestionSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "pwa"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Next360DaysQuestionSetting" ADD CONSTRAINT "Next360DaysQuestionSetting_tier1Id_fkey" FOREIGN KEY ("tier1Id") REFERENCES "pwa"."Tier1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Next360DaysQuestionSetting" ADD CONSTRAINT "Next360DaysQuestionSetting_tier2Id_fkey" FOREIGN KEY ("tier2Id") REFERENCES "pwa"."Tier2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Question" ADD CONSTRAINT "Question_tier1Id_fkey" FOREIGN KEY ("tier1Id") REFERENCES "pwa"."Tier1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Question" ADD CONSTRAINT "Question_tier2Id_fkey" FOREIGN KEY ("tier2Id") REFERENCES "pwa"."Tier2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."Question" ADD CONSTRAINT "Question_tier3Id_fkey" FOREIGN KEY ("tier3Id") REFERENCES "pwa"."Tier3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."MCQQA" ADD CONSTRAINT "MCQQA_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "pwa"."Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."QuestionTrivia" ADD CONSTRAINT "QuestionTrivia_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "pwa"."Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."QAHistory" ADD CONSTRAINT "QAHistory_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "pwa"."Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."UserQAHistory" ADD CONSTRAINT "UserQAHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "pwa"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."UserQAHistory" ADD CONSTRAINT "UserQAHistory_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "pwa"."StageSetting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."UserQAHistory" ADD CONSTRAINT "UserQAHistory_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "pwa"."GradeSetting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."UserQAHistory" ADD CONSTRAINT "UserQAHistory_tier1Id_fkey" FOREIGN KEY ("tier1Id") REFERENCES "pwa"."Tier1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."UserQAHistory" ADD CONSTRAINT "UserQAHistory_tier2Id_fkey" FOREIGN KEY ("tier2Id") REFERENCES "pwa"."Tier2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."UserQAHistory" ADD CONSTRAINT "UserQAHistory_tier3Id_fkey" FOREIGN KEY ("tier3Id") REFERENCES "pwa"."Tier3"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."UserQAHistory" ADD CONSTRAINT "UserQAHistory_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "pwa"."Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."StageHistory" ADD CONSTRAINT "StageHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "pwa"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."StageHistory" ADD CONSTRAINT "StageHistory_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "pwa"."StageSetting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."StageHistory" ADD CONSTRAINT "StageHistory_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "pwa"."GradeSetting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."StreakHistory" ADD CONSTRAINT "StreakHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "pwa"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."RewardHistory" ADD CONSTRAINT "RewardHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "pwa"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pwa"."RewardHistory" ADD CONSTRAINT "RewardHistory_rewardSettingId_fkey" FOREIGN KEY ("rewardSettingId") REFERENCES "pwa"."RewardSetting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

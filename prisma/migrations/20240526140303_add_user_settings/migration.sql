/*
  Warnings:

  - Added the required column `userSettingsId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "portfolioSiteId" TEXT,
ADD COLUMN     "userSettingsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "publicProfile" BOOLEAN NOT NULL DEFAULT true,
    "publicPortfolio" BOOLEAN NOT NULL DEFAULT true,
    "publicBio" BOOLEAN NOT NULL DEFAULT true,
    "publicEmail" BOOLEAN NOT NULL DEFAULT true,
    "publicGithub" BOOLEAN NOT NULL DEFAULT true,
    "publicLinkdin" BOOLEAN NOT NULL DEFAULT true,
    "publicProjects" BOOLEAN NOT NULL DEFAULT true,
    "publicCourses" BOOLEAN NOT NULL DEFAULT true,
    "emailsSubscriptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailsSubscription" (
    "id" TEXT NOT NULL,
    "courseUpdates" BOOLEAN NOT NULL DEFAULT true,
    "quizUpdates" BOOLEAN NOT NULL DEFAULT true,
    "announcements" BOOLEAN NOT NULL DEFAULT true,
    "SecurityFeatures" BOOLEAN NOT NULL DEFAULT true,
    "ProductUpgrades" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailsSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioSiteIds" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "siteSubUrl" TEXT NOT NULL,

    CONSTRAINT "PortfolioSiteIds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userSettingsId_fkey" FOREIGN KEY ("userSettingsId") REFERENCES "UserSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_emailsSubscriptionId_fkey" FOREIGN KEY ("emailsSubscriptionId") REFERENCES "EmailsSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

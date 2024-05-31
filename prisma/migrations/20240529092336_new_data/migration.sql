/*
  Warnings:

  - You are about to drop the column `activities` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the `travelbuddyrequests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userprofiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itinerary` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travelType` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Activate', 'Deactivate');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('true', 'false');

-- DropForeignKey
ALTER TABLE "travelbuddyrequests" DROP CONSTRAINT "travelbuddyrequests_tripId_fkey";

-- DropForeignKey
ALTER TABLE "travelbuddyrequests" DROP CONSTRAINT "travelbuddyrequests_userId_fkey";

-- DropForeignKey
ALTER TABLE "userprofiles" DROP CONSTRAINT "userprofiles_userId_fkey";

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "activities",
DROP COLUMN "budget",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "itinerary" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "status" "TripStatus" NOT NULL DEFAULT 'true',
ADD COLUMN     "travelType" TEXT NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "age" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User',
ADD COLUMN     "userStatus" "UserStatus" NOT NULL DEFAULT 'Activate';

-- DropTable
DROP TABLE "travelbuddyrequests";

-- DropTable
DROP TABLE "userprofiles";

-- CreateTable
CREATE TABLE "travelBuddys" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travelBuddys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "travelBuddys" ADD CONSTRAINT "travelBuddys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travelBuddys" ADD CONSTRAINT "travelBuddys_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

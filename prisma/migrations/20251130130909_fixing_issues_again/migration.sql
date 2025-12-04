/*
  Warnings:

  - Added the required column `description` to the `TimeTrackingTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeTrackingTicket" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL;

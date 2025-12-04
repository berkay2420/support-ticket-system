-- AlterTable
ALTER TABLE "TimeTrackingTicket" ADD COLUMN     "workedMinutes" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

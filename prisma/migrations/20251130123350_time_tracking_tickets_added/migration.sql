/*
  Warnings:

  - Added the required column `issuerDepartment` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "issuerDepartment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TimeTrackingTicket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeTrackingTicket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeTrackingTicket" ADD CONSTRAINT "TimeTrackingTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

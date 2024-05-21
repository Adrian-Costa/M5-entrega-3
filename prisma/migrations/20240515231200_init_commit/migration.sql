/*
  Warnings:

  - You are about to drop the column `UserId` on the `Car` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_UserId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "UserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

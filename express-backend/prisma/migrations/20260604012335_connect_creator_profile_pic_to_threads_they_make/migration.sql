/*
  Warnings:

  - A unique constraint covering the columns `[photo_profile]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Threads" ADD COLUMN     "creator_photo_profile" TEXT,
ALTER COLUMN "image" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_photo_profile_key" ON "Users"("photo_profile");

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_creator_photo_profile_fkey" FOREIGN KEY ("creator_photo_profile") REFERENCES "Users"("photo_profile") ON DELETE SET NULL ON UPDATE CASCADE;

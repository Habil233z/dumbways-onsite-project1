/*
  Warnings:

  - Added the required column `creator_id` to the `Threads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Threads" ADD COLUMN     "creator_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

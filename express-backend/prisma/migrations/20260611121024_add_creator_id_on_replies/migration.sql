/*
  Warnings:

  - Added the required column `creator_id` to the `Replies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Replies" ADD COLUMN     "creator_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

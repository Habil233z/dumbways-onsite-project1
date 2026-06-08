/*
  Warnings:

  - You are about to drop the column `user_id` on the `Replies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_user_id_fkey";

-- AlterTable
ALTER TABLE "Replies" DROP COLUMN "user_id";

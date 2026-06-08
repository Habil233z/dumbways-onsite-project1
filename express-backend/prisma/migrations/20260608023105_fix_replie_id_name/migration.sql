/*
  Warnings:

  - You are about to drop the column `replies_id` on the `LikesReplies` table. All the data in the column will be lost.
  - Added the required column `replie_id` to the `LikesReplies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LikesReplies" DROP CONSTRAINT "LikesReplies_replies_id_fkey";

-- AlterTable
ALTER TABLE "LikesReplies" DROP COLUMN "replies_id",
ADD COLUMN     "replie_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "LikesReplies" ADD CONSTRAINT "LikesReplies_replie_id_fkey" FOREIGN KEY ("replie_id") REFERENCES "Replies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

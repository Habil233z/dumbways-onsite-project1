-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "Threads" DROP CONSTRAINT "Threads_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Threads" DROP CONSTRAINT "Threads_updated_by_fkey";

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Users"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Users"("username") ON DELETE SET NULL ON UPDATE CASCADE;

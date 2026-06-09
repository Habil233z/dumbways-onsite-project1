-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "Following" DROP CONSTRAINT "Following_following_id_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "LikesReplies" DROP CONSTRAINT "LikesReplies_created_by_fkey";

-- DropForeignKey
ALTER TABLE "LikesReplies" DROP CONSTRAINT "LikesReplies_replie_id_fkey";

-- DropForeignKey
ALTER TABLE "LikesReplies" DROP CONSTRAINT "LikesReplies_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_creator_photo_profile_fkey";

-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "Threads" DROP CONSTRAINT "Threads_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Threads" DROP CONSTRAINT "Threads_creator_photo_profile_fkey";

-- DropForeignKey
ALTER TABLE "Threads" DROP CONSTRAINT "Threads_updated_by_fkey";

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_creator_photo_profile_fkey" FOREIGN KEY ("creator_photo_profile") REFERENCES "Users"("photo_profile") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "Threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "Threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_creator_photo_profile_fkey" FOREIGN KEY ("creator_photo_profile") REFERENCES "Users"("photo_profile") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesReplies" ADD CONSTRAINT "LikesReplies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesReplies" ADD CONSTRAINT "LikesReplies_replie_id_fkey" FOREIGN KEY ("replie_id") REFERENCES "Replies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesReplies" ADD CONSTRAINT "LikesReplies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Replies" ADD COLUMN     "creator_photo_profile" TEXT;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_creator_photo_profile_fkey" FOREIGN KEY ("creator_photo_profile") REFERENCES "Users"("photo_profile") ON DELETE SET NULL ON UPDATE CASCADE;

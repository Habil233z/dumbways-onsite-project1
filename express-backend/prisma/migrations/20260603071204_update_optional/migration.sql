-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "Threads" DROP CONSTRAINT "Threads_updated_by_fkey";

-- AlterTable
ALTER TABLE "Following" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Replies" ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Threads" ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Users"("full_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Users"("full_name") ON DELETE SET NULL ON UPDATE CASCADE;

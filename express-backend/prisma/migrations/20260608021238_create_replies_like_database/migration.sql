-- CreateTable
CREATE TABLE "LikesReplies" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "replies_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "LikesReplies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikesReplies" ADD CONSTRAINT "LikesReplies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesReplies" ADD CONSTRAINT "LikesReplies_replies_id_fkey" FOREIGN KEY ("replies_id") REFERENCES "Replies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesReplies" ADD CONSTRAINT "LikesReplies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

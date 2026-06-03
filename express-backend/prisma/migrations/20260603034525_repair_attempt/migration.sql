/*
  Warnings:

  - Made the column `username` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `full_name` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo_profile` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "full_name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "photo_profile" SET NOT NULL,
ALTER COLUMN "bio" SET NOT NULL;

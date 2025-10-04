/*
  Warnings:

  - You are about to drop the column `githubUrlBackend` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrlFrontend` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "githubUrlBackend",
DROP COLUMN "githubUrlFrontend",
ADD COLUMN     "githubUrl" TEXT;

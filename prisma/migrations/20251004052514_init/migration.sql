/*
  Warnings:

  - You are about to drop the column `githubUrl` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "githubUrl",
ADD COLUMN     "githubUrlBackend" TEXT,
ADD COLUMN     "githubUrlFrontend" TEXT;

-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('FULLSTACK', 'HTMLCSSJS', 'HTMLCSS', 'OTHERS');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "category" "ProjectCategory" NOT NULL DEFAULT 'FULLSTACK';

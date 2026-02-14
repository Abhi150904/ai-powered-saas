-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "Video_userId_createdAt_idx" ON "Video"("userId", "createdAt");

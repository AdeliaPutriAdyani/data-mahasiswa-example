/*
  Warnings:

  - A unique constraint covering the columns `[mahasiswaId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mahasiswaId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Image_mahasiswaId_key" ON "Image"("mahasiswaId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_mahasiswaId_key" ON "Video"("mahasiswaId");

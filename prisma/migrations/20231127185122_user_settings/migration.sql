-- CreateTable
CREATE TABLE "Settings" (
    "temperature" TEXT NOT NULL,
    "wind" TEXT NOT NULL,
    "pressure" TEXT NOT NULL,
    "visibility" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");

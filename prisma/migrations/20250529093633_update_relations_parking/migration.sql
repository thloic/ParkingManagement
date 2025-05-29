/*
  Warnings:

  - You are about to drop the column `color` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `make` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `plate` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `plaque` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plaque" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "entryTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitTime" DATETIME,
    "type" TEXT NOT NULL,
    "parkingId" TEXT,
    CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vehicle_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("id", "userId") SELECT "id", "userId" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE UNIQUE INDEX "Vehicle_plaque_key" ON "Vehicle"("plaque");
CREATE UNIQUE INDEX "Vehicle_parkingId_key" ON "Vehicle"("parkingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

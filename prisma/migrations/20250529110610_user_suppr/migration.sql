/*
  Warnings:

  - You are about to drop the column `plaque` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `plate` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "entryTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitTime" DATETIME,
    "type" TEXT NOT NULL,
    "parkingId" TEXT,
    CONSTRAINT "Vehicle_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "Parking" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vehicle" ("entryTime", "exitTime", "id", "parkingId", "status", "type") SELECT "entryTime", "exitTime", "id", "parkingId", "status", "type" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");
CREATE UNIQUE INDEX "Vehicle_parkingId_key" ON "Vehicle"("parkingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `parkingId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Parking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "totalSpaces" INTEGER NOT NULL,
    "vehicleId" TEXT,
    CONSTRAINT "Parking_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Parking" ("id", "location", "name", "totalSpaces") SELECT "id", "location", "name", "totalSpaces" FROM "Parking";
DROP TABLE "Parking";
ALTER TABLE "new_Parking" RENAME TO "Parking";
CREATE UNIQUE INDEX "Parking_vehicleId_key" ON "Parking"("vehicleId");
CREATE TABLE "new_Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entryDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitDate" DATETIME,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ticket" ("entryDate", "exitDate", "id", "userId") SELECT "entryDate", "exitDate", "id", "userId" FROM "Ticket";
DROP TABLE "Ticket";
ALTER TABLE "new_Ticket" RENAME TO "Ticket";
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "entryTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitTime" DATETIME,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Vehicle" ("entryTime", "exitTime", "id", "plate", "status", "type") SELECT "entryTime", "exitTime", "id", "plate", "status", "type" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

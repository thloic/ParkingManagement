-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entryDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitDate" DATETIME,
    "vehicleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Ticket_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticketId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ratePerHour" REAL NOT NULL,
    "effectiveDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" TEXT NOT NULL,
    CONSTRAINT "Pricing_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_ticketId_key" ON "Transaction"("ticketId");

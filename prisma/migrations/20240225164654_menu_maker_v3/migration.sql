-- CreateTable
CREATE TABLE "MenuItem" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "menuUuid" VARCHAR(255) NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Menu" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_menuUuid_fkey" FOREIGN KEY ("menuUuid") REFERENCES "Menu"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

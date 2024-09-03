/*
  Warnings:

  - You are about to drop the column `ZipCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `dropOfAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderstatus` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `transasctionId` on the `ProductPurchaseTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `userWallet` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dropOffAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `stock` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `amount` on the `ProductPurchaseTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `walletAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_buyerWallet_fkey";

-- DropForeignKey
ALTER TABLE "ProductPurchaseTransaction" DROP CONSTRAINT "ProductPurchaseTransaction_orderedWallet_fkey";

-- DropIndex
DROP INDEX "User_userWallet_idx";

-- DropIndex
DROP INDEX "User_userWallet_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "ZipCode",
DROP COLUMN "dropOfAddress",
DROP COLUMN "orderstatus",
ADD COLUMN     "dropOffAddress" TEXT NOT NULL,
ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PROCESSING',
ADD COLUMN     "zipCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
DROP COLUMN "stock",
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductPurchaseTransaction" DROP COLUMN "transasctionId",
ADD COLUMN     "transactionId" TEXT,
DROP COLUMN "amount",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userWallet",
ADD COLUMN     "walletAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE INDEX "User_walletAddress_idx" ON "User"("walletAddress");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_buyerWallet_fkey" FOREIGN KEY ("buyerWallet") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPurchaseTransaction" ADD CONSTRAINT "ProductPurchaseTransaction_orderedWallet_fkey" FOREIGN KEY ("orderedWallet") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "user_wallet_address" RENAME TO "seller_wallet_index";

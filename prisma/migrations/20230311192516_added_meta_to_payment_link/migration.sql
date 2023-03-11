/*
  Warnings:

  - Added the required column `metadata` to the `payment_links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payment_links` ADD COLUMN `metadata` JSON NOT NULL;

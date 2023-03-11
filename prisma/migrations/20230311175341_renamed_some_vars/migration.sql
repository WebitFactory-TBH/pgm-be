/*
  Warnings:

  - You are about to drop the column `billing_address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `company_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `company_reg_no` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `billing_address`,
    DROP COLUMN `company_name`,
    DROP COLUMN `company_reg_no`,
    DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    ADD COLUMN `billingAddress` VARCHAR(191) NULL,
    ADD COLUMN `companyName` VARCHAR(191) NULL,
    ADD COLUMN `companyRegNo` VARCHAR(191) NULL,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL;

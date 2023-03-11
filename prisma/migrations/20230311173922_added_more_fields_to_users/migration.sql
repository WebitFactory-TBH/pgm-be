-- AlterTable
ALTER TABLE `users` ADD COLUMN `billing_address` VARCHAR(191) NULL,
    ADD COLUMN `company_name` VARCHAR(191) NULL,
    ADD COLUMN `company_reg_no` VARCHAR(191) NULL,
    ADD COLUMN `first_name` VARCHAR(191) NULL,
    ADD COLUMN `last_name` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `link_access` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `paymentLinkId` VARCHAR(191) NOT NULL,
    `meta` JSON NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `link_access` ADD CONSTRAINT `link_access_paymentLinkId_fkey` FOREIGN KEY (`paymentLinkId`) REFERENCES `payment_links`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

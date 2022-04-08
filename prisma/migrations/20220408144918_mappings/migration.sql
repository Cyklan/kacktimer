-- DropForeignKey
ALTER TABLE `poop` DROP FOREIGN KEY `Poop_userId_fkey`;

-- AddForeignKey
ALTER TABLE `poop` ADD CONSTRAINT `poop_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;

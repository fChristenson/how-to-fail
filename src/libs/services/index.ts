import { EmailService } from "./EmailService";
import { UserService } from "./UserService";
import { BatchService } from "./BatchService";

export const emailService = new EmailService();
export const userService = new UserService();
export const batchService = new BatchService(emailService);

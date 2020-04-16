import { EmailService } from "./EmailService";
import { UserService } from "./UserService";
import { BatchService } from "./BatchService";
import { OrderService } from "./OrderService";

export const emailService = new EmailService();
export const userService = new UserService();
export const batchService = new BatchService(emailService);
export const orderService = new OrderService();

import { EmailService, IEmail } from "./EmailService";

export class BatchService {
  private emailService: EmailService;

  constructor(emailService: EmailService) {
    this.emailService = emailService;
  }

  /**
   * Here we don't know if emailService is dealing with the error or not.
   *
   * We don't want to throw an error here because that would stop the batch job.
   * We want to send out all the emails we can and then deal with the ones that failed.
   */
  async sendOrderEmails(emails: IEmail[]) {
    for (const email of emails) {
      try {
        await this.emailService.sendEmail(email);
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

export interface IEmail {
  emailAddress: string;
  subject: string;
  message: string;
}

export class EmailService {
  sendEmail(email: IEmail) {
    return new Promise((resolve, reject) => {
      if (email.emailAddress.length < 1) {
        // Adding error logging instead of throwing for a operations that can fail without
        // causing harm to the system is normal.
        console.error(`Email is not valid: ${email.emailAddress}`);
        return resolve();
      }

      // send email
      resolve();
    });
  }

  sendEmailWithoutLocalHandling(email: IEmail) {
    return new Promise((resolve, reject) => {
      if (email.emailAddress.length < 1) {
        return reject(new Error(`Email is not valid: ${email.emailAddress}`));
      }

      // send email
      resolve();
    });
  }
}

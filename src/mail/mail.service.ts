import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // MUST be false for 587
  auth: {
    user: this.configService.get('EMAIL_USER'),
    pass: this.configService.get('EMAIL_PASS'),
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
});
  }

async sendQuoteEmail(data: any) {
  const mailOptions = {
    from: `"IndiShip Quotes" <${this.configService.get('EMAIL_USER')}>`,
    to: this.configService.get('OWNER_EMAIL'),
    subject: 'New International Courier Quote Request',
    html: `
      <h2>New Quote Request</h2>
      <hr />

      <p><b>Name:</b> ${data.name}</p>
      <p><b>Mobile:</b> ${data.mobile}</p>
      <p><b>Email:</b> ${data.email ?? 'Not provided'}</p>

      <h3>Shipment Details</h3>
      <p><b>Destination Country:</b> ${data.destinationCountry}</p>
      <p><b>Package Type:</b> ${data.packageType}</p>
      <p><b>Weight:</b> ${data.weightKg} kg</p>
      <p><b>Service Speed:</b> ${data.serviceSpeed}</p>

      <h3>Additional Notes</h3>
      <p>${data.notes || '—'}</p>
    `,
  };

  await this.transporter.sendMail(mailOptions);

  return { message: 'Quote email sent successfully' };
}

}

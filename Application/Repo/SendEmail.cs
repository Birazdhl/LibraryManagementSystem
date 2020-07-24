using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text;

namespace Application.Repo
{
    public class SendEmail
    {
        public void SendMailToUser() 
        {
            SmtpClient smtpClient = new SmtpClient("mail.MyWebsiteDomainName.com", 25);

            smtpClient.Credentials = new System.Net.NetworkCredential("bdahal@sevadev.com", "best1nseva");
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = true;
            MailMessage mail = new MailMessage();

            //Setting From , To and CC
            mail.From = new MailAddress("bdahal@sevadev.com", "Biraz Dahal");
            mail.To.Add(new MailAddress("birazdhl@gmail.com"));

            smtpClient.Send(mail);
        } 
    }
}

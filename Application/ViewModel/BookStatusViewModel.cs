using System;
using System.Collections.Generic;
using System.Text;

namespace Application.ViewModel
{
    public class BookStatusViewModel
    {
        public int BookId { get; set; }
        public Guid UserId { get; set; }
        public string requestCancelBook { get; set; }
    }

    public class RequestRejectViewModel
    {
        public int id { get; set; }

        public string bookName { get; set; }
        public string approveOrReject { get; set; }
        public int returnDate { get; set; }
        public string name { get; set; }
        public string emailAddress { get; set; }
    }

    public class SendEmailViewModel
    {
        public string requestorEmail { get; set; }
        public string requestorName { get; set; }
        public string subject { get; set; }
        public string Message { get; set; }

    }
}

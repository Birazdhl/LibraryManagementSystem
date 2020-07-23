using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;

namespace Application.ViewModel
{
    public class BooksViewModel
    {
        public int Id { get; set; }
        public string bookName { get; set; }
        public string Name { get; set; }
        public DateTime? issuedOn { get; set; }
        public DateTime? returnDate { get; set; }
        public bool isAvailable { get; set; }
        public bool isTaken { get; set; }
        public bool isRequested { get; set; }
        public bool isReturned { get; set; }
        public string requestedBy { get; set; }



    }
}

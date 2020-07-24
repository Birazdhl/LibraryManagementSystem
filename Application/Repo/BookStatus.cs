﻿using Application.Errors;
using Application.Result;
using Application.ViewModel;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repo
{
    public class BookStatus : IBookStatus
    {
        private readonly DataContext _dataContext;

        public BookStatus(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<AccountResult> MakeABookRequest(BookStatusViewModel statusViewModel)
        {
            var resultMessage = new AccountResult();

            var book = await _dataContext.Books.FindAsync(statusViewModel.BookId);

            if (book == null)
                throw new RestException(HttpStatusCode.NotFound, new { book = "Book Not Found" });

            if (statusViewModel.requestCancelBook == "request")
            {
                if (book.isAvailable == false)
                    throw new RestException(HttpStatusCode.NotFound, new { book = "Book Not Available" });

                book.isRequested = true;
                book.isAvailable = false;
                book.requestedBy = statusViewModel.UserId;
            }
            else
            {
                book.isRequested = false;
                book.isAvailable = true;
                book.requestedBy = null;
            }

            var success = _dataContext.SaveChanges() > 0;

            if (success)
                return resultMessage;

            throw new Exception("Problem Saving Changes");
        }

        public async Task<AccountResult> ApproveRejectRequest(RequestRejectViewModel reqRejViewModel)
        {
            var resultMessage = new AccountResult();

            var book = await _dataContext.Books.FindAsync(reqRejViewModel.id);

            if (book.isRequested == false)
                throw new RestException(HttpStatusCode.NotFound, new { book = "This Book is Requested Yet" });

            if (reqRejViewModel.approveOrReject == "approve")
            {
                book.issuedOn = DateTime.Now;
                book.returnDate = book.issuedOn.Value.AddDays(reqRejViewModel.returnDate);
                book.issuedBy = book.requestedBy;
                book.isRequested = false;
                book.isReturned = false;
                book.isAvailable = false;
                book.isTaken = true;
                book.issuedBy = null;

                SendEmail newMail = new SendEmail();
                newMail.SendMailToUser();
            }
            else
            {
                book.issuedOn = null;
                book.returnDate = null;
                book.issuedBy = null;
                book.isRequested = false;
                book.isReturned = true;
                book.isAvailable = true;
                book.isTaken = false;
                book.issuedBy = null;
                book.requestedBy = null;
            }

            var success = _dataContext.SaveChanges() > 0;

            if (success)
                return resultMessage;

            throw new Exception("Problem Saving Changes");
        }
    }
}
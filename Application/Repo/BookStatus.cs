﻿using Application.Errors;
using Application.Interface;
using Application.Result;
using Application.ViewModel;
using Domain;
using Microsoft.AspNetCore.Identity;
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
        private readonly IUserAccessor _userAccessor;
        private readonly UserManager<AppUser> _userManager;

        public BookStatus(DataContext dataContext,IUserAccessor userAccessor, UserManager<AppUser> userManager)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
            _userManager = userManager;
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
            
            SendEmail newMail = new SendEmail();

            SendEmailViewModel sendEmail = new SendEmailViewModel()
            {
                requestorEmail = reqRejViewModel.emailAddress,
                requestorName = reqRejViewModel.name
            };

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

                sendEmail.subject = "Book Request Accepted";
                sendEmail.Message = sendEmail.requestorName + " , Your request for the book " + 
                                    reqRejViewModel.bookName + "is Approved" +
                                    "The Submission Deadline for the Book is " + book.returnDate;
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

                sendEmail.subject = "Book Request Rejected";
                sendEmail.Message = sendEmail.requestorName + " , Your request for the book " + reqRejViewModel.bookName + "is Rejected";
            }

            var success = _dataContext.SaveChanges() > 0;

            try
            {
                newMail.SendMail(sendEmail);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }

            if (success)
              return resultMessage;

            throw new Exception("Problem Saving Changes");
        }
    }
}

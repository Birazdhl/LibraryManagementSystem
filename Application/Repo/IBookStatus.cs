using Application.Result;
using Application.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repo
{
    public interface IBookStatus
    {
        Task<AccountResult> MakeABookRequest(BookStatusViewModel statusViewModel);
        Task<AccountResult> ApproveRejectRequest(RequestRejectViewModel reqRejViewModel);

        Task<AccountResult> BookReturnedByUser(int id);
    }
}

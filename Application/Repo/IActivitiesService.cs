using Application.Result;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repo
{
    public interface IActivitiesService
    {
        Task<List<Activity>> GetActivitiesList();
        Task<Activity> GetActivityById(Guid id);
        Task<AccountResult> CreateActivity(Activity activity);
        Task<AccountResult> EditActivity(Activity activity);
        Task<AccountResult> DeleteActivity(Guid id);

    }
}

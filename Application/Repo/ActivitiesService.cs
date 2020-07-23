using Application.Errors;
using Application.Result;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repo
{
    public class ActivitiesService : IActivitiesService
    {
        private readonly DataContext _dataContext;

        public ActivitiesService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }


        public async Task<List<Activity>> GetActivitiesList()
        {
            var result = await _dataContext.Activities.ToListAsync();
            return result;
        }

        public async Task<Activity> GetActivityById(Guid id)
        {
            var acitvity = await _dataContext.Activities.FindAsync(id);

            if (acitvity == null)
                throw new RestException(HttpStatusCode.NotFound, new { activity = "Activity Not Found" });


            return acitvity;
        }

        public async Task<AccountResult> CreateActivity(Activity activity)
        {
            var resultMessage = new AccountResult();
            _dataContext.Activities.Add(activity);
            await _dataContext.SaveChangesAsync();
            //var success =  _dataContext.SaveChanges() > 0;

            //if (success)
            //    return success;

            return resultMessage;

            throw new Exception("Problem Saving Changes");

        }

        public async Task<AccountResult> DeleteActivity(Guid id)
        {

            var resultMessage = new AccountResult();

            var activity = await _dataContext.Activities.FindAsync(id);

            if(activity == null)
                throw new RestException(HttpStatusCode.NotFound, new { activity = "Activity Not Found" });

            _dataContext.Remove(activity);

            var success = _dataContext.SaveChanges() > 0;

            if (success)
                return resultMessage;

            throw new Exception("Problem Saving Changes");
        }

        public async Task<AccountResult> EditActivity(Activity activity)
        {
            var resultMessage = new AccountResult();

            var oldActivity = await _dataContext.Activities.FindAsync(activity.Id);
            if (oldActivity.Id != null)
            {
                oldActivity.Title = activity.Title ?? oldActivity.Title;
                oldActivity.Description = activity.Description ?? oldActivity.Description;
                oldActivity.Category = activity.Category ?? oldActivity.Category;
                oldActivity.Date = activity.Date ;
                oldActivity.City = activity.City ?? oldActivity.City;
                oldActivity.Venue = activity.Venue ?? oldActivity.Venue;
            }

            var success = _dataContext.SaveChanges() > 0;

            if (success)
                return resultMessage;

            throw new Exception("Problem Saving Changes");


        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Repo;
using Application.Repo;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IActivitiesService _activitiesService;

        public ActivitiesController(IActivitiesService activitiesService)
        {
            _activitiesService = activitiesService;

        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivityList()
        {
            var result = await _activitiesService.GetActivitiesList();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Activity>>> GetActivity(Guid id)
        {
            var result = await _activitiesService.GetActivityById(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> CreateActivity(Activity activity)
        {
            var result = await _activitiesService.CreateActivity(activity);
            return Ok(activity.Category);
        }

        [HttpPost]
        public async Task<ActionResult> EditActivity(Activity activity)
        {
            var result = await _activitiesService.EditActivity(activity);
            return Ok(activity.Id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> DeleteAtivity(Guid id)
        {
            await _activitiesService.DeleteActivity(id);
            return Ok();
        }
    }
}
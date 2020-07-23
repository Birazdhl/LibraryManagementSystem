using FluentValidation;
using System;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }

    //public class ActivityValidator : AbstractValidator<Activity>
    //{
    //    public ActivityValidator()
    //    {
    //        RuleFor(x => x.Title).NotEmpty();
    //        RuleFor(x => x.Description).NotEmpty();
    //        RuleFor(x => x.Category).NotEmpty();
    //        RuleFor(x => x.Date).NotEmpty();
    //        RuleFor(x => x.City).NotEmpty();
    //        RuleFor(x => x.Venue).NotEmpty();
    //    }
    //}
}

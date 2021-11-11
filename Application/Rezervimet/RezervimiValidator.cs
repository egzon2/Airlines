using Domain;
using FluentValidation;

namespace Application.Rezervimet
{
    public class RezervimiValidator : AbstractValidator<Rezervimi>
    {
        public RezervimiValidator()
        {
            RuleFor(x => x.Vendi_Nisjes).NotEmpty();
            RuleFor(x => x.Vendi_Mberritjes).NotEmpty();
            RuleFor(x => x.Departure).NotEmpty();
            RuleFor(x => x.Return).NotEmpty();
        }
    }
}
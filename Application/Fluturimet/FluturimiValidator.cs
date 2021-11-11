using Domain;
using FluentValidation;

namespace Application.Fluturimet
{
    public class FluturimiValidator : AbstractValidator<Fluturimi>
    {
        public FluturimiValidator()
        {
            RuleFor(x => x.VendiNisjes).NotEmpty();
            RuleFor(x => x.VendiMberritjes).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
        }
    }
}
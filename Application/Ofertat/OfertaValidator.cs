using Domain;
using FluentValidation;

namespace Application.Ofertat
{
    public class OfertaValidator : AbstractValidator<Oferta>
    {
        public OfertaValidator()
        {
            //  RuleFor(x => x.Flightclass).NotEmpty();
            // RuleFor(x => x.VendiMberritjes).NotEmpty();
            // RuleFor(x => x.Date).NotEmpty();
        }
    }
}
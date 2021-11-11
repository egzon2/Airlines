using Domain;
using FluentValidation;

namespace Application.Kerkesat
{
    public class KerkesaValidator : AbstractValidator<Kerkesa>
    {
        public KerkesaValidator()
        {
            // RuleFor(x => x.VendiNisjes).NotEmpty();
            
        }
    }
}
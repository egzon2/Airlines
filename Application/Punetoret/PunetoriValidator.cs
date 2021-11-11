using Domain;
using FluentValidation;

namespace Application.Punetoret
{
    public class PunetoriValidator : AbstractValidator<Punetori>
    {
        public PunetoriValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.Mbiemri).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            // RuleFor(x => x.AeroplanId).NotEmpty();
        }
    }
}
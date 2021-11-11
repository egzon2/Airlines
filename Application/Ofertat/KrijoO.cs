using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistency;

namespace Application.Ofertat
{
    public class KrijoO
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Oferta Oferta { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Oferta).SetValidator(new OfertaValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context) //mi handle changes
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Ofertat.Add(request.Oferta);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Shtimi i ofertes deshtoi");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
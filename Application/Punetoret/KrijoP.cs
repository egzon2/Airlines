using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistency;

namespace Application.Punetoret
{
    public class KrijoP
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Punetori Punetori { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Punetori).SetValidator(new PunetoriValidator());
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
                _context.Punetoret.Add(request.Punetori);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Shtimi i punetorit deshtoi");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistency;

namespace Application.Udhetaret
{
    public class KrijoU
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Udhetari Udhetari { get; set; }
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
                _context.Udhetaret.Add(request.Udhetari);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Shtimi i udhetarit deshtoi");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
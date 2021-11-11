using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistency;

namespace Application.Kerkesat
{
    public class Fshij
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var kerkesa = await _context.Kerkesat.FindAsync(request.Id); //guid id

                if(kerkesa == null) return null;
            
                _context.Remove(kerkesa);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failded to delete kerkesa");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
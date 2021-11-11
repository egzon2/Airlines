using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistency;

namespace Application.Fluturimet
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
                var fluturimi = await _context.Fluturimet.FindAsync(request.Id); //guid id

                if(fluturimi == null) return null;
            
                _context.Remove(fluturimi);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failded to delete fluturimi");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
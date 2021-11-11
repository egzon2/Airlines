using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistency;

namespace Application.Punetoret
{
    public class Detajet
    {
        public class Query : IRequest<Result<Punetori>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Punetori>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Punetori>> Handle(Query request, CancellationToken cancellationToken)
            {
                var punetori = await _context.Punetoret.FindAsync(request.Id);
                
                return Result<Punetori>.Success(punetori);
            }
        }
    }
}
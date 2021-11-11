using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistency;

namespace Application.Fluturimet
{
    public class Detajet
    {
        public class Query : IRequest<Result<Fluturimi>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Fluturimi>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Fluturimi>> Handle(Query request, CancellationToken cancellationToken)
            {
                var fluturimi = await _context.Fluturimet.FindAsync(request.Id);
                
                return Result<Fluturimi>.Success(fluturimi);
            }
        }
    }
}
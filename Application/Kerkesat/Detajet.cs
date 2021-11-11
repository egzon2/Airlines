using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistency;

namespace Application.Kerkesat
{
    public class Detajet
    {
        public class Query : IRequest<Result<Kerkesa>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Kerkesa>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Kerkesa>> Handle(Query request, CancellationToken cancellationToken)
            {
                var kerkesa = await _context.Kerkesat.FindAsync(request.Id);
                
                return Result<Kerkesa>.Success(kerkesa);
            }
        }
    }
}
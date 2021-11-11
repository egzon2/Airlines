using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistency;

namespace Application.Ofertat
{
    public class Detajet
    {
        public class Query : IRequest<Result<Oferta>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Oferta>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Oferta>> Handle(Query request, CancellationToken cancellationToken)
            {
                var oferta = await _context.Ofertat.FindAsync(request.Id);
                
                return Result<Oferta>.Success(oferta);
            }
        }
    }
}
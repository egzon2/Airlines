using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistency;

namespace Application.Rezervimet
{
    public class Detajet
    {
        public class Query : IRequest<Result<Rezervimi>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Rezervimi>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Rezervimi>> Handle(Query request, CancellationToken cancellationToken)
            {
                var rezervimi = await _context.Rezervimet.FindAsync(request.Id);
                
                return Result<Rezervimi>.Success(rezervimi);
            }
        }
    }
}
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistency;

namespace Application.Udhetaret
{
    public class Detajet
    {
        public class Query : IRequest<Result<Udhetari>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Udhetari>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Udhetari>> Handle(Query request, CancellationToken cancellationToken)
            {
                var udhetari = await _context.Udhetaret.FindAsync(request.Id);
                
                return Result<Udhetari>.Success(udhetari);
            }
        }
    }
}
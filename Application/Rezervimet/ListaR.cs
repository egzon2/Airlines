using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistency;

namespace Application.Rezervimet
{
    public class ListaR
    {
        public class Query : IRequest<Result<List<Rezervimi>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Rezervimi>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<ListaR> _logger;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Rezervimi>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Rezervimi>>.Success(await _context.Rezervimet.ToListAsync(cancellationToken));
            }
        }
    }
}
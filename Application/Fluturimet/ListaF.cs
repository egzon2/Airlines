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

namespace Application.Fluturimet
{
    public class ListaF
    {
        public class Query : IRequest<Result<List<Fluturimi>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Fluturimi>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<ListaF> _logger;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Fluturimi>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Fluturimi>>.Success(await _context.Fluturimet.ToListAsync(cancellationToken));
            }
        }
    }
}
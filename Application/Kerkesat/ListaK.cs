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

namespace Application.Kerkesat
{
    public class ListaK
    {
        public class Query : IRequest<Result<List<Kerkesa>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Kerkesa>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<ListaK> _logger;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Kerkesa>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Kerkesa>>.Success(await _context.Kerkesat.ToListAsync(cancellationToken));
            }
        }
    }
}
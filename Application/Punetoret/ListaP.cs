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

namespace Application.Punetoret
{
    public class ListaP
    {
        public class Query : IRequest<Result<List<Punetori>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Punetori>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<ListaP> _logger;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Punetori>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Punetori>>.Success(await _context.Punetoret.ToListAsync(cancellationToken));
            }
        }
    }
}
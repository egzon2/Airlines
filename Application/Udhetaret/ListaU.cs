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

namespace Application.Udhetaret
{
    public class ListaU
    {
        public class Query : IRequest<Result<List<Udhetari>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Udhetari>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<ListaU> _logger;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Udhetari>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Udhetari>>.Success(await _context.Udhetaret.ToListAsync(cancellationToken));
            }
        }
    }
}
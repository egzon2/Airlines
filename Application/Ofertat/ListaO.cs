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

namespace Application.Ofertat
{
    public class ListaO
    {
        public class Query : IRequest<Result<List<Oferta>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Oferta>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<ListaO> _logger;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Oferta>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Oferta>>.Success(await _context.Ofertat.ToListAsync(cancellationToken));
            }
        }
    }
}
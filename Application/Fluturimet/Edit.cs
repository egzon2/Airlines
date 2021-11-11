using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistency;

namespace Application.Fluturimet
{
    public class Edit
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }
            public string VendiNisjes { get; set; }
            public string VendiMberritjes { get; set; }
            public DateTime? Date { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var fluturimi = await _context.Fluturimet.FindAsync(request.Id);

                if (fluturimi == null) throw new Exception("Modifikimi deshtoi");

                fluturimi.VendiNisjes = request.VendiNisjes ?? fluturimi.VendiNisjes;
                fluturimi.VendiMberritjes = request.VendiMberritjes ?? fluturimi.VendiMberritjes;
                fluturimi.Date = request.Date ?? fluturimi.Date;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new System.Exception("Error");
            }
        }
    }
}
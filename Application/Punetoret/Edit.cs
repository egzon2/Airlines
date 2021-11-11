using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistency;

namespace Application.Punetoret
{
    public class Edit
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }
            public string Emri { get; set; }
            public string Mbiemri { get; set; }
            public DateTime? Date { get; set; }
            public string AeroplanId { get; set; }

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
                var punetori = await _context.Punetoret.FindAsync(request.Id);

                if (punetori == null) throw new Exception("Modifikimi deshtoi");

                punetori.Emri = request.Emri ?? punetori.Emri;
                punetori.Mbiemri = request.Mbiemri ?? punetori.Mbiemri;
                punetori.Date = request.Date ?? punetori.Date;
                punetori.AeroplanId = request.AeroplanId ?? punetori.AeroplanId;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new System.Exception("Error");
            }
        }
    }
}
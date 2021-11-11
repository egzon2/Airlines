using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistency;

namespace Application.Rezervimet
{
    public class Edit
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }
            public string UdhetariId { get; set; }
            public Udhetari Udhetari { get; set; }
            public string Vendi_Nisjes { get; set; }
            public string Vendi_Mberritjes { get; set; }
            public DateTime? Departure { get; set; }
            public DateTime? Return { get; set; }
            public string CardNumber { get; set; }
            public string SecurityCode { get; set; }
            public string ZipCode { get; set; }

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
                var rezervimi = await _context.Rezervimet.FindAsync(request.Id);

                if (rezervimi == null) throw new Exception("Modifikimi deshtoi");

                rezervimi.UdhetariId = request.UdhetariId ?? rezervimi.UdhetariId;
                rezervimi.Vendi_Nisjes = request.Vendi_Nisjes ?? rezervimi.Vendi_Nisjes;
                rezervimi.Vendi_Mberritjes = request.Vendi_Mberritjes ?? rezervimi.Vendi_Mberritjes;
                rezervimi.Departure = request.Departure ?? rezervimi.Departure;
                rezervimi.Return = request.Return ?? rezervimi.Return;
                rezervimi.CardNumber = request.CardNumber ?? rezervimi.CardNumber;
                rezervimi.SecurityCode = request.SecurityCode ?? rezervimi.SecurityCode;
                rezervimi.ZipCode = request.ZipCode ?? rezervimi.ZipCode;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new System.Exception("Error");
            }
        }
    }
}
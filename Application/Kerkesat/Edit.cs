using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistency;

namespace Application.Kerkesat
{
    public class Edit
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }
            public string UdhetariId { get; set; }
            public string Titulli { get; set; }
            public string Description { get; set; }
            public string Vendi_Nisjes { get; set; }
            public string Destinacioni { get; set; }
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
                var kerkesa = await _context.Kerkesat.FindAsync(request.Id);

                if (kerkesa == null) throw new Exception("Modifikimi deshtoi");

                kerkesa.UdhetariId = request.UdhetariId ?? kerkesa.UdhetariId;
                kerkesa.Titulli = request.Titulli ?? kerkesa.Titulli;
                kerkesa.Description = request.Description ?? kerkesa.Description;
                kerkesa.Vendi_Nisjes = request.Vendi_Nisjes ?? kerkesa.Vendi_Nisjes;
                kerkesa.Destinacioni = request.Destinacioni ?? kerkesa.Destinacioni;
                kerkesa.Date = request.Date ?? kerkesa.Date;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new System.Exception("Error");
            }
        }
    }
}
using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistency;

namespace Application.Ofertat
{
    public class Edit
    {
    public class Command : IRequest
        {

           public Guid Id {get; set;}
        public string GoingTo { get; set; }
        public DateTime? CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
        public string Flightclass {get;set;}
        public string Cmimi { get; set; }
        public string Persons { get; set; }

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
                var oferta=await _context.Ofertat.FindAsync(request.Id);

                if(oferta==null) throw new Exception("Modifikimi deshtoi");

                oferta.GoingTo=request.GoingTo ?? oferta.GoingTo;
                oferta.CheckIn=request.CheckIn ?? oferta.CheckIn;
                oferta.CheckOut=request.CheckOut ?? oferta.CheckOut;
                oferta.Flightclass=request.Flightclass ?? oferta.Flightclass;
                oferta.Cmimi=request.Cmimi ?? oferta.Cmimi;
                oferta.Persons=request.Persons ?? oferta.Persons;

                var success = await _context.SaveChangesAsync()>0;

                if(success) return Unit.Value;
                throw new System.Exception("Error");
            }
        }
    }
}
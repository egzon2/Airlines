using System;

namespace Domain
{
    public class Oferta
    {
        public Guid Id {get; set;}
        public string GoingTo { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public string Flightclass {get;set;}
        public string Cmimi { get; set; }
        public string Persons { get; set; }
    }
}
using System;

namespace Domain
{
    public class Rezervimi
    {
        public Guid Id {get; set;}
        public string UdhetariId {get;set;}
        public Udhetari Udhetari {get;set;}
        public string Vendi_Nisjes { get; set; }
        public string Vendi_Mberritjes { get; set; }
        public DateTime Departure { get; set; }
        public DateTime Return { get; set; }
        public string CardNumber { get; set; }
        public string SecurityCode { get; set; }
        public string ZipCode { get; set; }
    }
}
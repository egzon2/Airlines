using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistency
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Punetori> Punetoret { get; set; }
        public DbSet<Fluturimi> Fluturimet { get; set; }
        public DbSet<Udhetari> Udhetaret { get; set; }
        public DbSet<Rezervimi> Rezervimet { get; set; }
        public DbSet<Oferta> Ofertat { get; set; }
        public DbSet<Kerkesa> Kerkesat { get; set; }



        

    }
}
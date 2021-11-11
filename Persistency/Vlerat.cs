using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistency
{
   public class Vlerat
   {
       public static async Task SeedData(DataContext context, UserManager<AppUser> userManager) //datacontext si parameter
       {
           if (!userManager.Users.Any())
           {
               var users = new List<AppUser>
               {
                   new AppUser{DisplayName = "Bob", UserName= "bob", Email = "bob@test.com"},
                   new AppUser{DisplayName = "Tom", UserName= "tom", Email = "egzoni@test.com"},
               };
               
               foreach (var user in users)
               {
                   await userManager.CreateAsync(user, "Pa$$w0rd");
               }
           }

            if (context.Punetoret.Any()) return;
            
           var punetoret = new List<Punetori>
           {
               new Punetori
               {
                    Emri = "Egzon",
                    Mbiemri = "Xoni",
                    Date = DateTime.Now.AddMonths(-2),
                    AeroplanId = "Xoni123"
               },
                                               
           };

           await context.SaveChangesAsync();

           if (context.Punetoret.Any()) return;
            
           var ofertat = new List<Oferta>
           {
               new Oferta
               {
                    GoingTo = "Australia: InternationalAirport",
                    CheckIn =DateTime.Now.AddMonths(-2),
                    CheckOut = DateTime.Now.AddMonths(-2),
                    Flightclass="2 stars",
                    Cmimi = "600",
                    Persons = "2"
               },
               new Oferta
               {
                    GoingTo = "Kosovo: Prishtina",
                    CheckIn =DateTime.Now.AddMonths(-2),
                    CheckOut = DateTime.Now.AddMonths(-2),
                    Flightclass="3 stars",
                    Cmimi = "300",
                    Persons = "1"
               },
                                               
           };

           await context.SaveChangesAsync();

           
       }
       public static async Task SeedDataUdhetaret(DataContext context, UserManager<Udhetari> userManager)
        {
            if (!userManager.Users.Any())
            {
                var udhetaret = new List<Udhetari>
                {
                    new Udhetari{DisplayName = "EgzonThaqi", Emri = "Egzon", Mbiemri = "Thaqi", Birthday = new DateTime(1999, 04, 25), UserName= "egzonthaqi", Email= "egzon@airline.net"},
                };

                foreach (var udhetari in udhetaret)
                {
                    await userManager.CreateAsync(udhetari, "Pa$$w0rd");
                }
            }

        }
       
   }
}
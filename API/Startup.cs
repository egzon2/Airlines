using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistency;
using MediatR;
using Application.Punetoret;
using Application.Core;
using AutoMapper;
using FluentValidation.AspNetCore;
using API.Middleware;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Fluturimet;
using Application.Udhetaret;
using Application.Ofertat;
using Application.Kerkesat;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }
        public IConfiguration Configuration { get;}

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //   services.AddDbContext<DataContext>(opt =>
            //   {
            //     opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            //     });
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
                });
            });
            services.AddMediatR(typeof(ListaP.Handler).Assembly);
            services.AddMediatR(typeof(ListaF.Handler).Assembly);
            services.AddMediatR(typeof(ListaU.Handler).Assembly);
            services.AddMediatR(typeof(ListaO.Handler).Assembly);
            services.AddMediatR(typeof(ListaK.Handler).Assembly);
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<KrijoP>();
                config.RegisterValidatorsFromAssemblyContaining<KrijoF>();
                config.RegisterValidatorsFromAssemblyContaining<KrijoU>();
                config.RegisterValidatorsFromAssemblyContaining<KrijoO>();
                config.RegisterValidatorsFromAssemblyContaining<KrijoK>();
            });
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);

            services.AddMvc().AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<KrijoP>());
            services.AddMvc().AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<KrijoF>());
            services.AddMvc().AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<KrijoU>());
            services.AddMvc().AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<KrijoO>());
            services.AddMvc().AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<KrijoK>());
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

  
            // services.AddSwaggerGen();
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
    //             app.UseSwaggerUI(c =>
    // {
    //     c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    // });

             if (env.IsDevelopment())
             {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
             }

          //  app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();
           
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
        
    }
}

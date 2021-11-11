using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Udhetaret;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class UdhetariController : BaseApiController
    {
         private readonly IMediator _mediator;
        public UdhetariController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetUdhetaret()
        {
            return HandleResult(await Mediator.Send(new ListaU.Query()));
        }
    
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUdhetari(string id)
        {
            return HandleResult(await Mediator.Send(new Detajet.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateUdhetarin(Udhetari udhetari)
        {
            return Ok(await Mediator.Send(new KrijoU.Command{Udhetari = udhetari}));
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditUdhetarin(string id, Udhetari udhetari)
        {
            // Udhetari actualUdhetari = await Mediator.Send(new Detajet.Query{Id= id}); 

            udhetari.Id = id;
            udhetari.PasswordHash = udhetari.PasswordHash;
            udhetari.NormalizedEmail = udhetari.NormalizedEmail;
            udhetari.NormalizedUserName = udhetari.NormalizedUserName;
            return Ok(await Mediator.Send(new Edit.Command{Udhetari = udhetari}));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUdhetarin(string id)
        {
            return Ok(await Mediator.Send(new Fshij.Command{Id = id}));
        }
    }
}
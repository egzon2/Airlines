using System;
using System.Threading.Tasks;
using Application.Ofertat;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class OfertatController : BaseApiController
    {
        private readonly IMediator _mediator;
        public OfertatController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetOfertat()
        {
            return HandleResult(await Mediator.Send(new ListaO.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOferta(Guid id)
        {
            return HandleResult(await Mediator.Send(new Detajet.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> KrijoOferta(Oferta oferta) //kur e dergojme nje objekt brenda body request, i tregon qe me kqyr brenda body request pe rme mar at objekt edhe kqyr me i pershtat parametrat a jon tnjejta nbody
        {
            return HandleResult(await Mediator.Send(new KrijoO.Command { Oferta = oferta }));
        }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> ModifikoOferta(Guid id, Oferta oferta)
        // {
        //     oferta.Id = id;
        //     return Ok(await Mediator.Send(new Edit.Command{Oferta = oferta}));
        // }

        [HttpPut("{Id}")]

        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> FshijOferta(Guid id)
        {
            return HandleResult(await Mediator.Send(new Fshij.Command { Id = id }));
        }
    }
}
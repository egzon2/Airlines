using System;
using System.Threading.Tasks;
using Application.Kerkesat;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class KerkesatController : BaseApiController
    {
        private readonly IMediator _mediator;
        public KerkesatController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetKerkesat()
        {
            return HandleResult(await Mediator.Send(new ListaK.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetKerkesa(Guid id)
        {
            return HandleResult(await Mediator.Send(new Detajet.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> KrijoKerkesa(Kerkesa kerkesa) //kur e dergojme nje objekt brenda body request, i tregon qe me kqyr brenda body request pe rme mar at objekt edhe kqyr me i pershtat parametrat a jon tnjejta nbody
        {
            return HandleResult(await Mediator.Send(new KrijoK.Command { Kerkesa = kerkesa }));
        }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> ModifikoKerkesa(Guid id, Kerkesa kerkesa)
        // {
        //     kerkesa.Id = id;
        //     return Ok(await Mediator.Send(new Edit.Command{Kerkesa = kerkesa}));
        // }

        [HttpPut("{Id}")]

        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> FshijKerkesa(Guid id)
        {
            return HandleResult(await Mediator.Send(new Fshij.Command { Id = id }));
        }
    }
}
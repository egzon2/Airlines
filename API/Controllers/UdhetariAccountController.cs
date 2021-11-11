using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class UdhetariAccountController : ControllerBase
    {
        private readonly UserManager<Udhetari> _userManager;
        private readonly SignInManager<Udhetari> _signInManager;
        private readonly TokenService _tokenService;
        public UdhetariAccountController(UserManager<Udhetari> userManager,
        SignInManager<Udhetari> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("loginUdhetari")]
        public async Task<ActionResult<UdhetariDto>> Login(LoginDto loginDto)
        {
            var udhetari = await _userManager.FindByEmailAsync(loginDto.Email);
            if (udhetari == null) return Unauthorized();
            var result = await _signInManager.CheckPasswordSignInAsync(udhetari, loginDto.Password, false);
            
            if (result.Succeeded)
            {
              return CreateUdhetariObject(udhetari);
            }
            return Unauthorized();
        }

        [HttpPost("registerUdhetari")]
        public async Task<ActionResult<UdhetariDto>> Register(RegisterUdhetariDto registerDto)
        {
            if(await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email exists");
            }
             if(await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("Username exists");
            }

            var udhetari = new Udhetari
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
                Birthday = registerDto.Birthday,
                Emri = registerDto.Emri,
                Mbiemri = registerDto.Mbiemri,

            };
            var result = await _userManager.CreateAsync(udhetari, registerDto.Password);
            if(result.Succeeded) 
            {
                return CreateUdhetariObject(udhetari);
            }
            return BadRequest("Problems during signing up!");
        }

        [Authorize]
        [HttpGet("currentUdhetari")]
        public async Task<ActionResult<UdhetariDto>> GetCurrentUdhetari()
        {
            var udhetari = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUdhetariObject(udhetari);
        }
    
        private UdhetariDto CreateUdhetariObject(Udhetari udhetari)
        {
              return new UdhetariDto
                {
                    Id= udhetari.Id,
                    DisplayName = udhetari.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateTokenUdhetari(udhetari),
                    Username = udhetari.UserName,
                    Emri = udhetari.Emri,
                    email = udhetari.Email,
                    Mbiemri = udhetari.Mbiemri,
                    Birthday = udhetari.Birthday,
                };

        }
    }
}
using AdminUI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AdminUI.Models;

namespace AdminUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly OrganizationDBContext _context;
        private readonly UserManager<Users> _userManager;
        private readonly SignInManager<Users> _signInManager;
        public AuthorizationController(UserManager<Users> userManager,
            SignInManager<Users> signInManager, OrganizationDBContext context)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [Route("login")]
        [HttpGet]
        public ActionResult Login(string User, string password)
        {
            var login = _signInManager.PasswordSignInAsync(User, password, true, lockoutOnFailure: true).Result;
            if (login.Succeeded)
            {
                ActivityLogger logger = new ActivityLogger();
                logger.addUserActivity(User, "Login", "", "", _context);
                return Ok(login);
            }
            else
            {
                return Ok(login);
            }
        }
        [Route("logout")]
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            ActivityLogger logOut = new ActivityLogger();
            logOut.addUserActivity(User.Identity.Name, "Logout", "", "", _context);
            await _signInManager.SignOutAsync();
            return Ok("Ok");
        }
    }
}
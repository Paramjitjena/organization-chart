using AdminUI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TokenAuthenticationInWebAPI.Models
{
    public class MyAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public  async static Task<bool> ValidateClientAuth(OAuthGrantResourceOwnerCredentialsContext context)
        {
            //using (OrganizationDBContext _repo = new OrganizationDBContext())
            //{
            //    //var list = _repo.Users.FindAsync();
            //    //var login = HttpContext.User.Identity.IsAuthenticated;
            //    var list = .Headers["Authorization"]
            //}

            return true ;
        }
        //public async Task<> GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        //{
        //    using (OrganizationDBContext _repo = new OrganizationDBContext())
        //    {
        //        //var user = _repo.ValidateUser(context.UserName, context.Password);
        //        //if (user == null)
        //        //{
        //        //    context.SetError("invalid_grant", "Provided username and password is incorrect");
        //        //    return;
        //        //}
        //        var identity = new ClaimsIdentity(context.Options.AuthenticationType);
        //        identity.AddClaim(new Claim(ClaimTypes.Role, "test"));
        //        identity.AddClaim(new Claim(ClaimTypes.Name, "test"));
        //        identity.AddClaim(new Claim("Email", "test"));
        //        context.Validated(identity);
        //    }
        //}
    }
}
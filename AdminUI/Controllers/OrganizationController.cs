using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdminUI.CustomModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using AdminUI.Models;

namespace AdminUI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrganizationController : ControllerBase
    {

        private readonly OrganizationDBContext _context;
        public OrganizationController(OrganizationDBContext context)
        {
            _context = context;
        }

       
        [HttpGet]
        [Route("getOrgUsers")]
        public List<Organization> GetOrgUsers()
        {
            var org = _context.Users.Include(x => x.Group).Where(x => x.ParentId != null || _context.Users.Any(y => y.ParentId == x.UserId)).Select(x => new Organization
            {
                Id = x.UserId,
                Pid = x.ParentId,
                Name = x.Name,
                Title = x.Designation,
                Img = x.Image,
                Date = x.Date
            }).ToList();

            return org;
        }

        [HttpGet]
        [Route("getOtherData")]
        public List<Organization> GetOtherData()
        {
            var org = _context.Users.Include(x => x.Group).Where(x => x.ParentId == null && !_context.Users.Any(y => y.ParentId == x.UserId)).Select(x => new Organization
            {
                Id = x.UserId,
                Pid = x.ParentId,
                Name = x.Name,
                Title = x.Group.Name,
                Img = x.Image,
                Date = x.Date
            }).ToList();

            return org;
        }

        [HttpPost]
        [Route("addToOrganization")]
        public string AddToOrganization(Users user)
        {
            try
            {
                var userDetails = _context.Users.Find(user.UserId);
                userDetails.ParentId = user.ParentId;
                userDetails.Designation = user.Designation;
                _context.SaveChanges();
                return "Success";
            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
        }
    }
}

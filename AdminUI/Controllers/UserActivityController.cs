using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AdminUI.Models;

namespace AdminUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserActivityController : ControllerBase
    {
        private readonly OrganizationDBContext _context;
        public UserActivityController(OrganizationDBContext context)
        {
            _context = context;
        }

        [Route("GetUserActivity")]
        [HttpGet]
        public ActionResult GetUserActivity()
        {
            var acyivityList = _context.ActivityLog.ToList();
            return Ok(acyivityList);
        }
    }
}
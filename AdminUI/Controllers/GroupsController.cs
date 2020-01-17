using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AdminUI.Models;

namespace AdminUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly OrganizationDBContext _context;
        public GroupsController(OrganizationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getGroups")]
        public IActionResult GetGroups()
        {
            var goups = _context.Groups.Select(x => new
            {
                id = x.GroupId,
                name = x.Name,
                isActive = x.IsActive,
                img = x.Image
            }).ToList();
            return Ok(goups);
        }

        [HttpPost]
        [Route("addGroup")]
        public string AddGroup(Groups group)
        {
            try
            {
                if (_context.Groups.Any(x => x.Name == group.Name))
                {
                    return "Error: There is already Group existing with the name entered!";
                }
                else
                {
                    _context.Groups.Add(new Groups { Name = group.Name, IsActive = group.IsActive, Image = group.Image, Date = DateTime.Now });
                    _context.SaveChanges();
                    return "Success";
                }

            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
        }

        [HttpPost]
        [Route("updateGroup")]
        public string UpdateGroup(Groups Group)
        {
            try
            {
                if (_context.Groups.Any(x => x.GroupId == Group.GroupId))
                {
                    var GroupDetails = _context.Groups.Find(Group.GroupId);
                    if (_context.Groups.Any(x => x.Name == Group.Name && x.GroupId != Group.GroupId))
                    {
                        return "Error: Another Group already exists with the name entered!";
                    }
                    else
                    {
                        GroupDetails.Name = Group.Name;
                        GroupDetails.IsActive = Group.IsActive;
                        GroupDetails.Image = Group.Image;
                        _context.SaveChanges();
                        return "Success";
                    }
                }
                else
                {
                    return "Error: Group not found!";
                }
            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
        }

        [HttpPost]
        [Route("deleteGroup")]
        public string DeleteGroup(Groups Group)
        {
            try
            {
                if (_context.Groups.Any(x => x.GroupId == Group.GroupId))
                {
                    var GroupDetails = _context.Groups.Find(Group.GroupId);
                    if (_context.Users.Any(x => x.GroupId == Group.GroupId))
                    {
                        return "Error: The Group is having some users assigned to it!";
                    }
                    else
                    {
                        _context.Groups.Remove(GroupDetails);
                        _context.SaveChanges();
                        return "Success";
                    }
                }
                else
                {
                    return "Error: Group not found!";
                }
            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AdminUI.Models;
using System.Web.Helpers;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;

namespace AdminUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly OrganizationDBContext _context;
        public UsersController(OrganizationDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("getOrgs")]
        public IActionResult GetOrgs()
        {
            var a = (
            from user in _context.Users
            join
            abc in _context.EntityKeyValues
            on user.UserId equals abc.UserId
            select new
            {
                id = abc.Id,
                pid = 1,
                name = user.Name,
                title = user.Designation,
                img = user.Image,
                Color = user.Color,
                email = user.Email,
                phone = user.PhoneNumber,
                //user.UserId
            }

            ).ToList();
            return Ok(JsonConvert.SerializeObject(a));
        }
        [HttpGet]
        [Route("getUsers")]
        public IActionResult GetUsers()
        {
            var Users = _context.Users.Select(x => new
            {

                //{ "Id":1,"JobTitle":"President","Color":"","EntityState":2,"EntityKey":{ "EntitySetName":"OrgChartShapes","EntityContainerName":"SampleEntities","EntityKeyValues":[{"Key":"Id","Value":1}],"IsTemporary":false}}
                Id = x.UserId,
                JobTitle = x.Designation,
                Color = x.Color,
                //Name = x.Name,
                //Email = x.Email,
                // Phone = x.PhoneNumber,
                Image = x.Image,
                EntityState = x.EntityState,
                EntityKey = new
                {
                    EntitySetName = x.EntitySetName,
                    EntityContainerName = x.EntityContainerName,
                    EntityKeyValues = x.EntityKeyValues.Select(y => new { key = "Id", value = y.Value, }).ToList(),
                    IsTemporary = x.IsTemporary
                }

            }).ToList();
            return Ok(JsonConvert.SerializeObject(Users));
        }

        [HttpGet]
        [Route("getConnections")]
        public IActionResult GetConnections()
        {
            var Connections = _context.Connections.Select(x => new
            {
                Id = x.FromShapeId,
                FromShapeId = x.FromShapeId,
                ToShapeId = x.ToShapeId,
                Text = x.Text,
                FromPointX = x.FromPointX,
                FromPointY = x.FromPointY,
                ToPointX = x.ToPointX,
                ToPointY = x.ToPointY,
                EntityState = x.EntityState,
                EntityKey = new
                {
                    EntitySetName = x.EntitySetName,
                    EntityContainerName = x.EntityContainerName,
                    EntityKeyValues = x.FromShape.EntityKeyValues.Select(y => new { key = "Id", value = y.Value, }).ToList(),
                    IsTemporary = x.IsTemporary
                }

            }).ToList();
            return Ok(JsonConvert.SerializeObject(Connections));
        }


        [HttpPost]
        [Route("addUser")]
        public string AddUser(Users user)
        {
            try
            {
                if (_context.Users.Any(x => x.Email == user.Email))
                {
                    return "Error: There is already User existing with the email entered!";
                }
                else if (_context.Users.Any(x => x.PhoneNumber == user.PhoneNumber))
                {
                    return "Error: There is already User existing with the phone number entered!";
                }
                else
                {
                    _context.Users.Add(new Users { UserName = user.Email, Email = user.Email, Name = user.Name, PhoneNumber = user.PhoneNumber, Date = DateTime.Now });
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
        [Route("updateUser")]
        public string UpdateUser(Users user)
        {
            try
            {
                if (_context.Users.Any(x => x.UserId == user.UserId))
                {
                    var userDetails = _context.Users.Find(user.UserId);
                    if (_context.Users.Any(x => x.Email == user.Email && x.UserId != user.UserId))
                    {
                        return "Error: Another User already exists with the email entered!";
                    }
                    else if (_context.Users.Any(x => x.PhoneNumber == user.PhoneNumber && x.UserId != user.UserId))
                    {
                        return "Error: Another User already exists with the phone number entered!";
                    }
                    else
                    {
                        userDetails.Email = user.Email;
                        userDetails.UserName = user.Email;
                        userDetails.Name = user.Name;
                        userDetails.PhoneNumber = user.PhoneNumber;
                        _context.SaveChanges();
                        return "Success";
                    }
                }
                else
                {
                    return "Error: User not found!";
                }
            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
        }

        [HttpPost]
        [Route("deleteUser")]
        public string DeleteUser(Users user)
        {
            try
            {
                if (_context.Users.Any(x => x.UserId == user.UserId))
                {
                    var userDetails = _context.Users.Find(user.UserId);
                    if (_context.Users.Any(x => x.ParentId == user.UserId))
                    {
                        return "Error: The user is being used as leader for some other users!";
                    }
                    else
                    {
                        _context.Users.Remove(userDetails);
                        _context.SaveChanges();
                        return "Success";
                    }
                }
                else
                {
                    return "Error: User not found!";
                }
            }
            catch (Exception ex)
            {
                return "Error:" + ex.Message;
            }
        }

    }
}
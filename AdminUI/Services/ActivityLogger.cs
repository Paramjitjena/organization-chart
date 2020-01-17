using AdminUI.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace AdminUI.Services
{
    public class ActivityLogger
    {
        public void addUserActivity(string User, string action, string table, string RecordId, OrganizationDBContext _context)
        {
            _context.ActivityLog.Add(new ActivityLog()
            {
                Action = action,
                User = User,
                TableName = table,
                RecordId = RecordId,
                Date = DateTime.Now
            });
            _context.SaveChanges();
        }
    }
}

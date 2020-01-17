using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class ActivityLog
    {
        public int LogId { get; set; }
        public string TableName { get; set; }
        public string Action { get; set; }
        public string RecordId { get; set; }
        public string User { get; set; }
        public DateTime Date { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class Groups
    {
        public Groups()
        {
            Users = new HashSet<Users>();
        }

        public DateTime Date { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public int GroupId { get; set; }
        public string Image { get; set; }

        public virtual ICollection<Users> Users { get; set; }
    }
}

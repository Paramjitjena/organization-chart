using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class Users
    {
        public Users()
        {
            Connections = new HashSet<Connections>();
            EntityKeyValues = new HashSet<EntityKeyValues>();
            InverseParent = new HashSet<Users>();
        }

        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int UserId { get; set; }
        public int? GroupId { get; set; }
        public string Image { get; set; }
        public int? ParentId { get; set; }
        public int AccessFailedCount { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string Email { get; set; }
        public bool? EmailConfirmed { get; set; }
        public bool? LockoutEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public string NormalizedEmail { get; set; }
        public string NormalizedUserName { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public bool? PhoneNumberConfirmed { get; set; }
        public string SecurityStamp { get; set; }
        public bool? TwoFactorEnabled { get; set; }
        public string UserName { get; set; }
        public string Designation { get; set; }
        public string EntitySetName { get; set; }
        public string EntityContainerName { get; set; }
        public bool? IsTemporary { get; set; }
        public int? EntityState { get; set; }
        public string Color { get; set; }

        public virtual Groups Group { get; set; }
        public virtual Users Parent { get; set; }
        public virtual ICollection<Connections> Connections { get; set; }
        public virtual ICollection<EntityKeyValues> EntityKeyValues { get; set; }
        public virtual ICollection<Users> InverseParent { get; set; }
    }
}

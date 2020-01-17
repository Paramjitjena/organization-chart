using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class EntityKeyValues
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Value { get; set; }

        public virtual Users User { get; set; }
    }
}

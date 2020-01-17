using System;
using System.Collections.Generic;

namespace AdminUI.Models
{
    public partial class Connections
    {
        public int Id { get; set; }
        public int FromShapeId { get; set; }
        public int ToShapeId { get; set; }
        public string Text { get; set; }
        public string FromPointX { get; set; }
        public string FromPointY { get; set; }
        public string ToPointX { get; set; }
        public string ToPointY { get; set; }
        public int EntityState { get; set; }
        public string EntitySetName { get; set; }
        public string EntityContainerName { get; set; }
        public bool IsTemporary { get; set; }

        public virtual Users FromShape { get; set; }
    }
}

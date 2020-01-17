using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AdminUI.Models
{
    public partial class OrganizationDBContext : DbContext
    {
        public OrganizationDBContext()
        {
        }

        public OrganizationDBContext(DbContextOptions<OrganizationDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ActivityLog> ActivityLog { get; set; }
        public virtual DbSet<Connections> Connections { get; set; }
        public virtual DbSet<EntityKeyValues> EntityKeyValues { get; set; }
        public virtual DbSet<Groups> Groups { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<UserRoles> UserRoles { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-KQQ6VNI\\SQLEXPRESS;Initial Catalog=OrganizationDB; User ID=sa; Password=Mechlin_123;");
            }
        }
         
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActivityLog>(entity =>
            {
                entity.HasKey(e => e.LogId);
            });

            modelBuilder.Entity<Connections>(entity =>
            {
                entity.Property(e => e.EntityContainerName).IsRequired();

                entity.Property(e => e.EntitySetName).IsRequired();

                entity.Property(e => e.FromPointX).HasMaxLength(50);

                entity.Property(e => e.FromPointY).HasMaxLength(50);

                entity.Property(e => e.ToPointX).HasMaxLength(50);

                entity.Property(e => e.ToPointY).HasMaxLength(50);

                entity.HasOne(d => d.FromShape)
                    .WithMany(p => p.Connections)
                    .HasForeignKey(d => d.FromShapeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Connections_Users");
            });

            modelBuilder.Entity<EntityKeyValues>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.EntityKeyValues)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EntityKeyValues_Users");
            });

            modelBuilder.Entity<Groups>(entity =>
            {
                entity.HasKey(e => e.GroupId);
            });

            modelBuilder.Entity<UserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.EmailConfirmed)
                    .IsRequired()
                    .HasDefaultValueSql("(CONVERT([bit],(0)))");

                entity.Property(e => e.LockoutEnabled)
                    .IsRequired()
                    .HasDefaultValueSql("(CONVERT([bit],(0)))");

                entity.Property(e => e.PhoneNumberConfirmed)
                    .IsRequired()
                    .HasDefaultValueSql("(CONVERT([bit],(0)))");

                entity.Property(e => e.TwoFactorEnabled)
                    .IsRequired()
                    .HasDefaultValueSql("(CONVERT([bit],(0)))");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.GroupId);

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

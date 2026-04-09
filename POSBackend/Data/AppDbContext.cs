using Microsoft.EntityFrameworkCore;
using POSBackend.Models;
namespace POSBackend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { }
    public DbSet<Product> Products { get; set; }
    public DbSet<Sale> Sales { get; set; }
}
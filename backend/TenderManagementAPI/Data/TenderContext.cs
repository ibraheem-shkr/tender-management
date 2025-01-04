using Microsoft.EntityFrameworkCore;
using TenderManagementAPI.Models;

namespace TenderManagementAPI.Data
{
    public class TenderContext : DbContext
    {
        public TenderContext(DbContextOptions<TenderContext> options) : base(options) { }

        public DbSet<Tender> Tenders { get; set; }
    }
}
using HeroesCatalogApi.Model;
using System.Data.Entity;

namespace HeroesCatalogApi.Contexts
{
    public class HeroesDataContext : DbContext
    {
        public HeroesDataContext()
            : base("HeroesConnectionString")
        {
            Database.SetInitializer<HeroesDataContext>(new HeroesDataContextInitializer());
        }

        public DbSet<Hero> Heroes { get; set; }
    }

    public class HeroesDataContextInitializer : DropCreateDatabaseIfModelChanges<HeroesDataContext>
    {
    }
}
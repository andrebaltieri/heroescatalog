using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using HeroesCatalogApi.Contexts;
using HeroesCatalogApi.Model;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Web.Http;

namespace HeroesCatalogApi.Controllers
{
    [BreezeController]
    public class HeroesController : ApiController
    {
        readonly EFContextProvider<HeroesDataContext> _contextProvider = new EFContextProvider<HeroesDataContext>();

        // ~/breeze/heroes/Metadata
        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        // ~/breeze/heroes/Heroes
        // ~/breeze/heroes/heroes?$filter=IsArchived eq false&$orderby=CreatedAt
        [HttpGet]
        public IQueryable<Hero> Heroes()
        {
            return _contextProvider.Context.Heroes;
        }

        // ~/breeze/heroes/SaveChanges
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }
    }
}

using System.Web.Mvc;

namespace HttpsTest.Controllers
{
    public class TestController : Controller
    {
        // GET: Test
        public ActionResult Index()
        {
            return View();
        }

        // GET: Test
        public ActionResult TestHttps()
        {
            return View();
        }
    }
}
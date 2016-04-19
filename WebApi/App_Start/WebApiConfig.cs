using System.Web.Http;

namespace WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //config.Routes.MapHttpRoute(name: "DefaultApi", routeTemplate: "api/{controller}/{action}", defaults: new { id = RouteParameter.Optional }, constraints: null);
        }
    }
}
